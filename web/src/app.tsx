import Logo from "./assets/Logo.svg?react";
import { CreateLink } from "./components/create-link";

export function App() {
  return (
    <main className="h-dvh flex flex-col gap-6 md:gap-8 px-3 pt-6 md:pt-20 items-center md:items-stretch bg-gray-200 text-gray-600 ">
      <h1 className="pt-2" aria-label="brevly logo">
        <Logo className="max-h-6 max-w-24" />
      </h1>

      <div className="w-full">
        <CreateLink />
        {/* <Button>
          <CopyIcon size={16} />
          Label
        </Button>

        <IconButton>
          <CopyIcon size={16} />
        </IconButton>

        <Input id="title" error="Campo obrigatório" placeholder="Placeholder" /> */}
      </div>
    </main>
  );
}
