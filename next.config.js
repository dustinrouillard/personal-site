const { withPlausibleProxy } = require("next-plausible");

module.exports = withPlausibleProxy({
  scriptName: "app",
  customDomain: "https://trck.dstn.to",
})({});
