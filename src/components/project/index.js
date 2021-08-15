import { Small } from "../text";
import { pxToRem } from "../../utils";
import Image from "../image";
import Markdown from "../markdown";
import Video from "../video";
import styles from "./styles.styl";

const TOP_OFFSET = 11;
const MAX_IMAGE_WIDTH = 800;

const getVerticalShift = firstImage => {
  const realWidth = Math.min(firstImage.width / 2, MAX_IMAGE_WIDTH);
  const realHeight = (firstImage.height * realWidth) / firstImage.width;
  return window.innerWidth < 600 ? 0 : pxToRem(realHeight / 2 + TOP_OFFSET);
};

const Project = ({ project, isProjectOpen, imageCache, addToCache }) => {
  const { items, slug } = project.fields;
  if (items && items.length > 0) {
    const firstImage = items.map(i => i.fields.image.fields.file.details.image)[0];
    const verticalShift = getVerticalShift(firstImage);
    return (
      <div className={styles.projectBox} style={{ marginBottom: `-${verticalShift}` }}>
        {isProjectOpen && project.fields.description && (
          <Small
            className={styles.projectDescription}
            as={Markdown}
            markdown={project.fields.description}
          />
        )}
        {items.slice(0, isProjectOpen ? items.length : 1).map((item, itemIndex) => {
          const isVideo = item.fields.type === "video";
          const itemKey = `${slug}-${itemIndex}`;
          const isProjectInCache = imageCache.indexOf(itemKey) !== -1;
          return isVideo ? (
            <Video
              key={itemKey}
              src={item.fields.video.fields.file.url}
              poster={item.fields.image.fields.file.url}
              width={item.fields.image.fields.file.details.image.width / 2}
              style={itemIndex === 0 && { marginTop: `-${verticalShift}` }}
            />
          ) : (
            <Image
              key={itemKey}
              style={itemIndex === 0 && { marginTop: `-${verticalShift}` }}
              index={itemIndex}
              url={item.fields.image.fields.file.url}
              width={item.fields.image.fields.file.details.image.width}
              slug={slug}
              addToCache={addToCache}
              isInCache={isProjectInCache}
            />
          );
        })}
      </div>
    );
  } else {
    return null;
  }
};

export default Project;
