"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var mapLayerMixin = _interopRequire(require("./mapLayer"));

module.exports = {
  mixins: [mapLayerMixin],

  render: function render() {
    var children = this.getClonedChildrenWithMap({
      popupContainer: this.getLeafletElement()
    });
    return React.createElement(
      "noscript",
      null,
      children
    );
  }
};