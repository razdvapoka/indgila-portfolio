import styles from "./styles.styl";
import { Regular, Small } from "../../components/text";
import { Link } from "preact-router";

const Layout = ({ children, isMain, hasCopy, blogUrl, isProjectOpen }) => (
  <div className={styles.layout}>
    <div className={styles.top}>
      <Regular as={Link} href={isMain ? "/about" : "/"} className={styles.home}>
        indgila
        <br />
        инджила
        <br />
        <span className={styles.persian}>آنجیلا</span>
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
