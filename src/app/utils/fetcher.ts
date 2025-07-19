async function fetcher(url: string, options?: RequestInit) {
  if (!url) throw new Error("No url provided");

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export default fetcher;
