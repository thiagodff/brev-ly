import { DownloadSimpleIcon, LinkIcon } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Divider } from "./ui/divider";
import { LinkItem } from "./link-item";
import { useQuery } from "@tanstack/react-query";
import { getLinks } from "../api/get-links";
import { BarLoader, MoonLoader } from "react-spinners";

export interface Link {
  url: string;
  slug: string;
  redirectCount: number;
}

export function LinkList() {
  const {
    data: linkList,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["links"],
    queryFn: getLinks,
  });

  const isLinksListEmpty = Boolean(
    linkList?.total === 0 || linkList?.error || !linkList
  );

  console.log({ linkList });

  return (
    <Card className="w-full flex-7/12">
      <div className="flex justify-between items-center">
        <h2 className="text-lg leading-6 font-bold">Meus Links</h2>

        <Button variant="secondary" disabled={isLinksListEmpty}>
          <DownloadSimpleIcon size={16} />
          Baixar CSV
        </Button>
      </div>

      <div className="mt-4 flex flex-col items-center">
        {isLinksListEmpty ? (
          <>
            {isLoading ? (
              <>
                <BarLoader
                  width="100%"
                  height={1}
                  color="var(--color-blue-base)"
                />
                <MoonLoader
                  size={24}
                  color={"var(--color-gray-400)"}
                  className="mt-8"
                />
                <span className="uppercase text-gray-500 leading-3.5 text-xs mt-3 mb-6">
                  Carregando links
                </span>
              </>
            ) : (
              <>
                <Divider />
                <LinkIcon size={32} className="text-gray-400 mt-8" />
                <span className="uppercase text-gray-500 leading-3.5 text-xs mt-3 mb-6">
                  Ainda não existem links cadastrados
                </span>
              </>
            )}
          </>
        ) : (
          <>
            {isFetching && (
              <BarLoader
                width="100%"
                height={1}
                color="var(--color-blue-base)"
                className="mt-[-1px]"
              />
            )}
            <ul className="w-full flex flex-col gap-4 max-h-[511px] overflow-auto scrollbar">
              {linkList?.links.map(({ url, slug, redirectCount }) => (
                <LinkItem
                  key={slug}
                  url={url}
                  slug={slug}
                  redirectCount={redirectCount}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </Card>
  );
}
