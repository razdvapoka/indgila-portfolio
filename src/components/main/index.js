import { Component } from "preact";
import { route } from "preact-router";

import { Small } from "../text";
import { findFirstBy } from "../../utils";
import Layout from "../layout";
import Markdown from "../markdown";
import Project from "../project";
import ProjectList from "../project-list";
import content from "../../../content.json";
import styles from "./styles.styl";

class Main extends Component {
  state = {
    selectedProjectSlug: null,
    imageCache: []
  };

  selectProject = selectedProjectSlug => {
    this.setState({ selectedProjectSlug });
  };

  getProjectBySlug = projectSlug => {
    const projects = content.projects.fields.projects;
    return findFirstBy(projects, p => p.fields.slug === projectSlug);
  };

  getProjectItems = project => project && project.fields.items;

  addToCache = slug => {
    this.setState({
      imageCache: [...this.state.imageCache, slug]
    });
  };

  goHome = () => route("/");

  render({ projectSlug }, { selectedProjectSlug, imageCache }) {
    const activeProjectSlug = projectSlug || selectedProjectSlug;
    const activeProject = this.getProjectBySlug(activeProjectSlug);
    const isProjectOpen = !!projectSlug;
    return (
      <Layout isMain isProjectOpen={isProjectOpen} onClick={() => isProjectOpen && this.goHome()}>
        {isProjectOpen && activeProject.fields.description && (
          <Small
            className={styles.projectDescription}
            as={Markdown}
            markdown={activeProject.fields.description}
          />
        )}
        <div>
          {activeProject && (
            <Project
              isProjectOpen={isProjectOpen}
              project={activeProject}
              imageCache={imageCache}
              addToCache={this.addToCache}
            />
          )}
          <ProjectList
            projects={content.projects.fields.projects}
            isProjectOpen={isProjectOpen}
            activeProjectSlug={activeProjectSlug}
            selectProject={this.selectProject}
          />
        </div>
      </Layout>
    );
  }
}

export default Main;
