import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SnowBackground from "./components/SnowBackground";

const queryClient = new QueryClient();

const App = () => {
  const isDark = document.documentElement.classList.contains("dark");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* ❄️ Snow background */}
        <SnowBackground theme={isDark ? "dark" : "light"} />

        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
