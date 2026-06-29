import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AdSlot } from "@/components/ads/AdSlot";

export function Shell({ children, showAd = true }: { children: ReactNode; showAd?: boolean }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      {showAd && (
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 pt-4">
          <AdSlot size="leaderboard" slot="6647333230" />
        </div>
      )}
      <main className="flex-1">{children}</main>
      {showAd && (
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 pb-4">
          <AdSlot size="leaderboard" slot="2324944848" />
        </div>
      )}
      <Footer />
    </div>
  );
}