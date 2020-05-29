import React from "react";
import "./App.css";
import VideoUpload from "./components/VideoUpload";
import VideosList from "./components/VideosList";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="container mt-4">
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
          <Link className="navbar-brand" to="/videos">
            {" "}
            Videos{" "}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/upload">
                  {" "}
                  Upload Video{" "}
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/videos">
            <VideosList />
          </Route>
          <Route path="/upload">
            <VideoUpload />
          </Route>
          <Route path="/">
            <VideosList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
