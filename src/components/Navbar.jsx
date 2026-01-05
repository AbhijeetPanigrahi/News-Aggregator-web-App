import React, { useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars, faTimes, faSun, faMoon, faUser } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";

const Navbar = () => {
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const currentCategory = searchParams.get("category") || "Top News";
  const { theme, toggleTheme } = useTheme();
  const { currentUser, logout } = useAuth();

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const categories = [
    "Home",
    "New",
    "Top News",
    "Politics",
    "Sports",
    "Economy",
    "Culture",
    "Technology",
    "Science",
    "Health",
  ];

  const handleCategoryClick = (category) => {
    if (category === "Home" || category === "Top News" || category === "New") {
      history.push("/");
    } else {
      const categoryMap = {
        Politics: "Politics",
        Sports: "Sports",
        Economy: "Business",
        Culture: "Entertainment",
        Technology: "Technology",
        Science: "Science",
        Health: "Health",
      };
      const mappedCategory = categoryMap[category] || category;
      history.push(`/?category=${mappedCategory}`);
    }
  };

  const handleSearch = (query) => {
    if (location.pathname !== "/") {
      history.push(`/?q=${encodeURIComponent(query)}`);
    } else {
      const params = new URLSearchParams(location.search);
      if (query) {
        params.set("q", query);
      } else {
        params.delete("q");
      }
      history.push({ search: params.toString() });
    }
    setIsSearchOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      history.push("/login");
    } catch {
      console.error("Failed to log out");
    }
  };

  const handleProfileClick = () => {
    if (currentUser) {
      history.push("/profile");
    } else {
      history.push("/login");
    }
  };


  return (
    <header className="bg-surface sticky top-0 z-50 transition-colors duration-300 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">

        {/* Top Bar: Grid Layout for perfect centering */}
        <div className="grid grid-cols-3 items-center h-20 relative">

          {/* Left Column */}
          <div className="flex items-center justify-start">
            {isSearchOpen ? (
              <div className="absolute inset-0 bg-surface z-20 flex items-center w-full animate-fade-in pr-10">
                <SearchBar
                  onSearch={handleSearch}
                  initialValue={searchParams.get("q") || ""}
                />
                <button
                  className="ml-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-text-primary text-xl"
                  onClick={() => setIsSearchOpen(false)}
                  title="Close Search"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            ) : (
              <>
                <button
                  title="Search"
                  onClick={() => setIsSearchOpen(true)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-text-primary"
                >
                  <span className="text-xl"><FontAwesomeIcon icon={faSearch} /></span>
                </button>
              </>
            )}
          </div>

          {/* Center Column: Logo */}
          <div className="flex justify-center">
            {!isSearchOpen && (
              <Link
                to="/"
                className="text-2xl md:text-3xl font-black text-text-primary tracking-tight no-underline hover:opacity-80 transition-opacity"
              >
                VERTONEWS
              </Link>
            )}
          </div>

          {/* Right Column */}
          <div className="flex items-center justify-end">
            {!isSearchOpen && (
              <div className="flex items-center">
                {/* Theme Toggle - Visible on Desktop only, moved to pages on mobile */}
                <button
                  onClick={toggleTheme}
                  className="hidden md:flex w-10 h-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-text-primary font-bold text-lg mr-1"
                  title="Toggle Theme"
                >
                  {theme === 'light' ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}
                </button>

                {/* Desktop: Separator & Auth Buttons */}
                <div className="hidden md:flex items-center">
                  <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-3 block"></div>

                  {currentUser ? (
                    <>
                      <button
                        title="Profile"
                        onClick={() => history.push("/profile")}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-text-primary mr-2"
                      >
                        <span className="text-xl"><FontAwesomeIcon icon={faUser} /></span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="whitespace-nowrap px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 bg-gray-200 dark:bg-gray-800 text-text-primary hover:bg-gray-300 dark:hover:bg-gray-700"
                      >
                        Log Out
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="whitespace-nowrap px-5 py-2 rounded-full font-bold text-sm transition-all duration-200 bg-primary-main text-white hover:bg-primary-dark shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      Log In
                    </Link>
                  )}
                </div>

                {/* Mobile: Profile Icon ONLY */}
                <div className="flex md:hidden">
                  <button
                    onClick={handleProfileClick}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-text-primary text-xl"
                    title={currentUser ? "Profile" : "Log In"}
                  >
                    <FontAwesomeIcon icon={faUser} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Categories (Desktop/Tablet) */}
        <nav className="flex items-center justify-between pb-4 pt-2 overflow-x-auto no-scrollbar mask-image-scroll md:flex">
          {categories.map((category) => {
            const categoryMap = {
              Politics: "Politics",
              Sports: "Sports",
              Economy: "Business",
              Culture: "Entertainment",
              Technology: "Technology",
              Science: "Science",
              Health: "Health",
            };
            const mappedCategory = categoryMap[category] || "";
            const isActive =
              (category === "Home" && !currentCategory) ||
              (category === "Top News" && !currentCategory) ||
              (category === "New" && currentCategory === "") ||
              (mappedCategory && currentCategory === mappedCategory);

            return (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`
                  whitespace-nowrap px-3 text-[15px] transition-all duration-200 bg-transparent border-none cursor-pointer select-none
                  ${isActive
                    ? 'text-text-primary font-bold border-b-[2.5px] border-text-primary pb-1'
                    : 'text-text-secondary font-medium hover:text-text-primary'
                  }
                `}
              >
                {category}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
