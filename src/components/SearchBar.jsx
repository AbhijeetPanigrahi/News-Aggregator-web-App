import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ onSearch = () => { }, initialValue = "" }) => {
  const [query, setQuery] = useState(initialValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <div className="absolute left-5 text-gray-400 text-lg pointer-events-none flex items-center">
          <FontAwesomeIcon icon={faSearch} className="w-5 h-5" />
        </div>
        <input
          type="text"
          placeholder="Search news..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full py-3.5 pl-12 pr-12 bg-gray-100 dark:bg-zinc-800 border-none rounded-full text-text-primary text-[15px] font-medium placeholder-gray-400 focus:ring-2 focus:ring-text-primary/20 transition-all outline-none"
          autoFocus
        />
        {query.length > 0 && (
          <button
            onClick={handleClear}
            className="absolute right-4 p-1 rounded-full text-gray-400 hover:text-text-primary hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors flex items-center"
          >
            <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
