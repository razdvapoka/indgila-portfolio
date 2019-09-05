import { Component } from "preact";
import { Router } from "preact-router";

import About from "../about";
import Main from "../main";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Main path="/" />
        <Main path="/project/:projectSlug" />
        <About path="/about" />
      </Router>
    );
  }
}
