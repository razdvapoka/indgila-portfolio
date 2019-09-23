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
      if (window.innerWidth < 600) {
        this.launchVideo();
      }
    } else {
      if (isPlaying) {
        this.pauseVideo();
      }
    }
  };

  launchVideo = () => {
    this.base.play();
    this.setState({ isPlaying: true });
  };

  pauseVideo = () => {
    this.base.pause();
    this.setState({ isPlaying: false });
  };

  componentDidMount() {
    const observer = new IntersectionObserver(this.checkVisibility);
    observer.observe(this.base);
    this.setState({ observer });
  }

  componentWillUnmount() {
    const { observer } = this.state;
    if (observer) {
      observer.unobserve(this.base);
    }
  }

  render(props) {
    return <video {...props} />;
  }
}

export default Video;
