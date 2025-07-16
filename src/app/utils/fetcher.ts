async function fetcher(url: string, options?: RequestInit) {
  if (!url) return console.error("URL was not provided to the fetcher");

  console.log(options);

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export default fetcher;
