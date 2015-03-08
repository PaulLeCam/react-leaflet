"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var React = _interopRequire(require("react"));

var MapLayer = _interopRequire(require("./MapLayer"));

var PopupContainer = (function (_MapLayer) {
  function PopupContainer() {
    _classCallCheck(this, PopupContainer);

    if (_MapLayer != null) {
      _MapLayer.apply(this, arguments);
    }
  }

  _inherits(PopupContainer, _MapLayer);

  _createClass(PopupContainer, {
    render: {
      value: function render() {
        var children = this.getClonedChildrenWithMap({
          popupContainer: this.leafletElement
        });
        return React.createElement(
          "noscript",
          null,
          children
        );
      }
    }
  });

  return PopupContainer;
})(MapLayer);

module.exports = PopupContainer;