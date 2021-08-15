import { Regular, Small } from "../text";
import Layout from "../../components/layout";
import Contacts from "../contacts";
import Markdown from "../markdown";
import content from "../../../content.json";
import styles from "./styles.styl";

const About = () => {
  const { experience, lectures, exhibitions, publications } = content.about.fields;
  const columnItemsMarkdown = [experience, lectures, exhibitions, publications].join("\n\n");
  return (
    <Layout isAbout>
      <div className={styles.about}>
        <Regular
          className={styles.aboutDescription}
          as={Markdown}
          markdown={content.about.fields.description}
        />
        <Contacts isMobile />
        <Small as={Markdown} className={styles.aboutColumns} markdown={columnItemsMarkdown} />
      </div>
    </Layout>
  );
};

export default About;
