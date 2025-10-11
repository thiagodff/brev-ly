import { QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ToastContainer } from "react-toastify";
import { queryClient } from "../lib/react-query";

const RootLayout = () => (
  <QueryClientProvider client={queryClient}>
    <main className="h-dvh px-3 text-gray-600 max-w-5xl mx-auto">
      <Outlet />
      <TanStackRouterDevtools />
      <ToastContainer position="bottom-right" hideProgressBar closeOnClick />
    </main>
  </QueryClientProvider>
);

export const Route = createRootRoute({ component: RootLayout });
