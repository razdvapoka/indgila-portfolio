import { Huge } from "../text";
import styles from "./styles.styl";
import { Link } from "preact-router";

const ProjectList = ({ projects, selectProject, isProjectOpen, activeProjectSlug }) => (
  <Huge
    id="projectList"
    className={isProjectOpen ? styles.projectListFixed : styles.projectList}
    as="ul"
  >
    {projects.map(project => {
      const { title, slug } = project.fields;
      const isActive = slug === activeProjectSlug;
      const projectClassName = isActive
        ? isProjectOpen
          ? styles.project
          : styles.projectGrey
        : isProjectOpen
        ? styles.projectGrey
        : styles.project;
      return (
        <li className={projectClassName}>
          {title}
          <Link
            onMouseEnter={() => selectProject(slug)}
            onMouseLeave={() => selectProject(null)}
            href={`/project/${slug}`}
          />
        </li>
      );
    })}
  </Huge>
);

export default ProjectList;
