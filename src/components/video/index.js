import { Component } from "preact";
import { pxToRem } from "../../utils";
import styles from "./styles.styl";

class Video extends Component {
  state = {
    observer: null,
    isPlaying: false
  };

  checkVisibility = intersectionEntries => {
    const { observer, isPlaying } = this.state;
    const { slug, index } = this.props;
    if (intersectionEntries[0].intersectionRatio > 0) {
      if (window.innerWidth > 600) {
        this.launchVideo();
      }
    } else {
      if (isPlaying) {
        this.pauseVideo();
      }
    }
  };

  getVideoNode = () => this.base.firstChild;

  launchVideo = () => {
    const video = this.getVideoNode();
    video.play();
    this.setState({ isPlaying: true });
  };

  pauseVideo = () => {
    const video = this.getVideoNode();
    video.pause();
    this.setState({ isPlaying: false });
  };

  handlePlayClick = e => {
    e.stopPropagation();
    const { isPlaying } = this.state;
    this.launchVideo();
  };

  handleVideoClick = e => {
    e.stopPropagation();
    const { isPlaying } = this.state;
    if (isPlaying) {
      this.pauseVideo();
    } else {
      this.launchVideo();
    }
  };

  componentDidMount() {
    const observer = new IntersectionObserver(this.checkVisibility);
    observer.observe(this.base);
    this.setState({ observer });
    this.base.firstChild.addEventListener("webkitendfullscreen", this.pauseVideo);
  }

  componentWillUnmount() {
    const { observer } = this.state;
    if (observer) {
      observer.unobserve(this.base);
    }
    this.base.firstChild.removeEventListener("webkitendfullscreen", this.pauseVideo);
  }

  render({ width, style, ...rest }, { isPlaying }) {
    return (
      <div class={styles.videoBox} onClick={this.handleVideoClick}>
        <video
          {...rest}
          class={styles.video}
          muted
          loop
          {...(window.innerWidth >= 600 ? { autoPlay: true } : {})}
          style={{
            ...style,
            width: window && window.innerWidth < 600 ? "100%" : pxToRem(width)
          }}
        />
        {isPlaying || (
          <button class={styles.videoPlayButton} onClick={this.handlePlayClick}>
            play
          </button>
        )}
      </div>
    );
  }
}

export default Video;
