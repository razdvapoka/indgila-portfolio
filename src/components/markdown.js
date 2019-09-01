var preact = require("preact");
var Markup = require("preact-markup");
var marked = require("marked");

const Markdown = ({ markdown, markupOpts = {}, markdownOpts = {}, ...rest }) => (
  <Markup
    markup={marked(markdown, { breaks: true, ...markdownOpts })}
    trim={false}
    type="html"
    {...rest}
  />
);

export default Markdown;
