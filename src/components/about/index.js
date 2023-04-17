import { EMAIL, IG } from "../../consts";
import { Regular, Small } from "../text";
import Layout from "../../components/layout";
import Markdown from "../markdown";
import content from "../../../content.json";
import styles from "./styles.styl";

const About = () => {
  const { experience, lectures, exhibitions, publications } = content.about.fields;
  const columnItemsMarkdown = [experience, lectures, exhibitions, publications].join("\n\n");
  return (
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
          <a href={IG} target="_blank" rel="noopener noreferrer">
            instagram
          </a>
          <br />
        </Regular>
        <Small as={Markdown} className={styles.aboutColumns} markdown={columnItemsMarkdown} />
      </div>
    </Layout>
  );
};

export default About;
