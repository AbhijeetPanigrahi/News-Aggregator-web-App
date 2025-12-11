// Types as JS documentation
// Article interface equivalent
const ArticleShape = {
  id: "",
  title: "",
  description: "",
  content: "",
  category: "",
  publishedAt: "",
  source: "",
  imageUrl: "",
};

// Category interface equivalent
const CategoryShape = {
  name: "",
  label: "",
};

// Theme interface equivalent
const ThemeShape = {
  mode: "light", // 'light' | 'dark'
};

// FavoritesContextType interface equivalent
const FavoritesContextTypeShape = {
  favorites: [],
  addFavorite: (article) => {},
  removeFavorite: (id) => {},
};

// ThemeContextType interface equivalent
const ThemeContextTypeShape = {
  theme: {},
  toggleTheme: () => {},
};

export {
  ArticleShape,
  CategoryShape,
  ThemeShape,
  FavoritesContextTypeShape,
  ThemeContextTypeShape,
};
