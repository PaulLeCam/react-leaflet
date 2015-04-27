"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _React = require("react");

var _React2 = _interopRequireDefault(_React);

var _MapLayer2 = require("./MapLayer");

var _MapLayer3 = _interopRequireDefault(_MapLayer2);

var PopupContainer = (function (_MapLayer) {
  function PopupContainer() {
    _classCallCheck(this, PopupContainer);

    if (_MapLayer != null) {
      _MapLayer.apply(this, arguments);
    }
  }

  _inherits(PopupContainer, _MapLayer);

  _createClass(PopupContainer, [{
    key: "render",
    value: function render() {
      var children = this.getClonedChildrenWithMap({
        popupContainer: this.leafletElement
      });
      return _React2["default"].createElement(
        "noscript",
        null,
        children
      );
    }
  }]);

  return PopupContainer;
})(_MapLayer3["default"]);

exports["default"] = PopupContainer;
module.exports = exports["default"];