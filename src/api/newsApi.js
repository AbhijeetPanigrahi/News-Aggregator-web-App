import axios from "axios";

// Using Saurav.tech NewsAPI Proxy (Free, No Key required)
const BASE_URL = "https://saurav.tech/NewsAPI/top-headlines/category";

const generateId = (url) => {
  let hash = 0;
  if (url.length === 0) return hash;
  for (let i = 0; i < url.length; i++) {
    const char = url.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash); // Ensure positive ID
};

export const fetchNews = async (
  category = "general",
  searchQuery = "",
  page = 1,
  pageSize = 10
) => {
  try {
    // Map custom categories to API supported categories
    const categoryMap = {
      Politics: "general", // Proxy doesn't have politics, use general
      Sports: "sports",
      Business: "business",
      Economy: "business",
      Entertainment: "entertainment",
      Culture: "entertainment",
      Technology: "technology",
      Tech: "technology",
      Science: "science",
      Health: "health",
      General: "general",
      "Top News": "general",
      New: "general",
      Home: "general",
    };

    const apiCategory = categoryMap[category] || "general";

    // Using 'us' as the default country
    const response = await axios.get(`${BASE_URL}/${apiCategory}/us.json`);

    let articles = response.data.articles.map((article) => ({
      id: generateId(article.url),
      title: article.title,
      description: article.description,
      content: article.content,
      category:
        category === "Home" || category === "Top News" ? "General" : category,
      publishedAt: article.publishedAt,
      source: article.source.name,
      imageUrl: article.urlToImage,
      url: article.url, // Keep original URL
    }));

    // Client-side filtering for 'Politics' since API doesn't support it directly
    if (category === "Politics") {
      const politicsKeywords = [
        "biden",
        "trump",
        "election",
        "senate",
        "house",
        "government",
        "law",
        "court",
        "policy",
        "political",
        "congress",
        "democrat",
        "republican",
        "minister",
        "president",
      ];
      articles = articles.filter((article) => {
        const text = (article.title + " " + article.description).toLowerCase();
        // .some() is an array method that checks if at least one element in an array satisfies a condition.
        return politicsKeywords.some((keyword) => text.includes(keyword));
      });
      // Fallback: if no specific politics news found, just show generic general news to avoid empty page
      if (articles.length === 0) {
        // re-fetch general without filter if strict filter returns nothing?
        // actually let's just keep the filtered list, potentially empty is better than wrong data.
        // OR allow some general news.
        // Let's stick to the filter for accuracy.
      }
    }

    // Client-side filtering for Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      articles = articles.filter(
        (article) =>
          (article.title && article.title.toLowerCase().includes(q)) ||
          (article.description && article.description.toLowerCase().includes(q))
      );
    }

    // Client-side pagination
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Return structured data
    return {
      status: "ok",
      totalResults: articles.length,
      articles: articles.slice(startIndex, endIndex),
    };
  } catch (error) {
    console.warn("API Error, falling back to mock logic if needed:", error);
    throw new Error("Failed to fetch news from valid source.");
  }
};

export const fetchAllNews = async (page = 1, pageSize = 10) => {
  // Reuse fetchNews for 'general' as a catch-all
  return fetchNews("general", "", page, pageSize);
};
