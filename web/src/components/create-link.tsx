import { useForm, type SubmitHandler } from "react-hook-form";

import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLink } from "../api/create-link";

type Inputs = {
  url: string;
  slug: string;
};

export function CreateLink() {
  const queryClient = useQueryClient();

  const { mutateAsync: createLinkFn, isPending } = useMutation({
    mutationFn: createLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ url, slug }) =>
    await createLinkFn({ url, slug });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="gap-5 md:gap-6 flex-5/12">
        <h2 className="text-lg leading-6 font-bold">Novo Link</h2>

        <div className="flex flex-col gap-4">
          <Input
            id="url"
            title="Link Original"
            error={errors.url?.message}
            placeholder="www.exemplo.com"
            {...register("url", {
              required: { value: true, message: "Campo obrigatório" },
              pattern: {
                value:
                  /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
                message: "URL inválida",
              },
            })}
          />
          <Input
            id="slug"
            title="Link Encurtado"
            error={errors.slug?.message}
            prefix="brev.ly/"
            {...register("slug", {
              maxLength: { value: 30, message: "Máximo 30 caracteres" },
              required: { value: true, message: "Campo obrigatório" },
              pattern: {
                value: /^[a-zA-Z0-9-_]+$/,
                message: "Apenas letras, números, - e _ são permitidos",
              },
            })}
          />
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Salvando..." : "Salvar Link"}
        </Button>
      </Card>
    </form>
  );
}
