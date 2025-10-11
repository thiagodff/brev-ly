interface ExportLinksResponse {
  reportUrl: string;
}

export async function exportCsvLinks(): Promise<ExportLinksResponse> {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/links/export`, {
    method: 'POST',
  });

  return response.json();
}
