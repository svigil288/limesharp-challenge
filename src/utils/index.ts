export const getImageUrl = (name: string) => {
  if (!name) return '';
  return new URL(`../assets/images/${name}`, import.meta.url).href;
};