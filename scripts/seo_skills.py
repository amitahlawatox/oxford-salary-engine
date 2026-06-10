#!/usr/bin/env python3
"""
seo_skills.py — Automated SEO structural audit for UKNet Pay.

Scans the built site or source files for:
  1. Sitemap validity (well-formed XML, valid priorities, correct domain)
  2. Canonical consistency (all URLs use non-www apex)
  3. Redirect chain detection (vercel.json rules that chain together)
  4. Schema markup presence (JSON-LD on key pages)
  5. Internal linking health (salary pages → /take-home, /directory)

Run: python3 scripts/seo_skills.py
"""

import json
import os
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

DOMAIN = "https://uknetpay.co.uk"
WWW_DOMAIN = "https://www.uknetpay.co.uk"
PROJECT_ROOT = Path(__file__).resolve().parent.parent


def check_sitemap():
    """Validate public/sitemap.xml structure and URLs."""
    issues = []
    sitemap_path = PROJECT_ROOT / "public" / "sitemap.xml"

    if not sitemap_path.exists():
        issues.append("CRITICAL: public/sitemap.xml does not exist")
        return issues

    try:
        tree = ET.parse(sitemap_path)
        root = tree.getroot()
    except ET.ParseError as e:
        issues.append(f"CRITICAL: sitemap.xml is malformed XML: {e}")
        return issues

    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = root.findall("sm:url", ns)

    if not urls:
        issues.append("CRITICAL: sitemap.xml contains 0 URLs")
        return issues

    url_count = len(urls)
    www_urls = []
    bad_priorities = []

    for url_el in urls:
        loc = url_el.find("sm:loc", ns)
        priority = url_el.find("sm:priority", ns)

        if loc is not None and loc.text:
            if loc.text.startswith(WWW_DOMAIN):
                www_urls.append(loc.text)
            elif not loc.text.startswith(DOMAIN):
                issues.append(f"WARNING: URL uses unexpected domain: {loc.text}")

        if priority is not None and priority.text:
            try:
                p = float(priority.text)
                if p < 0.0 or p > 1.0:
                    bad_priorities.append(f"{loc.text if loc is not None else '?'}: {priority.text}")
            except ValueError:
                bad_priorities.append(f"{loc.text if loc is not None else '?'}: {priority.text}")

    if www_urls:
        issues.append(f"CRITICAL: {len(www_urls)} URLs use www. domain (should be apex)")
        for u in www_urls[:5]:
            issues.append(f"  - {u}")

    if bad_priorities:
        issues.append(f"WARNING: {len(bad_priorities)} URLs have invalid priority values")
        for bp in bad_priorities[:5]:
            issues.append(f"  - {bp}")

    print(f"  Sitemap: {url_count} URLs found")
    return issues


def check_canonical_in_source():
    """Verify that the Seo component uses non-www domain."""
    issues = []
    seo_path = PROJECT_ROOT / "src" / "components" / "seo" / "Seo.tsx"

    if not seo_path.exists():
        issues.append("WARNING: Seo.tsx component not found")
        return issues

    content = seo_path.read_text()

    site_matches = re.findall(r'const SITE\s*=\s*["\']([^"\']+)["\']', content)
    for site in site_matches:
        if "www." in site:
            issues.append(f"CRITICAL: Seo.tsx SITE constant uses www: {site}")
        elif site != DOMAIN:
            issues.append(f"WARNING: Seo.tsx SITE constant unexpected: {site}")

    if 'rel="canonical"' not in content and "rel='canonical'" not in content:
        if "canonical" not in content:
            issues.append("CRITICAL: Seo.tsx does not inject canonical link tag")

    return issues


def check_redirect_chains():
    """Detect potential redirect chains in vercel.json."""
    issues = []
    vercel_path = PROJECT_ROOT / "vercel.json"

    if not vercel_path.exists():
        issues.append("WARNING: vercel.json not found")
        return issues

    with open(vercel_path) as f:
        config = json.load(f)

    redirects = config.get("redirects", [])
    destinations = set()
    sources = set()

    for r in redirects:
        src = r.get("source", "")
        dst = r.get("destination", "")
        sources.add(src)
        destinations.add(dst)

    chains = []
    for r in redirects:
        dst = r.get("destination", "")
        dst_path = dst.replace(DOMAIN, "").split("?")[0]
        for r2 in redirects:
            src2 = r2.get("source", "")
            if dst_path == src2 and r != r2:
                has_condition = r2.get("has")
                if not has_condition:
                    chains.append(f"{r['source']} → {dst} → {r2['destination']}")

    if chains:
        issues.append(f"WARNING: {len(chains)} potential redirect chain(s) detected")
        for c in chains[:5]:
            issues.append(f"  - {c}")

    www_redirect_found = False
    for r in redirects:
        has_cond = r.get("has", [])
        for h in has_cond:
            if h.get("type") == "host" and "www" in h.get("value", ""):
                www_redirect_found = True
                break

    if not www_redirect_found:
        issues.append("WARNING: No explicit www → non-www redirect rule in vercel.json")

    print(f"  Redirects: {len(redirects)} rules")
    return issues


