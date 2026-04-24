import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import TakeHome from "./pages/tools/TakeHome.tsx";
import Hourly from "./pages/tools/Hourly.tsx";
import Reverse from "./pages/tools/Reverse.tsx";
import PayRise from "./pages/tools/PayRise.tsx";
import Compare from "./pages/tools/Compare.tsx";
import ProRata from "./pages/tools/ProRata.tsx";
import TwoJobs from "./pages/tools/TwoJobs.tsx";
import Maternity from "./pages/tools/Maternity.tsx";
import SelfEmployed from "./pages/tools/SelfEmployed.tsx";
import Dividend from "./pages/tools/Dividend.tsx";
import IR35 from "./pages/tools/IR35.tsx";
import CostOfLiving from "./pages/tools/CostOfLiving.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
