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

interface GetLinksProps {
  page?: number;
  pageSize?: number;
}

export async function getLinks({
  page = 1,
  pageSize = 10,
}: GetLinksProps): Promise<LinksResponse> {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/links?page=${page}&pageSize=${pageSize}`
  );
  return response.json();
}