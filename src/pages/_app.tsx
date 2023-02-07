import { AppProvider } from "@/contexts/app";
import { AuthProvider } from "@/contexts/auth";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}
