interface CreateLinkProps {
  url: string;
  slug: string;
}

export async function createLink({ url, slug }: CreateLinkProps) {
  return fetch(`${import.meta.env.VITE_BACKEND_URL}/link`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url, slug }),
  });
}
