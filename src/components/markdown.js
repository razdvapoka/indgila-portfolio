import preact from "preact";
import Markup from "preact-markup";
import marked from "marked";

const Markdown = ({ markdown, markupOpts = {}, markdownOpts = {}, ...rest }) => (
  <Markup
    markup={marked(markdown, { breaks: true, ...markdownOpts })}
    trim={false}
    type="html"
    {...rest}
  />
);

export default Markdown;
