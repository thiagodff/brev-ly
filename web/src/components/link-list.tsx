import { DownloadSimpleIcon, LinkIcon } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Divider } from "./ui/divider";
import { LinkItem } from "./link-item";

export interface Link {
  url: string;
  slug: string;
  redirectCount: number;
}

export function LinkList() {
  const links = [
    {
      url: "https://google.com",
      slug: "asfd",
      redirectCount: 0,
    },
    {
      url: "https://google.com",
      slug: "af23",
      redirectCount: 4,
    },
    {
      url: "https://google.com",
      slug: "drtf",
      redirectCount: 7,
    },
  ] as Link[];
  const isLinksListEmpty = links.length === 0;

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
        {isLinksListEmpty ? (
          <>
            <Divider />
            <LinkIcon size={32} className="text-gray-400 mt-8" />
            <span className="uppercase text-gray-500 leading-3.5 text-xs mt-3 mb-6">
              Ainda não existem links cadastrados
            </span>
          </>
        ) : (
          <ul className="w-full flex flex-col gap-4 max-h-[511px] overflow-auto scrollbar">
            {links.map(({ url, slug, redirectCount }) => (
              <LinkItem
                key={slug}
                url={url}
                slug={slug}
                redirectCount={redirectCount}
              />
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}
