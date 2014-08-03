var coffee = require("coffee-script");

module.exports = {
  process: function(src, path) {
    if (coffee.helpers.isCoffee(path)) {
      return coffee.compile(src, {"bare": true});
    }
    return src;
  }
};
