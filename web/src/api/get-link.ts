interface GetLinkResponse {
  url: string;
  redirectCount: number;
}

export async function getLink(slug: string): Promise<GetLinkResponse> {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/link/${slug}?redirect=true`);

  return response.json();
}
