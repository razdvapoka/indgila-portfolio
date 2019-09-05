import { Small } from "../text";
import Image from "../image";
import Markdown from "../markdown";
import styles from "./styles.styl";

const Project = ({ goHome, project, isProjectOpen, imageCache, addToCache }) => {
  const { images, slug, description } = project.fields;
  return (
    <div className={styles.projectBox} onClick={goHome}>
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
