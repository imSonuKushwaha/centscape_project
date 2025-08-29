// services/api.ts
const API_URL = "http://localhost:3000"; // change when running on device

export async function fetchPreview(url: string) {
  const res = await fetch(`${API_URL}/preview`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  if (!res.ok) {
    throw new Error("Preview fetch failed");
  }

  return await res.json();
}
