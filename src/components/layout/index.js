import styles from "./styles.styl";
import { Regular, Small } from "../text";
import PersianName from "../persian-name";
import { Link } from "preact-router";

const year = new Date().getFullYear();

const HomeLink = () => (
  <Regular as={Link} href="/" className={styles.home}>
    indgila
    <br />
    инджила
    <br />
    <div className={styles.persian}>
      <PersianName />
    </div>
  </Regular>
);

const Layout = ({ children, isMain, isProjectOpen, ...rest }) => (
  <div
    className={`
      ${styles.layout}
      ${isMain ? styles.layoutMain : isProjectOpen ? styles.layoutProjectOpen : ""}
    `}
    {...rest}
  >
    {!isMain && (
      <div className={styles.top}>
        <HomeLink />
      </div>
    )}
    {children}
    <Small className={styles.copyright}>© {year} indgila</Small>
  </div>
);

export default Layout;
