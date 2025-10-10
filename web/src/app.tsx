import { QueryClientProvider } from "@tanstack/react-query";
import Logo from "./assets/Logo.svg?react";
import { CreateLink } from "./components/create-link";
import { LinkList } from "./components/link-list";
import { queryClient } from "./lib/react-query";
import { ToastContainer } from "react-toastify";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="h-dvh flex flex-col gap-6 md:gap-8 px-3 pt-6 md:pt-20 items-center md:items-stretch text-gray-600 max-w-5xl mx-auto">
        <h1 className="pt-2" aria-label="brevly logo">
          <Logo className="max-h-6 max-w-24" />
        </h1>

        <div className="w-full flex flex-col gap-3 md:gap-5 md:flex-row">
          <CreateLink />

          <LinkList />
        </div>
      </main>
      <ToastContainer position="bottom-right" hideProgressBar closeOnClick />
    </QueryClientProvider>
  );
}
