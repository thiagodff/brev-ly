import { DownloadSimpleIcon, LinkIcon } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Divider } from "./ui/divider";

export function LinkList() {
  return (
    <Card className="w-full flex-7/12">
      <div className="flex justify-between items-center">
        <h2 className="text-lg leading-6 font-bold">Meus Links</h2>

        <Button variant="secondary">
          <DownloadSimpleIcon size={16} />
          Baixar CSV
        </Button>
      </div>

      <div className="mt-4 flex flex-col items-center">
        <>
          <Divider />
          <LinkIcon size={32} className="text-gray-400 mt-8" />
          <span className="uppercase text-gray-500 leading-3.5 text-xs mt-3 mb-6">
            Ainda não existem links cadastrados
          </span>
        </>
      </div>
    </Card>
  );
}
