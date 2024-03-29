export function getAssetURL(id) {
  if (!id) return null;
  return `${process.env.REACT_APP_DIRECTUS_URL}/assets/${id}`;
}

export function getAssetPrefix(id) {
  return `${process.env.REACT_APP_DIRECTUS_URL}/`;
}

