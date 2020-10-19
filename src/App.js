import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import AdminScreen from "./screens/AdminScreen";
import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="grid-container">
            <header>
              <Link to="/">Shopping</Link>
              <Link to="/admin">Admin</Link>
            </header>
            <main>
              <div className="content">
                <div className="main">
                  <Route path="/" exact component={HomeScreen} />
                  <Route path="/admin" component={AdminScreen} />
                </div>
              </div>
            </main>
            <footer>All right reserved.</footer>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
