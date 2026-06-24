import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Shell } from "@/components/layout/Shell";
import { Seo } from "@/components/seo/Seo";
import { ResultDisclaimer } from "@/components/legal/ResultDisclaimer";
import { CheckCircle2, XCircle, AlertCircle, ChevronDown, Baby, MapPin, PoundSterling, Info } from "lucide-react";

const SITE = "https://uknetpay.co.uk";

// ── Regional rates (nursery / childminder / nanny) per age band ────────────
// Source: Coram Family & Childcare Survey 2025 + Nursery World 2026
// [under2, age2, age3_4]
const REGIONS = [
  { label: "Inner London",       nursery:[16.20,14.80,13.50], childminder:[13.50,12.20,11.00], nanny:18.00 },
  { label: "Outer London",       nursery:[13.40,12.20,11.10], childminder:[11.20,10.20, 9.20], nanny:15.50 },
  { label: "South East",         nursery:[11.20,10.20, 9.30], childminder:[ 9.80, 8.90, 8.00], nanny:14.00 },
  { label: "East of England",    nursery:[10.60, 9.70, 8.80], childminder:[ 9.20, 8.40, 7.60], nanny:13.00 },
  { label: "South West",         nursery:[10.20, 9.30, 8.50], childminder:[ 8.90, 8.10, 7.30], nanny:12.50 },
  { label: "East Midlands",      nursery:[ 9.50, 8.70, 7.90], childminder:[ 8.20, 7.50, 6.80], nanny:12.00 },
  { label: "West Midlands",      nursery:[ 9.60, 8.80, 8.00], childminder:[ 8.40, 7.70, 7.00], nanny:12.00 },
  { label: "Yorkshire",          nursery:[ 9.30, 8.50, 7.70], childminder:[ 8.00, 7.30, 6.60], nanny:11.50 },
  { label: "North West",         nursery:[ 9.20, 8.40, 7.60], childminder:[ 7.90, 7.20, 6.50], nanny:11.50 },
  { label: "North East",         nursery:[ 8.80, 8.00, 7.30], childminder:[ 7.50, 6.80, 6.20], nanny:11.00 },
  { label: "Wales",              nursery:[ 9.10, 8.30, 7.50], childminder:[ 7.80, 7.10, 6.40], nanny:11.00 },
  { label: "Scotland",           nursery:[ 9.40, 8.60, 7.80], childminder:[ 8.20, 7.50, 6.80], nanny:12.00 },
  { label: "Northern Ireland",   nursery:[ 8.60, 7.80, 7.10], childminder:[ 7.30, 6.70, 6.00], nanny:10.50 },
] as const;

// Hours per session by care type
const FULL_DAY_HRS  = { nursery:9, childminder:9, nanny:9, afterschool:3 } as const;
const HALF_DAY_HRS  = { nursery:4.5, childminder:4.5, nanny:4.5, afterschool:3 } as const;

type CareType = "nursery"|"childminder"|"nanny"|"afterschool";
type ChildAge  = "9mo_2yr"|"age2"|"age3_4";

const DAYS = ["Mon","Tue","Wed","Thu","Fri"] as const;
type Day = typeof DAYS[number];

interface DayConfig { selected: boolean; half: boolean; }

const jsonLd = {
  "@context":"https://schema.org","@type":"WebApplication",
  name:"Childcare Cost Calculator UK 2026",url:`${SITE}/childcare`,
  description:"Calculate monthly UK childcare costs with day-by-day scheduling. Checks eligibility for 30 hours free childcare, Tax-Free Childcare, and salary sacrifice savings.",
  applicationCategory:"FinanceApplication",
};

// ── Tax / NI helpers ───────────────────────────────────────────────────────
function incomeTaxRate(salary:number):number {
  if(salary<=12570) return 0;
  if(salary<=50270) return 0.20;
  if(salary<=125140) return 0.40;
  return 0.45;
}
function employeeNIRate(salary:number):number {
  if(salary<=12570) return 0;
  if(salary<=50270) return 0.08;
  return 0.02; // simplified: treats whole salary at top rate — actual calc is banded
}
function calcSalSacrifSaving(salary:number, annualSacrifice:number):{tax:number;ni:number;total:number} {
  // Marginal rates on the sacrificed band
  const newSalary = Math.max(0, salary - annualSacrifice);
  // Tax saving: difference between tax on full salary vs reduced salary
  function annualTax(s:number):number {
    if(s<=12570) return 0;
    const basic = Math.min(Math.max(s-12570,0), 37700)*0.20;
    const higher = Math.min(Math.max(s-50270,0), 74870)*0.40;
    const addl   = Math.max(s-125140,0)*0.45;
    return basic+higher+addl;
  }
  function annualNI(s:number):number {
    if(s<=12570) return 0;
    const main  = Math.min(Math.max(s-12570,0),37700)*0.08;
    const upper = Math.max(s-50270,0)*0.02;
    return main+upper;
  }
  const taxSaving = annualTax(salary)-annualTax(newSalary);
  const niSaving  = annualNI(salary) -annualNI(newSalary);
  return { tax:taxSaving, ni:niSaving, total:taxSaving+niSaving };
}