def check_robots_txt():
    """Validate robots.txt points to correct sitemap."""
    issues = []
    robots_path = PROJECT_ROOT / "public" / "robots.txt"

    if not robots_path.exists():
        issues.append("CRITICAL: public/robots.txt does not exist")
        return issues

    content = robots_path.read_text()

    if "Sitemap:" not in content:
        issues.append("WARNING: robots.txt does not declare a Sitemap")
    elif f"Sitemap: {DOMAIN}/sitemap.xml" not in content:
        if f"Sitemap: {WWW_DOMAIN}" in content:
            issues.append("CRITICAL: robots.txt Sitemap points to www domain")
        else:
            issues.append("WARNING: robots.txt Sitemap URL unexpected")

    if "Disallow:" in content:
        disallowed = re.findall(r"Disallow:\s*(.+)", content)
        for d in disallowed:
            d = d.strip()
            if d and d != "":
                issues.append(f"INFO: robots.txt disallows: {d}")

    return issues


def check_schema_in_pages():
    """Check that key page components include JSON-LD schema."""
    issues = []
    pages_dir = PROJECT_ROOT / "src" / "pages"

    if not pages_dir.exists():
        issues.append("WARNING: src/pages directory not found")
        return issues

    key_pages = [
        "programmatic/SalaryPage.tsx",
        "tools/TakeHome.tsx",
    ]

    schema_count = 0
    for page_rel in key_pages:
        page_path = pages_dir / page_rel
        if not page_path.exists():
            continue

        content = page_path.read_text()
        if "application/ld+json" in content or "jsonLd" in content or "ToolSeo" in content:
            schema_count += 1
        else:
            issues.append(f"WARNING: {page_rel} missing JSON-LD schema")

    tool_pages = list((pages_dir / "tools").glob("*.tsx")) if (pages_dir / "tools").exists() else []
    tools_with_schema = 0
    tools_without = []

    for tp in tool_pages:
        content = tp.read_text()
        if "jsonLd" in content or "application/ld+json" in content or "ToolSeo" in content:
            tools_with_schema += 1
        else:
            tools_without.append(tp.name)

    if tools_without:
        issues.append(f"INFO: {len(tools_without)} tool pages without explicit JSON-LD: {', '.join(tools_without[:5])}")

    print(f"  Schema: {schema_count}/{len(key_pages)} key pages have JSON-LD; {tools_with_schema}/{len(tool_pages)} tools total")
    return issues


def check_internal_linking():
    """Check that salary pages link back to the main calculator."""
    issues = []
    salary_page = PROJECT_ROOT / "src" / "pages" / "programmatic" / "SalaryPage.tsx"

    if not salary_page.exists():
        issues.append("WARNING: SalaryPage.tsx not found")
        return issues

    content = salary_page.read_text()

    links_to_take_home = "/take-home" in content
    links_to_directory = "/directory" in content
    has_adjacent_nav = "adjacentSalary" in content or "ChevronLeft" in content

    if not links_to_take_home:
        issues.append("WARNING: SalaryPage does not link to /take-home calculator")
    if not links_to_directory:
        issues.append("WARNING: SalaryPage does not link to /directory")
    if not has_adjacent_nav:
        issues.append("INFO: SalaryPage missing prev/next adjacent salary navigation")

    print(f"  Internal links: take-home={'yes' if links_to_take_home else 'NO'}, directory={'yes' if links_to_directory else 'NO'}, adjacent={'yes' if has_adjacent_nav else 'NO'}")
    return issues


def main():
    print("=" * 60)
    print("UKNet Pay — SEO Structural Audit")
    print(f"Domain: {DOMAIN}")
    print(f"Project: {PROJECT_ROOT}")
    print("=" * 60)
    print()

    all_issues = []
    checks = [
        ("Sitemap Validation", check_sitemap),
        ("Canonical Tags", check_canonical_in_source),
        ("Redirect Chains", check_redirect_chains),
        ("robots.txt", check_robots_txt),
        ("Schema Markup", check_schema_in_pages),
        ("Internal Linking", check_internal_linking),
    ]

    for name, fn in checks:
        print(f"[{name}]")
        issues = fn()
        all_issues.extend(issues)
        if issues:
            for issue in issues:
                print(f"  {issue}")
        else:
            print("  ✓ No issues")
        print()

    critical = [i for i in all_issues if i.startswith("CRITICAL")]
    warnings = [i for i in all_issues if i.startswith("WARNING")]
    info = [i for i in all_issues if i.startswith("INFO")]

    print("=" * 60)
    print(f"SUMMARY: {len(critical)} critical, {len(warnings)} warnings, {len(info)} info")
    print("=" * 60)

    if critical:
        print("\nCRITICAL ISSUES:")
        for c in critical:
            print(f"  ❌ {c}")

    if warnings:
        print("\nWARNINGS:")
        for w in warnings:
            print(f"  ⚠️  {w}")

    if not critical and not warnings:
        print("\n✓ All checks passed — no critical or warning issues found.")

    return 1 if critical else 0


if __name__ == "__main__":
    sys.exit(main())
