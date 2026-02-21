export function getFavorites(): string[] {
  const favs = localStorage.getItem('favorites');
  return favs ? JSON.parse(favs) : [];
}

export function addFavorite(id: string) {
  const favs = getFavorites();
  if (!favs.includes(id)) {
    favs.push(id);
    localStorage.setItem('favorites', JSON.stringify(favs));
  }
}

export function removeFavorite(id: string) {
  const favs = getFavorites().filter(fav => fav !== id);
  localStorage.setItem('favorites', JSON.stringify(favs));
}

export function isFavorite(id: string): boolean {
  return getFavorites().includes(id);
}
