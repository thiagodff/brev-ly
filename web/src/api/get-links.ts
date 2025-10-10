interface Link {
  url: string;
  slug: string;
  redirectCount: number;
}

interface LinksResponse {
  links: Link[];
  total: number;
  error?: string;
}

export async function getLinks(): Promise<LinksResponse> {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/links`);
  return response.json();
}