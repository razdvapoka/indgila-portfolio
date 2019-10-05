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
        <a href="">email</a>
        <br />
        <a href="">call</a>
        <br />
        <a href="">facebook</a>
        <br />
        <a href="">instagram</a>
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
