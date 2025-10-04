import { CopyIcon } from "@phosphor-icons/react";
import { Button } from "./components/ui/Button";
import { IconButton } from "./components/ui/IconButton";
import { Input } from "./components/ui/Input";

export function App() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4">
      <Button>
        <CopyIcon size={16} />
        Label
      </Button>

      <IconButton>
        <CopyIcon size={16} />
      </IconButton>

      <Input id="title" error="Campo obrigatório" placeholder="Placeholder" />
    </div>
  );
}