const Childcare = () => {
  // Funded hours apply for 38 standard term weeks (gov.uk)
  const TERM_WEEKS = 38;

  // Child details
  const [numChildren, setNumChildren] = useState(1);
  const [childAge, setChildAge]       = useState<ChildAge>("age3_4");

  // Care type
  const [careType, setCareType] = useState<CareType>("nursery");
  const [regionIdx, setRegionIdx] = useState(2);

  // Day schedule — default Mon-Fri full day
  const [days, setDays] = useState<Record<Day,DayConfig>>({
    Mon:{selected:true,half:false}, Tue:{selected:true,half:false},
    Wed:{selected:true,half:false}, Thu:{selected:true,half:false},
    Fri:{selected:true,half:false},
  });

  // Weeks per year
  const [weeksPerYear, setWeeksPerYear] = useState(48);

  // Custom rate override
  const [useCustomRate, setUseCustomRate] = useState(false);
  const [customHourlyRate, setCustomHourlyRate] = useState<number>(0);
  const [customDailyRate, setCustomDailyRate] = useState<number>(0);
  const [customRateMode, setCustomRateMode] = useState<"hourly"|"daily">("daily");

  // Eligibility inputs
  const [bothParentsWork, setBothParentsWork] = useState(true);
  const [income1, setIncome1] = useState(35000);
  const [income2, setIncome2] = useState(32000);

  // Universal Credit / benefits
  const [onUniversalCredit, setOnUniversalCredit] = useState(false);
  // Childcare vouchers (legacy) — blocks TFC
  const [hasChildcareVouchers, setHasChildcareVouchers] = useState(false);

  // Salary sacrifice
  const [offersSalSacrif, setOffersSalSacrif] = useState(false);

  // ── Derived: hourly rate ─────────────────────────────────────────────────
  const r = REGIONS[regionIdx];
  const ageIdx = childAge==="9mo_2yr"?0:childAge==="age2"?1:2;
  // Regional average rate (used as default / reference)
  const regionalRate = useMemo(()=>{
    if(careType==="afterschool") return 6.50;
    if(careType==="nanny") return r.nanny;
    if(careType==="childminder") return r.childminder[ageIdx];
    return r.nursery[ageIdx];
  },[careType,r,ageIdx]);

  // Active hourly rate: custom or regional
  const fullDayHrs = FULL_DAY_HRS[careType==="afterschool"?"afterschool":careType];
  const hourlyRate = useMemo(()=>{
    if(!useCustomRate) return regionalRate;
    if(customRateMode==="daily") return customDailyRate > 0 ? customDailyRate / fullDayHrs : regionalRate;
    return customHourlyRate > 0 ? customHourlyRate : regionalRate;
  },[useCustomRate,customRateMode,customDailyRate,customHourlyRate,regionalRate,fullDayHrs]);

  // ── Derived: hours per week from day selection ───────────────────────────
  const hoursPerWeek = useMemo(()=>{
    return DAYS.reduce((sum,d)=>{
      const cfg = days[d];
      if(!cfg.selected) return sum;
      const hrs = cfg.half
        ? HALF_DAY_HRS[careType==="afterschool"?"afterschool":careType]
        : FULL_DAY_HRS[careType==="afterschool"?"afterschool":careType];
      return sum+hrs;
    },0);
  },[days,careType]);

  // ── Eligibility checks ───────────────────────────────────────────────────
  // Since September 2025: 30 hours for ALL ages 9mo+ for eligible working parents
  // Min income: 16hrs × NMW £12.21 = £10,158/year each parent
  // Max income: £100,000 adjusted net income per parent
  const funded30 = useMemo(()=>{
    if(!bothParentsWork) return false;
    if(income1<10158||income2<10158) return false;
    if(income1>100000||income2>100000) return false;
    return true;
  },[bothParentsWork,income1,income2]);

  // 15 hours for 2-year-olds on certain benefits (Universal Credit etc.)
  // This is SEPARATE from the working-parent 30 hours scheme
  // funded30 already handles working parents of 2-year-olds
  const funded15Age2 = useMemo(()=>{
    if(childAge!=="age2") return false;
    // Only relevant if NOT already getting 30 hours
    return !funded30 && bothParentsWork && income1>=4000;
  },[childAge,bothParentsWork,income1,funded30]);

  // TFC eligibility:
  // - Both parents working, each earning £10,158–£100,000
  // - Child under 12 (we can't check this but note it)
  // - CANNOT combine with Universal Credit childcare, childcare vouchers,
  //   Working Tax Credit, or Child Tax Credit
  const tfcEligible = useMemo(()=>{
    if(!bothParentsWork) return false;
    if(onUniversalCredit) return false;  // UC users use UC childcare instead
    if(hasChildcareVouchers) return false; // vouchers block TFC
    return income1>=10158&&income2>=10158&&income1<=100000&&income2<=100000;
  },[bothParentsWork,income1,income2,onUniversalCredit,hasChildcareVouchers]);

  // Universal Credit childcare support (85% of costs, different to TFC)
  // Max: £1,014.63/month for 1 child, £1,739.37 for 2+ children
  const ucChildcareEligible = onUniversalCredit && bothParentsWork;
  const UC_MAX_1_CHILD  = 1014.63 * 12; // annual
  const UC_MAX_2_PLUS   = 1739.37 * 12;
  const ucMaxAnnual     = numChildren >= 2 ? UC_MAX_2_PLUS : UC_MAX_1_CHILD;
  const fundedHoursPerWeek = useMemo(()=>{
    if(careType==="nanny") return 0; // nannies usually don't accept funded hours
    // Since Sep 2025: 30 hours for all eligible working parents, 9 months to school age
    if(funded30) return 30;
    // 3-4 year olds: universal 15 hours (regardless of income/work status)
    if(childAge==="age3_4") return 15;
    // 2-year-olds on economic criteria (UC etc): 15 hours
    if(funded15Age2) return 15;
    // Under 2 not eligible (working parent 30hrs is the only route for 9mo-2yr)
    return 0;
  },[childAge,careType,funded30,funded15Age2]);

  // ── Core cost calculations (per child) ───────────────────────────────────
  // Funded hours apply for 38 TERM weeks only (gov.uk standard) (standard gov.uk entitlement)
  // Non-term weeks (holidays etc) are always charged at full rate
  const nonTermWeeks   = Math.max(0, weeksPerYear - TERM_WEEKS);
  const termWeeksUsed  = Math.min(weeksPerYear, TERM_WEEKS);

  // Paid hours per week during term (funded hours deducted)
  const paidHrsTermWeek   = Math.max(0, hoursPerWeek - fundedHoursPerWeek);
  // Non-term: full hours, no funding
  const paidHrsNonTermWeek = hoursPerWeek;

  const annualGrossPerChild =
    (paidHrsTermWeek    * hourlyRate * termWeeksUsed) +
    (paidHrsNonTermWeek * hourlyRate * nonTermWeeks);

  const monthlyGrossPerChild = annualGrossPerChild / 12;

  // Total costs
  const monthlyTotal = monthlyGrossPerChild * numChildren;
  const annualTotal  = annualGrossPerChild  * numChildren;

  // UC childcare support (must be after annualTotal is computed)
  const ucSupportAnnual = ucChildcareEligible
    ? Math.min(annualTotal * 0.85, ucMaxAnnual) : 0;
  const monthlyAfterUC  = Math.max(0, (annualTotal - ucSupportAnnual) / 12);

  // Funded hours saving = what you WOULD have paid during term vs what you pay
  const fundedSavingAnnual =
    fundedHoursPerWeek * hourlyRate * termWeeksUsed * numChildren;

  // Full cost (no support at all, all weeks, all hours)
  const fullMonthly = (hoursPerWeek * hourlyRate * weeksPerYear * numChildren) / 12;

  // ── Tax-Free Childcare (TFC) ─────────────────────────────────────────────
  // Govt adds 20p per 80p parent pays (=25% of parent spend), max £2,000 govt/child/yr
  // => parent needs to spend £8,000/child/yr to get full £2,000 top-up
  const tfcGovtPerChild = Math.min(annualGrossPerChild * 0.25, 2000);
  const tfcGovtTotal    = tfcEligible ? tfcGovtPerChild * numChildren : 0;
  const monthlyAfterTFC = Math.max(0, (annualTotal - tfcGovtTotal) / 12);

  // ── Salary sacrifice calculation ─────────────────────────────────────────
  // Annual sacrifice = annual childcare cost (what parent pays after funded hours)
  const annualSacrifice     = annualTotal;
  const ssSaving            = offersSalSacrif
    ? calcSalSacrifSaving(income1, annualSacrifice)
    : {tax:0,ni:0,total:0};
  const monthlyAfterSS      = Math.max(0, (annualTotal - ssSaving.total) / 12);

  // Best option
  const options = [
    { label:"No support",          monthly: fullMonthly,    saving:0 },
    { label:"Funded hours only",   monthly: monthlyTotal,   saving: fundedSavingAnnual/12 },
    ...(tfcEligible&&tfcGovtTotal>0?[{ label:"Funded hrs + Tax-Free Childcare", monthly:monthlyAfterTFC, saving:(fundedSavingAnnual+tfcGovtTotal)/12 }]:[]),
    ...(ucChildcareEligible&&ucSupportAnnual>0?[{ label:"Funded hrs + Universal Credit (85%)", monthly:monthlyAfterUC, saving:(fundedSavingAnnual+ucSupportAnnual)/12 }]:[]),
    ...(offersSalSacrif&&ssSaving.total>0?[{ label:"Funded hrs + Salary Sacrifice", monthly:monthlyAfterSS, saving:(fundedSavingAnnual+ssSaving.total)/12 }]:[]),
  ];
  const bestOption = options.reduce((a,b)=>b.monthly<a.monthly?b:a);

  const toggleDay = (d:Day)=>setDays(prev=>({...prev,[d]:{...prev[d],selected:!prev[d].selected}}));
  const toggleHalf=(d:Day)=>setDays(prev=>({...prev,[d]:{...prev[d],half:!prev[d].half}}));

  const fmt=(n:number)=>`£${Math.round(n).toLocaleString("en-GB")}`;

  return (
    <Shell>
      <Seo
        title="Childcare Cost Calculator UK 2026 — Day-by-Day Costs, Funded Hours & Salary Sacrifice"
        description="Calculate weekly childcare costs by day. Choose nursery, childminder or nanny, pick your days and half/full day. Checks eligibility for 30 free hours, Tax-Free Childcare, and salary sacrifice savings."
        path="/childcare"
        jsonLd={jsonLd}
      />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Link to="/">Home</Link><span>/</span><span>Childcare Calculator</span>
          </div>
          <h1 className="text-2xl font-semibold">Childcare Cost Calculator 2026</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Pick your days, care type, and region. We check your eligibility for government support and show your real monthly cost.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-6">

          {/* ── LEFT: INPUTS ─────────────────────────────────────────── */}
          <div className="space-y-4">

            {/* 1. Child */}
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Baby className="h-4 w-4 text-muted-foreground"/>
                <h2 className="text-sm font-semibold">Child details</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Number of children</p>
                  <div className="flex items-center gap-3">
                    <button onClick={()=>setNumChildren(Math.max(1,numChildren-1))}
                      className="h-9 w-9 rounded-lg border border-border bg-secondary font-semibold text-base hover:bg-secondary/70 transition-colors">−</button>
                    <span className="text-xl font-semibold w-6 text-center">{numChildren}</span>
                    <button onClick={()=>setNumChildren(Math.min(5,numChildren+1))}
                      className="h-9 w-9 rounded-lg border border-border bg-secondary font-semibold text-base hover:bg-secondary/70 transition-colors">+</button>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Age of youngest</p>
                  <div className="space-y-1.5">
                    {([["9mo_2yr","9 months – under 2 (eligible for 30 hrs)"],["age2","2 years old"],["age3_4","3–4 years old"]] as [ChildAge,string][]).map(([val,lbl])=>(
                      <label key={val} className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer text-sm transition-colors
                        ${childAge===val?"border-accent bg-accent/5 text-foreground":"border-border text-muted-foreground hover:border-border/70"}`}>
                        <input type="radio" name="age" checked={childAge===val} onChange={()=>setChildAge(val)} className="accent-blue-500"/>
                        {lbl}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Care type + Region */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="text-sm font-semibold mb-4">Care type &amp; location</h2>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {([["nursery","Nursery"],["childminder","Childminder"],["nanny","Nanny"],["afterschool","After-school"]] as [CareType,string][]).map(([val,lbl])=>(
                  <button key={val} onClick={()=>setCareType(val)}
                    className={`p-3 rounded-lg border text-sm text-left transition-colors
                      ${careType===val?"border-accent bg-accent/5 font-medium text-foreground":"border-border text-muted-foreground hover:border-border/70 hover:text-foreground"}`}>
                    {lbl}
                  </button>
                ))}
              </div>
              <div className="relative">
                <select value={regionIdx} onChange={e=>setRegionIdx(Number(e.target.value))}
                  className="w-full appearance-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm pr-8">
                  {REGIONS.map((reg,i)=><option key={reg.label} value={i}>{reg.label}</option>)}
                </select>
                <ChevronDown className="absolute right-2.5 top-3 h-4 w-4 text-muted-foreground pointer-events-none"/>
              </div>

            </div>

            {/* 3. Day schedule */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="text-sm font-semibold mb-1">Days needed</h2>
              <p className="text-xs text-muted-foreground mb-4">Select each day and choose full or half day</p>

              <div className="grid grid-cols-5 gap-2 mb-4">
                {DAYS.map(d=>{
                  const cfg = days[d];
                  return (
                    <div key={d} className={`rounded-xl border transition-colors overflow-hidden
                      ${cfg.selected?"border-accent":"border-border"}`}>
                      {/* Day header */}
                      <button onClick={()=>toggleDay(d)}
                        className={`w-full py-2.5 text-sm font-semibold transition-colors
                          ${cfg.selected?"bg-accent/10 text-foreground":"bg-secondary/30 text-muted-foreground hover:text-foreground"}`}>
                        {d}
                      </button>
                      {/* Half/Full toggle — only if day is selected AND not after-school */}
                      {cfg.selected && careType!=="afterschool" && (
                        <div className="border-t border-border">
                          <button onClick={()=>toggleHalf(d)}
                            className="w-full py-1.5 text-[10px] font-medium text-center transition-colors hover:bg-secondary/50 text-muted-foreground">
                            {cfg.half?"½ day":"Full"}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  {DAYS.filter(d=>days[d].selected).length} day{DAYS.filter(d=>days[d].selected).length!==1?"s":""} selected
                  {" · "}{hoursPerWeek.toFixed(1)} hrs/week
                </span>
                <span className="text-muted-foreground">
                  Full day = {FULL_DAY_HRS[careType==="afterschool"?"afterschool":careType]}h · Half day = {HALF_DAY_HRS[careType==="afterschool"?"afterschool":careType]}h
                </span>
              </div>

              <div className="mt-4">
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Weeks per year</label>
                <div className="flex items-center gap-3">
                  <input type="range" min={38} max={52} value={weeksPerYear}
                    onChange={e=>setWeeksPerYear(Number(e.target.value))}
                    className="flex-1 accent-blue-500"/>
                  <span className="text-sm font-semibold w-16 text-right">{weeksPerYear} wks</span>
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                  <span>38 = term-time</span><span>48 = with holidays</span><span>52 = year-round</span>
                </div>
              </div>
            </div>

            {/* 4. Eligibility */}
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <PoundSterling className="h-4 w-4 text-muted-foreground"/>
                <h2 className="text-sm font-semibold">Government support eligibility</h2>
              </div>
              <label className="flex items-center gap-2.5 text-sm mb-3 cursor-pointer">
                <input type="checkbox" checked={bothParentsWork} onChange={e=>setBothParentsWork(e.target.checked)} className="h-4 w-4 rounded"/>
                Both parents (or single parent) are currently working
              </label>
              <div className="space-y-2 mb-4 pl-1">
                <label className="flex items-center gap-2.5 text-sm cursor-pointer">
                  <input type="checkbox" checked={onUniversalCredit} onChange={e=>setOnUniversalCredit(e.target.checked)} className="h-4 w-4 rounded"/>
                  <span>Currently claiming Universal Credit</span>
                </label>
                <label className="flex items-center gap-2.5 text-sm cursor-pointer">
                  <input type="checkbox" checked={hasChildcareVouchers} onChange={e=>setHasChildcareVouchers(e.target.checked)} className="h-4 w-4 rounded"/>
                  <span>Using employer childcare vouchers (legacy scheme)</span>
                </label>
              </div>
              {onUniversalCredit&&(
                <div className="mb-4 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 p-3 text-xs text-blue-700 dark:text-blue-300">
                  <strong>Universal Credit:</strong> You can claim 85% of childcare costs through UC instead of Tax-Free Childcare. You <strong>cannot use both</strong>. UC support is usually better for lower earners — TFC is better for higher earners paying more than ~£9,400/year in childcare.
                </div>
              )}
              {bothParentsWork&&(
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Your salary £/yr</label>
                    <input type="number" min={0} max={500000} step={1000} value={income1}
                      onChange={e=>setIncome1(Number(e.target.value))}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Partner's salary £/yr</label>
                    <input type="number" min={0} max={500000} step={1000} value={income2}
                      onChange={e=>setIncome2(Number(e.target.value))}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/>
                  </div>
                </div>
              )}

              {/* Salary sacrifice toggle */}
              <div className="border-t border-border pt-4">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input type="checkbox" checked={offersSalSacrif} onChange={e=>setOffersSalSacrif(e.target.checked)}
                    className="h-4 w-4 mt-0.5 rounded"/>
                  <div>
                    <span className="text-sm font-medium">My employer offers childcare salary sacrifice</span>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      You pay childcare from pre-tax salary, saving income tax and National Insurance on the full amount.
                    </p>
                  </div>
                </label>
                {offersSalSacrif&&(
                  <div className="mt-3 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-3 flex gap-2">
                    <Info className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5"/>
                    <p className="text-[11px] text-amber-700 dark:text-amber-300">
                      Only available with OFSTED-registered providers. Cannot be combined with Tax-Free Childcare — the calculator shows the better option below.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── RIGHT: RESULTS ─────────────────────────────────────────── */}
          <div className="space-y-4">

            {/* Eligibility summary */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="text-sm font-semibold mb-3">Your eligibility</h2>
              <div className="space-y-3">

                {[
                  {
                    icon: childAge==="age3_4" ? CheckCircle2 : XCircle,
                    color: childAge==="age3_4" ? "text-green-500" : "text-muted-foreground",
                    title: "15 hrs free (universal)",
                    desc: childAge==="age3_4" ? "✓ All 3–4 year olds in England qualify" : "Only for 3–4 year olds"
                  },
                  {
                    icon: funded30 ? CheckCircle2 : childAge==="age3_4"&&bothParentsWork ? AlertCircle : XCircle,
                    color: funded30 ? "text-green-500" : childAge==="age3_4"&&bothParentsWork ? "text-amber-500" : "text-muted-foreground",
                    title: "30 hrs free (working parents, 9 months+)",
                    desc: funded30 ? "✓ Eligible — both parents working, income within limits (Sep 2025 expansion)"
                         : !bothParentsWork ? "Both parents must be working"
                         : income1>100000||income2>100000 ? "Not eligible — one or both parents earn over £100,000"
                         : `Each parent must earn at least £10,158/year (16 hrs × NMW). You need £${(10158-Math.min(income1,income2)).toLocaleString()} more.`
                  },
                  {
                    icon: funded15Age2 ? CheckCircle2 : childAge==="age2" ? AlertCircle : XCircle,
                    color: funded15Age2 ? "text-green-500" : childAge==="age2" ? "text-amber-500" : "text-muted-foreground",
                    title: "15 hrs (2-year-olds, economic criteria)",
                    desc: funded15Age2 ? "✓ Eligible (separate from working-parent 30-hour scheme)" : childAge!=="age2" ? "For 2-year-olds not eligible for the 30-hour scheme" : "Applies if on Universal Credit or other qualifying benefits"
                  },
                  {
                    icon: tfcEligible ? CheckCircle2 : onUniversalCredit ? XCircle : AlertCircle,
                    color: tfcEligible ? "text-green-500" : onUniversalCredit ? "text-muted-foreground" : "text-amber-500",
                    title: "Tax-Free Childcare (20% top-up)",
                    desc: onUniversalCredit
                      ? "Not available — cannot combine with Universal Credit. Use UC childcare support (85%) instead."
                      : hasChildcareVouchers
                      ? "Not available — cannot combine with employer childcare vouchers"
                      : tfcEligible
                      ? `✓ Saves up to ${fmt(2000*numChildren)}/year on costs you pay — requires separate application at childcarechoices.gov.uk`
                      : "Each parent must earn £10,158–£100,000/year (16 hrs × NMW)"
                  },
                  ...(ucChildcareEligible ? [{
                    icon: CheckCircle2,
                    color: "text-green-500",
                    title: "Universal Credit childcare (85%)",
                    desc: `✓ UC covers 85% of childcare costs, up to ${fmt(numChildren>=2?1739.37:1014.63)}/month — claim through your UC account`
                  }] : []),
                ].map(({icon:Icon,color,title,desc})=>(
                  <div key={title} className="flex items-start gap-2.5">
                    <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${color}`}/>
                    <div>
                      <p className="text-sm font-medium text-foreground">{title}</p>
                      <p className="text-[11px] text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                ))}

              </div>
            </div>

            {/* Cost breakdown */}
            <div className="rounded-xl border-2 border-accent/30 bg-card p-5">
              <h2 className="text-sm font-semibold mb-4">Monthly cost breakdown</h2>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Full cost (no support)</span>
                  <span className="font-medium">{fmt(fullMonthly)}/mo</span>
                </div>
                {fundedHoursPerWeek>0&&(
                  <div className="flex justify-between">
                    <span className="text-green-600 dark:text-green-400">− {fundedHoursPerWeek} funded hrs/week</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">−{fmt(fundedSavingAnnual/12)}/mo</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-border pt-2">
                  <span className="text-muted-foreground">After funded hours</span>
                  <span className="font-medium">{fmt(monthlyTotal)}/mo</span>
                </div>
                {tfcEligible&&tfcGovtTotal>0&&(
                  <div className="flex justify-between">
                    <span className="text-green-600 dark:text-green-400">− Tax-Free Childcare (20%)</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">−{fmt(tfcGovtTotal/12)}/mo</span>
                  </div>
                )}
                {ucChildcareEligible&&ucSupportAnnual>0&&(
                  <div className="flex justify-between">
                    <span className="text-green-600 dark:text-green-400">− Universal Credit (85%)</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">−{fmt(ucSupportAnnual/12)}/mo</span>
                  </div>
                )}
                {offersSalSacrif&&ssSaving.total>0&&(
                  <>
                    <div className="flex justify-between">
                      <span className="text-green-600 dark:text-green-400">− Tax saving (salary sacrifice)</span>
                      <span className="text-green-600 dark:text-green-400 font-medium">−{fmt(ssSaving.tax/12)}/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-600 dark:text-green-400">− NI saving (salary sacrifice)</span>
                      <span className="text-green-600 dark:text-green-400 font-medium">−{fmt(ssSaving.ni/12)}/mo</span>
                    </div>
                  </>
                )}
              </div>

              {/* Best option hero */}
              <div className="rounded-xl bg-secondary/50 p-4 text-center">
                <p className="text-[11px] text-muted-foreground mb-0.5">{bestOption.label}</p>
                <p className="text-3xl font-semibold">{fmt(bestOption.monthly)}</p>
                <p className="text-xs text-muted-foreground mt-1">/month · {fmt(bestOption.monthly*12)}/year</p>
              </div>

              {(fundedSavingAnnual+Math.max(tfcGovtTotal,ssSaving.total))>0&&(
                <div className="mt-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 p-3 text-center">
                  <p className="text-xs font-medium text-green-700 dark:text-green-300">
                    You save {fmt(fundedSavingAnnual+Math.max(tfcGovtTotal,ssSaving.total))}/year through government support
                  </p>
                </div>
              )}

              {/* Term vs non-term breakdown when funded hours apply */}
              {fundedHoursPerWeek>0&&nonTermWeeks>0&&(
                <div className="mt-3 rounded-lg border border-border bg-secondary/20 p-3 space-y-1 text-[11px] text-muted-foreground">
                  <p className="font-medium text-foreground text-xs">How this is calculated</p>
                  <div className="flex justify-between">
                    <span>Term time ({termWeeksUsed} weeks, {fundedHoursPerWeek} hrs funded)</span>
                    <span className="font-medium">{paidHrsTermWeek>0?fmt(paidHrsTermWeek*hourlyRate*termWeeksUsed/12)+"/mo":"FREE"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Non-term ({nonTermWeeks} weeks, full rate)</span>
                    <span className="font-medium">{fmt(hoursPerWeek*hourlyRate*nonTermWeeks/12)}/mo avg</span>
                  </div>
                  <p className="text-[10px] pt-1">Funding applies for {TERM_WEEKS} term weeks only. Non-term weeks (school holidays etc.) charged at full rate.</p>
                </div>
              )}
            </div>

            {/* Salary sacrifice projection */}
            {offersSalSacrif&&ssSaving.total>0&&(
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="text-sm font-semibold mb-3">Salary sacrifice projection</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Annual sacrifice</span>
                    <span className="font-medium">{fmt(annualSacrifice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Income tax saved</span>
                    <span className="font-medium text-green-600 dark:text-green-400">{fmt(ssSaving.tax)}/yr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">NI saved</span>
                    <span className="font-medium text-green-600 dark:text-green-400">{fmt(ssSaving.ni)}/yr</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2">
                    <span className="font-medium text-foreground">Total annual saving</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">{fmt(ssSaving.total)}/yr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Net monthly cost</span>
                    <span className="font-semibold text-foreground">{fmt(monthlyAfterSS)}/mo</span>
                  </div>
                </div>
                {tfcEligible&&(
                  <div className="mt-3 rounded-lg border border-border bg-secondary/30 p-3 text-[11px] text-muted-foreground">
                    <strong className="text-foreground">TFC vs Salary Sacrifice: </strong>
                    {tfcGovtTotal>ssSaving.total
                      ? `Tax-Free Childcare saves you ${fmt(tfcGovtTotal-ssSaving.total)}/yr more. Use TFC.`
                      : `Salary sacrifice saves you ${fmt(ssSaving.total-tfcGovtTotal)}/yr more. Use salary sacrifice.`}
                  </div>
                )}
              </div>
            )}

            {/* Options comparison */}
            {options.length>2&&(
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="text-sm font-semibold mb-3">All options compared</h2>
                <div className="space-y-2">
                  {options.map((opt)=>(
                    <div key={opt.label} className={`flex items-center justify-between p-2.5 rounded-lg text-sm
                      ${opt.label===bestOption.label?"bg-accent/10 border border-accent/20":""}`}>
                      <span className={opt.label===bestOption.label?"font-medium text-foreground":"text-muted-foreground"}>
                        {opt.label}
                        {opt.label===bestOption.label&&<span className="ml-2 text-[10px] bg-accent/20 text-accent px-1.5 py-0.5 rounded font-semibold uppercase">Best</span>}
                      </span>
                      <span className={`font-semibold ${opt.label===bestOption.label?"text-accent":"text-foreground"}`}>
                        {fmt(opt.monthly)}/mo
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs */}
            {tfcEligible&&(
              <a href="https://www.childcarechoices.gov.uk" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center w-full rounded-xl border border-accent text-accent bg-accent/5 hover:bg-accent/10 transition-colors px-4 py-3 text-sm font-medium">
                Apply for Tax-Free Childcare at childcarechoices.gov.uk →
              </a>
            )}
            {ucChildcareEligible&&(
              <a href="https://www.gov.uk/guidance/universal-credit-childcare-costs" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center w-full rounded-xl border border-blue-400/40 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-colors px-4 py-3 text-sm font-medium">
                Claim UC childcare support (85%) on GOV.UK →
              </a>
            )}
            {(funded30||funded15Age2)&&(
              <a href="https://www.childcarechoices.gov.uk" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center w-full rounded-xl border border-border text-muted-foreground hover:text-foreground transition-colors px-4 py-3 text-sm font-medium">
                Apply for funded hours at childcarechoices.gov.uk →
              </a>
            )}
          </div>
        </div>

        {/* Guide */}
        <div className="mt-12 prose prose-sm dark:prose-invert max-w-none">
          <h2>UK Childcare Costs 2026 — Complete Guide</h2>
          <h3>Average hourly rates by care type and region</h3>
          <p>Costs vary enormously. An Inner London nursery charges £16.20/hr for a baby under 2 — nearly double the North East rate of £8.80/hr. Childminders are typically 15–20% cheaper than nurseries. Nannies cost more per hour but become cost-effective for two or more children.</p>
          <h3>Government-funded hours 2026</h3>
          <table>
            <thead><tr><th>Scheme</th><th>Hours/week</th><th>Who qualifies</th></tr></thead>
            <tbody>
              <tr><td><strong>30 hours (working parents)</strong></td><td><strong>30</strong></td><td>Children aged 9 months to school age. Both parents must each earn £10,158–£100,000/year. September 2025 expansion.</td></tr>
              <tr><td>15 hours (universal)</td><td>15</td><td>All 3–4 year olds in England — no income test</td></tr>
              <tr><td>15 hours (2-year-olds)</td><td>15</td><td>2-year-olds on Universal Credit or other qualifying benefits</td></tr>
            </tbody>
          </table>
          <p><strong>Key change from September 2025:</strong> The 30 hours free childcare scheme now covers <strong>all children from 9 months old</strong> — not just 3–4 year olds. An 18-month-old whose parents both earn between £10,158 and £100,000 now qualifies for the full 30 hours, worth approximately £6,000–£7,500/year depending on region. The income minimum is 16 hours/week at National Minimum Wage (£12.21/hr from April 2025) = £10,158/year per parent.</p>
          <h3>Tax-Free Childcare vs salary sacrifice — which is better?</h3>
          <p>Tax-Free Childcare gives a flat 20% top-up (capped at £2,000/child/year). Salary sacrifice saves you your marginal income tax rate plus NI — which is 28% for a basic rate taxpayer and 48% for a higher rate taxpayer. Higher earners almost always save more through salary sacrifice if their employer offers it. The calculator shows the comparison automatically when you tick the salary sacrifice box.</p>
          <p><strong>Sources:</strong> <a href="https://www.familyandchildcaretrust.org" target="_blank" rel="noopener noreferrer">Coram Survey 2025</a> · <a href="https://www.gov.uk/tax-free-childcare" target="_blank" rel="noopener noreferrer">gov.uk TFC</a> · <a href="https://www.gov.uk/free-childcare-if-youre-working" target="_blank" rel="noopener noreferrer">gov.uk funded hours</a></p>
        </div>
        <div className="mt-8"><ResultDisclaimer/></div>
      </div>
    </Shell>
  );
};

export default Childcare;
