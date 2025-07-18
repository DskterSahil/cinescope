// utils/fetchAllData.js
export async function fetchAllData() {
  const res = await fetch("https://cinescope-ncpj.onrender.com/");
  if (!res.ok) {
    throw new Error("Failed to fetch movie data");
  }

  const data = await res.json();
  return data;
}
