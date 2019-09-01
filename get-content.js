require("dotenv").config();
var contentful = require("contentful");
var fs = require("fs");
const space = process.env.SPACE_ID;
const accessToken = process.env.ACCESS_TOKEN;
var client = contentful.createClient({
  space: space,
  accessToken: accessToken
});

Promise.all([
  client.getEntries({ content_type: "projects" }),
  client.getEntries({ content_type: "about" })
])
  .then(([projects, about]) => {
    fs.writeFileSync(
      "./content.json",
      JSON.stringify({ projects: projects.items[0], about: about.items[0] })
    );
    console.log("done!");
  })
  .catch(err => console.log(err));
