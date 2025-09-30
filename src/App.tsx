import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import CategoryDetail from "./pages/CategoryDetail";
import HowItWorks from "./pages/HowItWorks";
import Affiliate from "./pages/Affiliate";
import Advertise from "./pages/Advertise";
import AdvertiserLogin from "./pages/AdvertiserLogin";
import AdvertiserRegister from "./pages/AdvertiserRegister";
import AffiliateDashboard from "./pages/AffiliateDashboard";
import AdvertiserDashboard from "./pages/AdvertiserDashboard";
import FAQs from "./pages/FAQs";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import EmailTemplates from "./pages/EmailTemplates";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import BioLinkPage from "./pages/BioLinkPage";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/category/:slug" element={<CategoryDetail />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/affiliate" element={<Affiliate />} />
          <Route path="/advertise" element={<Advertise />} />
          <Route path="/advertiser-login" element={<AdvertiserLogin />} />
          <Route path="/advertiser-register" element={<AdvertiserRegister />} />
          <Route path="/affiliate-dashboard" element={<AffiliateDashboard />} />
          <Route path="/advertiser-dashboard" element={<AdvertiserDashboard />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/email-templates" element={<EmailTemplates />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/:username" element={<BioLinkPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
