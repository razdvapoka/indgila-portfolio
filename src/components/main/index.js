import { Regular, Small } from "../text";
import Layout from "../../components/layout";
import Contacts from "../contacts";
import Markdown from "../markdown";
import content from "../../../content.json";
import styles from "./styles.styl";

const Main = () => {
  const { mainText, currentCollaborations, latestCollaborations, roll } = content.about.fields;
  return (
    <Layout isMain>
      <div className={styles.main}>
        <Regular className={styles.mainDescription} as={Markdown} markdown={mainText} />
        <Contacts />
      </div>
    </Layout>
  );
};

export default Main;
