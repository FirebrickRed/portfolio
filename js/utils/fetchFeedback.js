let cachedData = null;

export async function fetchFormResponses() {
  if (cachedData) {
    return cachedData;
  }

  try {
    const res = await fetch('/.netlify/functions/fetch-feedback');
    const data = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${data.error}`);
    }

    const [headers, ...rows] = data.values;
    const formatted = rows.map(row => Object.fromEntries(headers.map((header, i) => [header, row[i] || ""])));

    cachedData = formatted;
    return formatted;
  } catch (error) {
    console.error("failed to fetch from Netlify function: ", error);
    return [];
  }
}
