// utils/normalizeUrl.ts
export function normalizeUrl(url: string) {
  try {
    const u = new URL(url);

    // remove fragment (#something)
    u.hash = "";

    // remove UTM params
    u.searchParams.forEach((_, key) => {
      if (key.startsWith("utm_")) u.searchParams.delete(key);
    });

    // lowercase host
    u.hostname = u.hostname.toLowerCase();

    return u.toString();
  } catch {
    return url; // fallback
  }
}
