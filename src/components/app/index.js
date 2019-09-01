import { Component } from "preact";
import content from "../../../content.json";
import { Small, Huge, Regular } from "../../components/text";
import Markdown from "../../components/markdown";
import styles from "./styles.styl";
import Layout from "../../components/layout";
import { Router, Link } from "preact-router";

const Main = ({ projectId }) => {
  return (
    <Layout isMain>
      <div className={styles.main}>
        <Huge className={styles.projects} as="ul">
          {content.projects.items.map(item => (
            <li>
              <Link href={"/project/hey"}>{item.fields.title}</Link>
            </li>
          ))}
        </Huge>
      </div>
    </Layout>
  );
};

const About = props => {
  return (
    <Layout blogUrl={"#"}>
      <div className={styles.about}>
        <Regular
          className={styles.aboutDescription}
          as={Markdown}
          markdown={content.about.fields.description}
        />
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
};

export default class App extends Component {
  render() {
    console.log(content);
    return (
      <Router>
        <Main path="/" />
        <Main path="/project/:projectId" />
        <About path="/about" />
      </Router>
    );
  }
}
