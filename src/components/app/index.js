import { Component } from "preact";
import { Router } from "preact-router";

import About from "../about";
import Projects from "../main";

export default class App extends Component {
  render() {
    return (
      <Router>
        <About path="/" />
        <Projects path="/projects/:projectSlug" />
        <Projects path="/projects" />
      </Router>
    );
  }
}
