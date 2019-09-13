import { Component } from "preact";
import { pxToRem } from "../../utils";
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
        style={{ width: window && window.innerWidth < 600 ? "100%" : pxToRem(width / 2) }}
        {...rest}
      />
    );
  }
}

export default Image;
