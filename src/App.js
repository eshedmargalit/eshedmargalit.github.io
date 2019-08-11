import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import MenuBar from "./components/MenuBar/MenuBar";
import Footer from "./components/Footer/Footer";
import CV from "./components/CV/CV";
import Research from "./components/Research/Research";
import PaperReviews from "./components/PaperReviews/PaperReviews";
import PaperAWeekEntry from "./components/PaperReviews/PaperAWeekEntry";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import DPCalc from "./components/DPCalc/DPCalc";
import Clipboard from "clipboard";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    new Clipboard(".copy-src");
  }
  render() {
    return (
      <HashRouter>
        <ScrollToTop>
          <div className="App">
            <Route path="/" component={MenuBar} />
            <Route exact path="/" component={Home} />
            <Route exact path="/CV" component={CV} />
            <Route exact path="/Research" component={Research} />
            <Route exact path="/PaperReviews" component={PaperReviews} />
            <Route exact path="/PaperAWeekEntry" component={PaperAWeekEntry} />
            <Route exact path="/DPCalc" component={DPCalc} />
            <Route path="/" component={Footer} />
          </div>
        </ScrollToTop>
      </HashRouter>
    );
  }
}

export default App;
