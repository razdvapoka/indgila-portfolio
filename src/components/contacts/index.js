import { EMAIL, IG } from "../../consts";
import styles from "./styles.styl";
import content from "../../../content.json";

const Contacts = () => {
  return (
    <div className={styles.contacts}>
      <span>{EMAIL}</span>
      <br />
      <a href={IG} target="_blank" rel="noopener noreferrer">
        instagram
      </a>
      <br />
      <a href={content.about.fields.blogUrl} target="_blank" rel="noopener noreferrer">
        tumblr blog
      </a>
      <br />
    </div>
  );
};

export default Contacts;
