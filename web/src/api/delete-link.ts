export async function deleteLink(slug: string) {
  return fetch(`${import.meta.env.VITE_BACKEND_URL}/link/${slug}`, {
    method: 'DELETE',
  });
}
