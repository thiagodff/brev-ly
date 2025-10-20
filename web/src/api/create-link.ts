interface CreateLinkProps {
  url: string;
  slug: string;
}

interface CreateLinkResponse {
  message?: string;
}

export async function createLink({ url, slug }: CreateLinkProps): Promise<CreateLinkResponse | undefined> {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/link`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url, slug }),
  });

  if (!response.ok) {
    return response.json();
  }
}
