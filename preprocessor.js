var ReactTools = require("react-tools");

module.exports = {
  process: function(src, filename) {
    return filename.indexOf("node_modules") === -1
      ? ReactTools.transform(src, {harmony: true})
      : src;
  }
};
