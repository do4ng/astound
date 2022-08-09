export function page(): { params: object; query: object } {
  if (typeof window === 'undefined') return { params: {}, query: {} };
  const json = document.getElementById('_astound').innerText;
  return JSON.parse(json);
}
