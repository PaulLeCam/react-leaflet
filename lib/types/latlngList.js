"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var latlng = _interopRequire(require("./latlng"));

module.exports = React.PropTypes.arrayOf(latlng);