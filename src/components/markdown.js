import Markup from "preact-markup";
import marked from "marked";
import { Link } from "preact-router";

const CustomLink = ({ href, title }) => {
  return <Link href={href}>{title}</Link>;
};

const renderer = new marked.Renderer();
renderer.link = function(href) {
  const link = marked.Renderer.prototype.link.apply(this, arguments);
  if (href === "/projects") {
    return link
      .replace("<a", "<link ")
      .replace("a>", "link>")
      .replace(/\>.+\</, "");
  } else {
    return link.replace("<a", "<a target='_blank'");
  }
};

const Markdown = ({ markdown, markupOpts = {}, markdownOpts = {}, ...rest }) => {
  const parser = typeof document === "undefined" && require("dom-parser");
  return (
    <Markup
      parser={parser}
      markup={marked(markdown, { breaks: true, renderer, ...markdownOpts })}
      trim={false}
      type="html"
      components={{ Link: CustomLink }}
      {...rest}
    />
  );
};

export default Markdown;
