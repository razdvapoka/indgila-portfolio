import { Component } from "preact";
import { Router, Link } from "preact-router";

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
    if (intersectionEntries[0].intersectionRatio > 0.1) {
      this.loadImage();
      if (observer) {
        observer.unobserve(this.base);
        this.setState({ observer: null });
      }
    }
  };

  loadImage = () => {
    const { url, width, slug, addToCache } = this.props;
    const image = new window.Image();
    image.onload = () => {
      this.setState({ isLoaded: true });
      addToCache(slug);
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

  render({ projectSlug }, { selectedProjectSlug, imageCache }) {
    const selectedProject = this.getProjectBySlug(selectedProjectSlug);
    const selectedProjectPreview = head(this.getProjectImages(selectedProject));
    const previewWidthPx = selectedProjectPreview && this.getImageWidth(selectedProjectPreview);
    return (
      <Layout isMain>
        <div className={styles.main}>
          {selectedProjectPreview && (
            <div className={styles.projectBox}>
              <Image
                key={selectedProjectSlug}
                url={selectedProjectPreview.fields.file.url}
                width={previewWidthPx}
                slug={selectedProjectSlug}
                addToCache={this.addToCache}
                isInCache={imageCache.indexOf(selectedProjectSlug) !== -1}
              />
            </div>
          )}
          <Huge className={styles.projects} as="ul">
            {[
              ...content.projects.fields.projects,
              ...content.projects.fields.projects,
              ...content.projects.fields.projects
            ].map(item => (
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
        <Main path="/project/:projectSlug" />
        <About path="/about" />
      </Router>
    );
  }
}
