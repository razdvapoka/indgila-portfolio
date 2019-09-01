import styles from "./styles.styl";
import { Regular, Small } from "../../components/text";

const Layout = ({ children, hasCopy, blogUrl }) => (
  <div className={styles.layout}>
    <div className={styles.top}>
      <Regular as="a" to="#" className={styles.home}>
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
    <Small className={styles.copyright}>© 2019 indgila</Small>
  </div>
);

export default Layout;
