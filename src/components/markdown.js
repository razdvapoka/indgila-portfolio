import preact from "preact";
import Markup from "preact-markup";
import marked from "marked";

const renderer = new marked.Renderer();
renderer.link = function(href, title, text) {
  const link = marked.Renderer.prototype.link.apply(this, arguments);
  return link.replace("<a", "<a target='_blank'");
};

const Markdown = ({ markdown, markupOpts = {}, markdownOpts = {}, ...rest }) => (
  <Markup
    markup={marked(markdown, { breaks: true, renderer, ...markdownOpts })}
    trim={false}
    type="html"
    {...rest}
  />
);

export default Markdown;
