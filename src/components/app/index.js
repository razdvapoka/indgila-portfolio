import { Component } from "preact";
import { Router } from "preact-router";

import Main from "../main";
import Projects from "../projects";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Main path="/" />
        <Projects path="/projects/:projectSlug" />
        <Projects path="/projects" />
      </Router>
    );
  }
}
