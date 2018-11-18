import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import MenuBar from "./components/MenuBar/MenuBar";
import Footer from "./components/Footer/Footer";
import Clipboard from "clipboard";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    new Clipboard(".copy-src");
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" component={MenuBar} />
          <Route exact path="/" component={Home} />
          <Route path="/" component={Footer} />
        </div>
      </Router>
    );
  }
}

export default App;
