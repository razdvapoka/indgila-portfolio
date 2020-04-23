import styles from "./styles.styl";
import { Regular, Small } from "../../components/text";
import { Link } from "preact-router";
import PersianName from "../../components/persian-name";
import { FB, IG, PHONE, EMAIL } from "../../consts";

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
    {!isMain && (
      <Small className={styles.contacts}>
        <span>{EMAIL}</span>
        <br />
        <span>{PHONE}</span>
        <br />
        <a href={FB} target="_blank" rel="noopener noreferrer">
          facebook
        </a>
        <br />
        <a href={IG} target="_blank" rel="noopener noreferrer">
          instagram
        </a>
        <br />
      </Small>
    )}
    <Small className={styles.copyright}>{`© ${new Date().getFullYear()} indgila`}</Small>
  </div>
);

export default Layout;
