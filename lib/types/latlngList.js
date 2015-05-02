"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _React = require("react");

var _React2 = _interopRequireDefault(_React);

var _latlng = require("./latlng");

var _latlng2 = _interopRequireDefault(_latlng);

exports["default"] = _React2["default"].PropTypes.arrayOf(_latlng2["default"]);
module.exports = exports["default"];