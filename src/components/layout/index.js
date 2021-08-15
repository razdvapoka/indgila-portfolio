import styles from "./styles.styl";
import { Regular, Small } from "../../components/text";
import { Link } from "preact-router";
import PersianName from "../../components/persian-name";
import Contacts from "../contacts";

const Layout = ({ children, isAbout, hasCopy, isProjectOpen, ...rest }) => (
  <div
    className={`
      ${styles.layout}
      ${isAbout ? styles.layoutAbout : isProjectOpen ? styles.layoutProjectOpen : ""}
    `}
    {...rest}
  >
    <div className={styles.top}>
      <Regular as={Link} href={isAbout ? "/projects" : "/"} className={styles.home}>
        indgila
        <br />
        инджила
        <br />
        <div className={styles.persian}>
          <PersianName />
        </div>
      </Regular>
    </div>
    {children}
    {isAbout && <Contacts />}
    <Small className={styles.copyright}>{`© ${new Date().getFullYear()} indgila`}</Small>
  </div>
);

export default Layout;
