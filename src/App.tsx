import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import { useSessionClear } from "./hooks/useSessionClear";
import { ConsentBanner } from "./components/consent/ConsentBanner.tsx";

const TakeHome = lazy(() => import("./pages/tools/TakeHome.tsx"));
const Hourly = lazy(() => import("./pages/tools/Hourly.tsx"));
const Reverse = lazy(() => import("./pages/tools/Reverse.tsx"));
const PayRise = lazy(() => import("./pages/tools/PayRise.tsx"));
const Compare = lazy(() => import("./pages/tools/Compare.tsx"));
const ProRata = lazy(() => import("./pages/tools/ProRata.tsx"));
const TwoJobs = lazy(() => import("./pages/tools/TwoJobs.tsx"));
const Maternity = lazy(() => import("./pages/tools/Maternity.tsx"));
const SelfEmployed = lazy(() => import("./pages/tools/SelfEmployed.tsx"));
const Dividend = lazy(() => import("./pages/tools/Dividend.tsx"));
const IR35 = lazy(() => import("./pages/tools/IR35.tsx"));
const CostOfLiving = lazy(() => import("./pages/tools/CostOfLiving.tsx"));
const Disclaimer = lazy(() => import("./pages/legal/Disclaimer.tsx"));
const Privacy = lazy(() => import("./pages/legal/Privacy.tsx"));
const Terms = lazy(() => import("./pages/legal/Terms.tsx"));
const Methodology = lazy(() => import("./pages/Methodology.tsx"));
const Directory = lazy(() => import("./pages/Directory.tsx"));
const Insights = lazy(() => import("./pages/insights/Insights.tsx"));
const InsightDetail = lazy(() => import("./pages/insights/InsightDetail.tsx"));
const SalaryPage = lazy(() => import("./pages/programmatic/SalaryPage.tsx"));
const Childcare = lazy(() => import("./pages/tools/Childcare.tsx"));
const EVSalary = lazy(() => import("./pages/tools/EVSalary.tsx"));
const ContractorTakeHome = lazy(() => import("./pages/tools/ContractorTakeHome.tsx"));
const NhsPay = lazy(() => import("./pages/tools/NhsPay.tsx"));
const Umbrella = lazy(() => import("./pages/tools/Umbrella.tsx"));
const DayRate = lazy(() => import("./pages/tools/DayRate.tsx"));
const BonusTax = lazy(() => import("./pages/tools/BonusTax.tsx"));
const Overtime = lazy(() => import("./pages/tools/Overtime.tsx"));
const TeacherPay = lazy(() => import("./pages/tools/TeacherPay.tsx"));
const About = lazy(() => import("./pages/About.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));

const queryClient = new QueryClient();

const Loader = () => (
  <div className="flex min-h-[50vh] items-center justify-center">
    <div className="size-6 rounded-full border-2 border-accent border-t-transparent animate-spin" />
  </div>
);

const App = () => {
  useSessionClear();
  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/take-home" element={<TakeHome />} />
            <Route path="/hourly" element={<Hourly />} />
            <Route path="/reverse" element={<Reverse />} />
            <Route path="/pay-rise" element={<PayRise />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/pro-rata" element={<ProRata />} />
            <Route path="/two-jobs" element={<TwoJobs />} />
            <Route path="/maternity" element={<Maternity />} />
            <Route path="/self-employed" element={<SelfEmployed />} />
            <Route path="/dividend" element={<Dividend />} />
            <Route path="/ir35" element={<IR35 />} />
            <Route path="/cost-of-living" element={<CostOfLiving />} />
            <Route path="/oxford-methodology" element={<Methodology />} />
            <Route path="/methodology" element={<Methodology />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
                          <Route path="/childcare" element={<Childcare />} />
              <Route path="/salary-sacrifice/electric-car" element={<EVSalary />} />
              <Route path="/contractor/take-home" element={<ContractorTakeHome />} />
              <Route path="/nhs" element={<NhsPay />} />
              <Route path="/umbrella" element={<Umbrella />} />
              <Route path="/day-rate" element={<DayRate />} />
              <Route path="/bonus" element={<BonusTax />} />
              <Route path="/overtime" element={<Overtime />} />
              <Route path="/teacher" element={<TeacherPay />} />
              <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:slug" element={<InsightDetail />} />
            <Route path="/salary/:amount" element={<SalaryPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <ConsentBanner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;