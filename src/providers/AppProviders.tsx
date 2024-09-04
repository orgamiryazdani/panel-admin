import { ReactNode } from "react";
import { TooltipProvider } from "../components/ui/tooltip";
import { AccountProvider } from "../context/AccountProvider";
import { ThemeProvider } from "../context/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "../components/ui/toaster";
import { ProductDemoProvider } from "../context/ProductDemoContext";

export const queryClient = new QueryClient();

function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <AccountProvider>
        <ProductDemoProvider>
          <TooltipProvider>
            <ThemeProvider
              defaultTheme='dark'
              storageKey='vite-ui-theme'>
              {children}
            </ThemeProvider>
          </TooltipProvider>
        </ProductDemoProvider>
      </AccountProvider>
    </QueryClientProvider>
  );
}

export default AppProviders;
