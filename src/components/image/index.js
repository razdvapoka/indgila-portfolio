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
    if (intersectionEntries[0].intersectionRatio > 0) {
      this.loadImage();
      if (observer) {
        observer.unobserve(this.base);
        this.setState({ observer: null });
      }
    }
  };

  loadImage = () => {
    const { index, slug, addToCache } = this.props;
    const image = new window.Image();
    image.onload = () => {
      this.setState({ isLoaded: true });
      addToCache(`${slug}-${index}`);
    };
    image.src = this.getImageUrl(false);
  };

  getImageUrl = isLowQuality => {
    const { url, width, enableSizeMod } = this.props;
    return `${url}?${
      enableSizeMod ? `w=${isLowQuality ? Math.floor(width / 2) : Math.min(width, 1600)}` : ""
    }${isLowQuality ? "&q=1" : ""}`;
  };

  componentDidMount() {
    if (!this.props.isInCache) {
      const observer = new IntersectionObserver(this.checkVisibility);
      observer.observe(this.base);
      this.setState({ observer });
    }
  }

  render(
    { url, width, style, overrideStyle = false, enableSizeMod = true, ...rest },
    { isLoaded }
  ) {
    const src = this.getImageUrl(!isLoaded);
    const realWidth =
      typeof window !== "undefined" && window.innerWidth < 600 ? "100%" : pxToRem(width / 2);
    const realStyle = overrideStyle
      ? { width: realWidth, ...style }
      : { ...style, width: realWidth };
    return (
      <img
        className={isLoaded ? styles.image : styles.imagePreview}
        src={src}
        style={enableSizeMod ? realStyle : style}
        {...rest}
      />
    );
  }
}

export default Image;
