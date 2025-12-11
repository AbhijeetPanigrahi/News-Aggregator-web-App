# News Aggregator Web Application

## Overview
The News Aggregator Web Application is a responsive React-based project designed to deliver categorized, searchable, and paginated news content sourced from a JSON API or local JSON dataset. The application emphasizes reusability, clean architecture, and modern React development practices, making it suitable for academic evaluation as well as real-world use.

## Key Features
1. **Real-Time News Fetching**: Fetches news dynamically using Fetch API or Axios, supporting live API integration or local JSON data for offline/demo purposes.
2. **Category-Based Filtering**: Users can filter news content by predefined categories such as Technology, Business, Sports, Entertainment, Health, and General.
3. **Search Functionality**: A search bar allows users to find articles by keywords in the title, description, and content, optimized with debouncing for performance.
4. **Pagination System**: Articles are displayed with client-side pagination, allowing users to navigate across multiple pages.
5. **Article Details Page**: Each article card navigates to a dedicated page containing full description, published date, source info, and image.
6. **Higher-Order Component for Load & Error Handling**: A custom HOC manages loading spinners and error messages for consistent UI behavior.
7. **Custom Hooks for Data Fetching**: Reusable custom hooks handle fetching, loading, error state management, and caching.
8. **Styled-Components for Modern UI**: Modular styles and responsive design using styled-components to avoid global CSS conflicts.
9. **Theme Support via Context API**: Provides light and dark mode support, with preferences stored in localStorage.
10. **Favorites / Saved Articles**: Users can save articles, with persistent state using localStorage.
11. **Responsive and Clean UI**: Designed to work across devices with flexbox and grid layouts.
12. **Clean Architecture & Component Reusability**: Modular folder structure for scalability and clean code separation.

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/news-aggregator-app.git
   ```
2. Navigate to the project directory:
   ```
   cd news-aggregator-app
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Usage
To start the application, run:
```
npm start
```
This will launch the app in your default web browser.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.