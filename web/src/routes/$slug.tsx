import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { Card } from "../components/ui/card";

import { getLink } from "../api/get-link";

import Logo from "../assets/Logo_Icon.svg?react";
import Error404 from "../assets/404.svg?react";

export const Route = createFileRoute("/$slug")({
  component: RouteComponent,
  loader: ({ params }) => getLink(params.slug),
});

function RouteComponent() {
  const { url } = Route.useLoaderData();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (url) {
      window.location.href = url;
    } else {
      setIsError(true);
    }
  }, [url]);

  return (
    <div className="flex justify-center items-center h-full">
      <Card className="flex flex-col items-center gap-6 max-w-[580px] w-full py-12 md:py-16">
        {isError ? (
          <>
            <Error404 className="h-20 w-48" />
            <h1 className="text-xl leading-8 text-gray-600 font-bold">
              Link não encontrado
            </h1>
            <div className="text-center text-md leading-5 text-gray-500 font-semibold">
              <span>
                O link que você está tentando acessar não existe, foi removido
                ou é uma URL inválida. Saiba mais em{" "}
                <Link to="/" className="text-blue-base underline">
                  brev.ly
                </Link>
                .
              </span>
            </div>
          </>
        ) : (
          <>
            <Logo className="max-h-12 max-w-12" />
            <h1 className="text-xl leading-8 text-gray-600 font-bold">
              Redirecionando...
            </h1>
            <div className="text-center text-md leading-5 text-gray-500 font-semibold">
              <p>O link será aberto automaticamente em alguns instantes.</p>
              <span className="mt-1">
                Não foi redirecionado?{" "}
                <a href={url} className="text-blue-base underline">
                  Acesse aqui
                </a>
              </span>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
