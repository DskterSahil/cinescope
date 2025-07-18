// utils/fetchAllData.js
export async function fetchAllData() {
  const res = await fetch("http://localhost:3000/");
  if (!res.ok) {
    throw new Error("Failed to fetch movie data");
  }

  const data = await res.json();
  return data;
}
