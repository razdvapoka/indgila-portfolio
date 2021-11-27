import { Regular, Small } from "../text";
import Layout from "../../components/layout";
import Contacts from "../contacts";
import Markdown from "../markdown";
import content from "../../../content.json";
import styles from "./styles.styl";
import { Component } from "preact";
import Image from "../image";

const ProjectPreview = ({ title, id, setActiveProjectPreviewId, activeProjectPreviewId }) => {
  return (
    <li
      className={id === activeProjectPreviewId ? styles.activeProjectPreview : ""}
      onMouseEnter={() => {
        if (!window.hasTouchEvents) {
          setActiveProjectPreviewId(id);
        }
      }}
      onMouseLeave={() => {
        if (!window.hasTouchEvents) {
          setActiveProjectPreviewId(null);
        }
      }}
      onClick={() => {
        if (window.hasTouchEvents) {
          setActiveProjectPreviewId(id === activeProjectPreviewId ? null : id);
        }
      }}
    >
      {title}
    </li>
  );
};

const ProjectPreviewList = ({
  items,
  title,
  setActiveProjectPreviewId,
  activeProjectPreviewId
}) => {
  return (
    <div>
      <div>{title}</div>
      <ul>
        {items.map(item => (
          <ProjectPreview
            key={item.sys.id}
            id={item.sys.id}
            title={item.fields.title}
            setActiveProjectPreviewId={setActiveProjectPreviewId}
            activeProjectPreviewId={activeProjectPreviewId}
          />
        ))}
      </ul>
    </div>
  );
};

class Roll extends Component {
  state = {
    queue: this.props.items,
    topItemIndex: 0
  };

  handleClick = () => {
    this.setState(({ queue, topItemIndex }) => ({
      topItemIndex: (topItemIndex + 1) % queue.length
    }));
  };

  render() {
    const { imageCache, addToCache } = this.props;
    const { queue, topItemIndex } = this.state;
    return (
      <div className={styles.roll}>
        <div className={styles.rollImageBox}>
          {queue.map((item, itemIndex) => {
            const isInCache = imageCache.indexOf(`${item.sys.id}-0`) !== -1;
            return (
              <div
                key={item.sys.id}
                className={styles.rollImage}
                onClick={this.handleClick}
                style={{
                  zIndex: (queue.length - 1 - itemIndex + topItemIndex) % queue.length
                }}
              >
                <Image
                  index={0}
                  slug={item.sys.id}
                  url={item.fields.image.fields.file.url}
                  width={item.fields.image.fields.file.details.image.width}
                  addToCache={addToCache}
                  isInCache={isInCache}
                  style={{
                    width: "100%",
                    cursor: "pointer"
                  }}
                  overrideStyle
                />
              </div>
            );
          })}
        </div>
        <div className={styles.rollText}>
          <Markdown markdown={queue[topItemIndex].fields.description} />
          <div className={styles.rollNumber}>
            {topItemIndex + 1}/{queue.length}
          </div>
        </div>
      </div>
    );
  }
}

class Main extends Component {
  state = {
    activeProjectPreviewId: null,
    imageCache: []
  };

  addToCache = key => {
    this.setState({
      imageCache: [...this.state.imageCache, key]
    });
  };

  setActiveProjectPreviewId = activeProjectPreviewId => {
    this.setState({ activeProjectPreviewId });
  };

  render() {
    const { mainText, currentCollaborations, latestCollaborations, roll } = content.about.fields;
    const { activeProjectPreviewId, imageCache } = this.state;
    const projectPreviews = [...currentCollaborations, ...latestCollaborations];
    const activeProjectPreview =
      activeProjectPreviewId && projectPreviews.find(pp => pp.sys.id === activeProjectPreviewId);
    const isInCache =
      activeProjectPreview && imageCache.indexOf(`${activeProjectPreview.sys.id}-0`) !== -1;

    return (
      <Layout isMain>
        <div className={styles.mainBox}>
          <div className={styles.main}>
            <div className={styles.collaborations}>
              <ProjectPreviewList
                items={currentCollaborations}
                title="Current сollaborations"
                setActiveProjectPreviewId={this.setActiveProjectPreviewId}
                activeProjectPreviewId={activeProjectPreviewId}
              />
              <ProjectPreviewList
                items={latestCollaborations}
                title="Latest сollaborations"
                setActiveProjectPreviewId={this.setActiveProjectPreviewId}
                activeProjectPreviewId={activeProjectPreviewId}
              />
            </div>
            <div className={styles.descriptionBox}>
              {activeProjectPreview && (
                <div className={styles.projectPreviewImageBox}>
                  <Image
                    key={activeProjectPreview.sys.id}
                    index={0}
                    slug={activeProjectPreview.sys.id}
                    url={activeProjectPreview.fields.image.fields.file.url}
                    width={activeProjectPreview.fields.image.fields.file.details.image.width}
                    addToCache={this.addToCache}
                    isInCache={isInCache}
                  />
                </div>
              )}
              <Markdown className={styles.description} markdown={mainText} />
            </div>
            <div className={styles.contacts}>
              <Contacts />
            </div>
          </div>
          <Roll items={roll} imageCache={imageCache} addToCache={this.addToCache} />
        </div>
      </Layout>
    );
  }
}

export default Main;
