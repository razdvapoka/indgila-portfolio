require("dotenv").config();
var contentful = require("contentful");
var fs = require("fs");
const space = process.env.SPACE_ID;
const accessToken = process.env.ACCESS_TOKEN;
var client = contentful.createClient({
  space: space,
  accessToken: accessToken
});
client.getEntries().then(function(entries) {
  fs.writeFileSync("./content.json", JSON.stringify(entries));
  console.log("done!");
});
