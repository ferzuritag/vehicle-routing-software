import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AppContextProvider } from "./context/AppContext.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppContextProvider>
      <ChakraProvider
        toastOptions={{
          defaultOptions: {
            position: "top",
          },
        }}
        theme={theme}
      >
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ChakraProvider>
    </AppContextProvider>
  </StrictMode>
);
