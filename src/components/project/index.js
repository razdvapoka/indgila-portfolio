import { Small } from "../text";
import Image from "../image";
import Markdown from "../markdown";
import styles from "./styles.styl";
import { pxToRem } from "../../utils";

const TOP_OFFSET = 20;
const TOP_OFFSET_M = 50;
const HOR_PADDING_M = 20;
const MAX_IMAGE_WIDTH = 800;

const getVerticalShift = firstImage => {
  const isMobile = window.innerWidth < 600;
  const realWidth = isMobile
    ? window.innerWidth - HOR_PADDING_M * 2
    : Math.min(firstImage.width / 2, MAX_IMAGE_WIDTH);
  const realHeight = (firstImage.height * realWidth) / firstImage.width;
  return pxToRem(realHeight / 2 + (isMobile ? TOP_OFFSET_M : TOP_OFFSET));
};

const Project = ({ goHome, project, isProjectOpen, imageCache, addToCache }) => {
  const { images, slug, description } = project.fields;
  const firstImage = images.map(i => i.fields.file.details.image)[0];
  const verticalShift = getVerticalShift(firstImage);
  return (
    <div
      className={styles.projectBox}
      onClick={goHome}
      style={{ transform: `translateY(-${verticalShift})` }}
    >
      {images.slice(0, isProjectOpen ? images.length : 1).map((image, imageIndex) => {
        const projectKey = `${slug}-${imageIndex}`;
        const isProjectInCache = imageCache.indexOf(projectKey) !== -1;
        return (
          <Image
            key={projectKey}
            index={imageIndex}
            url={image.fields.file.url}
            width={image.fields.file.details.image.width}
            slug={slug}
            addToCache={addToCache}
            isInCache={isProjectInCache}
          />
        );
      })}
    </div>
  );
};

export default Project;
