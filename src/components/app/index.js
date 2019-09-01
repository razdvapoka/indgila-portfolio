import { Component } from "preact";
import content from "../../../content.json";
import { Small, Huge, Regular } from "../../components/text";
import Markdown from "../../components/markdown";
import styles from "./styles.styl";
import Layout from "../../components/layout";
import { Router, Link } from "preact-router";
import { pxToRem } from "../../utils";

class Main extends Component {
  state = {
    selectedProjectSlug: null
  };

  selectProject = selectedProjectSlug => {
    this.setState({ selectedProjectSlug });
  };

  getSelectedProject = () => {
    const { selectedProjectSlug } = this.state;
    const projects = content.projects.fields.projects;
    if (selectedProjectSlug) {
      const selectedProjects = projects.filter(p => p.fields.slug === selectedProjectSlug);
      return selectedProjects.length > 0 ? selectedProjects[0] : null;
    }
  };

  getProjectPreview = project => {
    return project && project.fields.images.length > 0 ? project.fields.images[0] : null;
  };

  render({ projectId }) {
    const { selectedProjectSlug } = this.state;
    const selectedProject = this.getSelectedProject();
    const selectedProjectPreview = this.getProjectPreview(selectedProject);
    const previewWidthPx =
      selectedProjectPreview && selectedProjectPreview.fields.file.details.image.width / 2;
    const previewWidthRem = pxToRem(previewWidthPx);
    return (
      <Layout isMain>
        <div className={styles.main}>
          {selectedProjectPreview && (
            <div className={styles.projectBox}>
              <img
                className={styles.preview}
                src={`${selectedProjectPreview.fields.file.url}?w=${previewWidthPx}&q=1`}
                style={{ width: previewWidthRem }}
              />
            </div>
          )}
          <Huge className={styles.projects} as="ul">
            {content.projects.fields.projects.map(item => (
              <li>
                {item.fields.title}
                <Link
                  onMouseEnter={() => this.selectProject(item.fields.slug)}
                  onMouseLeave={() => this.selectProject(null)}
                  href={`/project/${item.fields.slug}`}
                />
              </li>
            ))}
          </Huge>
        </div>
      </Layout>
    );
  }
}

const About = props => {
  return (
    <Layout blogUrl={"#"}>
      <div className={styles.about}>
        <Regular
          className={styles.aboutDescription}
          as={Markdown}
          markdown={content.about.fields.description}
        />
        <div className={styles.aboutLists}>
          <div className={styles.aboutListsCol}>
            <Small
              className={styles.aboutList}
              as={Markdown}
              markdown={content.about.fields.experience}
            />
            <Small
              className={styles.aboutList}
              as={Markdown}
              markdown={content.about.fields.lectures}
            />
          </div>
          <div className={styles.aboutListsCol}>
            <Small
              className={styles.aboutList}
              as={Markdown}
              markdown={content.about.fields.exhibitions}
            />
            <Small
              className={styles.aboutList}
              as={Markdown}
              markdown={content.about.fields.publications}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default class App extends Component {
  render() {
    return (
      <Router>
        <Main path="/" />
        <Main path="/project/:projectId" />
        <About path="/about" />
      </Router>
    );
  }
}
