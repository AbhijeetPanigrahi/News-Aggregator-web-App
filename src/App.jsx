import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/article/:id" component={ArticleDetailPage} />
        <Route path="/favorites" component={FavoritesPage} />
        <Route path="/profile" component={ProfilePage} />
      </Switch>
    </Router>
  );
};

export default App;
