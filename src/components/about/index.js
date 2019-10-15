import { EMAIL, FB, IG, PHONE } from "../../consts";
import { Regular, Small } from "../text";
import Layout from "../../components/layout";
import Markdown from "../markdown";
import content from "../../../content.json";
import styles from "./styles.styl";

const About = () => (
  <Layout blogUrl={content.about.fields.blogUrl}>
    <div className={styles.about}>
      <Regular
        className={styles.aboutDescription}
        as={Markdown}
        markdown={content.about.fields.description}
      />
      <Regular className={styles.aboutContacts}>
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
      </Regular>
      <div className={styles.aboutLists}>
        <div className={styles.aboutListsCol}>
          <Small
            className={styles.aboutList}
            as={Markdown}
            markdown={content.about.fields.experience}
          />
          <Small
            className={styles.aboutList}
            as={Markdown}
            markdown={content.about.fields.lectures}
          />
        </div>
        <div className={styles.aboutListsCol}>
          <Small
            className={styles.aboutList}
            as={Markdown}
            markdown={content.about.fields.exhibitions}
          />
          <Small
            className={styles.aboutList}
            as={Markdown}
            markdown={content.about.fields.publications}
          />
        </div>
      </div>
    </div>
  </Layout>
);

export default About;
