import styles from "./styles.styl";
import { Regular, Small } from "../../components/text";
import { Link } from "preact-router";
import PersianName from "../../components/persian-name";

const Layout = ({ children, isMain, hasCopy, blogUrl, isProjectOpen, ...rest }) => (
  <div
    className={`
      ${styles.layout}
      ${isMain ? (isProjectOpen ? styles.layoutProjectOpen : "") : styles.layoutAbout}
    `}
    {...rest}
  >
    <div className={styles.top}>
      <Regular as={Link} href={isMain ? "/about" : "/"} className={styles.home}>
        indgila
        <br />
        инджила
        <br />
        <div className={styles.persian}>
          <PersianName />
        </div>
      </Regular>
      {blogUrl && (
        <Regular
          as="a"
          href={blogUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.blog}
        >
          blog
        </Regular>
      )}
    </div>
    {children}
    <Small className={isProjectOpen ? styles.copyrightUnderProject : styles.copyright}>
      © 2019 indgila
    </Small>
  </div>
);

export default Layout;
