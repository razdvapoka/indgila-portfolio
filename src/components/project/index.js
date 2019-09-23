import { Small } from "../text";
import Image from "../image";
import Markdown from "../markdown";
import styles from "./styles.styl";
import { pxToRem } from "../../utils";

const TOP_OFFSET = 20;
const MAX_IMAGE_WIDTH = 800;

const getVerticalShift = firstImage => {
  const realWidth = Math.min(firstImage.width / 2, MAX_IMAGE_WIDTH);
  const realHeight = (firstImage.height * realWidth) / firstImage.width;
  return window.innerWidth < 600 ? 0 : pxToRem(realHeight / 2 + TOP_OFFSET);
};

const Project = ({ project, isProjectOpen, imageCache, addToCache }) => {
  const { images, slug, description } = project.fields;
  const firstImage = images.map(i => i.fields.file.details.image)[0];
  const verticalShift = getVerticalShift(firstImage);
  return (
    <div className={styles.projectBox} style={{ transform: `translateY(-${verticalShift})` }}>
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
