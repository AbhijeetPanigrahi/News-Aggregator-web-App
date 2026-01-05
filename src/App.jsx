
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import ProfilePage from "./pages/ProfilePage";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import { AuthProvider } from "./context/AuthContext";
// import SavedNews from "./pages/SavedNews"; // Will created next

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/article/:id" component={ArticleDetailPage} />
        <Route path="/favorites" component={FavoritesPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {/* <Route path="/saved" component={SavedNews} /> */}
      </Switch>
    </Router>
  );
};

export default App;
