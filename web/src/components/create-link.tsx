import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

export function CreateLink() {
  return (
    <Card className="gap-5 md:gap-6">
      <h2 className="text-lg leading-6 font-bold">Novo Link</h2>

      <div className="flex flex-col gap-4">
        <Input id="url" title="Link Original" placeholder="www.exemplo.com" />
        <Input id="slug" title="Link Encurtado" placeholder="brev.ly/" />
      </div>

      <Button>Salvar Link</Button>
    </Card>
  );
}
