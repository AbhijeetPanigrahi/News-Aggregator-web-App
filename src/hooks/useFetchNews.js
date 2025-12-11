import { useState, useEffect } from "react";
import { fetchNews as fetchNewsApi } from "../api/newsApi";

const useFetchNews = (category = "", searchQuery = "") => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchNewsApi(category, searchQuery, 1, 20); // Fetch first 20 items
        setNews(response.articles);
      } catch (err) {
        setError(err.message || "Failed to fetch news");
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, [category, searchQuery]);

  return { news, loading, error };
};

export default useFetchNews;
