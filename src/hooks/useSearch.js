import { useState, useEffect } from "react";

const useSearch = (articles, searchTerm) => {
  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      const results = articles.filter(
        (article) =>
          article.title.toLowerCase().includes(lowercasedTerm) ||
          article.description.toLowerCase().includes(lowercasedTerm) ||
          article.content.toLowerCase().includes(lowercasedTerm)
      );
      setFilteredArticles(results);
    } else {
      setFilteredArticles(articles);
    }
  }, [articles, searchTerm]);

  return filteredArticles;
};

export default useSearch;
