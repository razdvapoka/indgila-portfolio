import { Component } from "preact";
import { Router, Link, route } from "preact-router";

import { Small, Huge, Regular } from "../../components/text";
import { findFirstBy, head, pxToRem } from "../../utils";
import Layout from "../../components/layout";
import Markdown from "../../components/markdown";
import content from "../../../content.json";
import styles from "./styles.styl";

class Image extends Component {
  state = {
    isLoaded: this.props.isInCache,
    observer: null
  };

  checkVisibility = intersectionEntries => {
    const { observer } = this.state;
    const { slug, index } = this.props;
    if (intersectionEntries[0].intersectionRatio > 0) {
      this.loadImage();
      if (observer) {
        observer.unobserve(this.base);
        this.setState({ observer: null });
      }
    }
  };

  loadImage = () => {
    const { url, width, index, slug, addToCache } = this.props;
    const image = new window.Image();
    image.onload = () => {
      this.setState({ isLoaded: true });
      addToCache(`${slug}-${index}`);
    };
    image.src = this.getImageUrl(false);
  };

  getImageUrl = isLowQuality => {
    const { url, width } = this.props;
    return `${url}?w=${isLowQuality ? width / 2 : width}${isLowQuality ? "&q=1" : ""}`;
  };

  componentDidMount() {
    if (!this.props.isInCache) {
      const observer = new IntersectionObserver(this.checkVisibility);
      observer.observe(this.base);
      this.setState({ observer });
    }
  }

  render({ url, width, ...rest }, { isLoaded }) {
    const src = this.getImageUrl(!isLoaded);
    return (
      <img
        className={isLoaded ? styles.image : styles.imagePreview}
        src={src}
        style={{ width: pxToRem(width / 2) }}
        {...rest}
      />
    );
  }
}

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

  getProjectImages = project => project && project.fields.images;

  getImageWidth = image => image.fields.file.details.image.width;

  addToCache = slug => {
    this.setState({
      imageCache: [...this.state.imageCache, slug]
    });
  };

  goHome = () => route("/");

  render({ projectSlug }, { selectedProjectSlug, imageCache }) {
    const activeProjectSlug = projectSlug || selectedProjectSlug;
    const activeProject = this.getProjectBySlug(activeProjectSlug);
    const activeProjectImages = this.getProjectImages(activeProject);
    const isProjectOpen = !!projectSlug;
    return (
      <Layout isMain>
        <div className={styles.main}>
          {activeProject && (
            <div className={styles.projectBox} onClick={this.goHome}>
              {activeProjectImages
                .slice(0, projectSlug ? activeProjectImages.length : 1)
                .map((image, imageIndex) => {
                  const projectKey = `${activeProject.fields.slug}-${imageIndex}`;
                  const isProjectInCache = imageCache.indexOf(projectKey) !== -1;
                  return (
                    <Image
                      key={projectKey}
                      index={imageIndex}
                      url={image.fields.file.url}
                      width={this.getImageWidth(image)}
                      slug={activeProject.fields.slug}
                      addToCache={this.addToCache}
                      isInCache={isProjectInCache}
                    />
                  );
                })}
            </div>
          )}
          <Huge
            id="projectList"
            className={isProjectOpen ? styles.projectListFixed : styles.projectList}
            as="ul"
          >
            {[
              ...content.projects.fields.projects,
              ...content.projects.fields.projects,
              ...content.projects.fields.projects
            ].map(item => {
              const { title, slug } = item.fields;
              const isActive = slug === activeProjectSlug;
              return (
                <li className={isActive ? styles.projectActive : styles.project}>
                  {item.fields.title}
                  <Link
                    onMouseEnter={() => this.selectProject(item.fields.slug)}
                    onMouseLeave={() => this.selectProject(null)}
                    href={`/project/${item.fields.slug}`}
                  />
                </li>
              );
            })}
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
        <Main path="/project/:projectSlug" />
        <About path="/about" />
      </Router>
    );
  }
}
