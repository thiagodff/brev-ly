import { CopyIcon, TrashIcon } from "@phosphor-icons/react";
import type { Link } from "./link-list";
import { Divider } from "./ui/divider";
import { IconButton } from "./ui/icon-button";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLink } from "../api/delete-link";

interface LinkItemProps extends Link {}

export function LinkItem({ url, slug, redirectCount }: LinkItemProps) {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteLinkFn } = useMutation({
    mutationFn: deleteLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });

  const shortUrl = `${import.meta.env.VITE_FRONTEND_URL}/${slug}`;

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Link copiado para a área de transferência!");
  };

  const handleDeleteLink = async () => {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir este link?"
    );
    if (!confirmed) return;

    await deleteLinkFn(slug);
    toast.success("Link excluído com sucesso!");
  };

  return (
    <li>
      <Divider />

      <div className="flex justify-between items-center w-full mt-4">
        <div className="flex flex-col gap-1 pr-3">
          <a
            href={shortUrl}
            target="_blank"
            rel="noreferrer"
            className="text-md text-blue-base font-semibold leading-5"
          >
            brev.ly/{slug}
          </a>
          <span className="text-sm text-gray-500 leading-4">{url}</span>
        </div>

        <div className="flex items-center">
          <span className="text-sm text-gray-500 leading-4 mr-5 text-nowrap">
            {redirectCount} acessos
          </span>
          <IconButton onClick={copyLinkToClipboard}>
            <CopyIcon size={16} />
          </IconButton>
          <IconButton className="ml-1" onClick={handleDeleteLink}>
            <TrashIcon size={16} />
          </IconButton>
        </div>
      </div>
    </li>
  );
}
