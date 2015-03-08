"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Leaflet = _interopRequire(require("leaflet"));

var boundsType = _interopRequire(require("./types/bounds"));

var PopupContainer = _interopRequire(require("./PopupContainer"));

var Rectangle = (function (_PopupContainer) {
  function Rectangle() {
    _classCallCheck(this, Rectangle);

    if (_PopupContainer != null) {
      _PopupContainer.apply(this, arguments);
    }
  }

  _inherits(Rectangle, _PopupContainer);

  _createClass(Rectangle, {
    componentWillMount: {
      value: function componentWillMount() {
        _get(Object.getPrototypeOf(Rectangle.prototype), "componentWillMount", this).call(this);
        var _props = this.props;
        var bounds = _props.bounds;
        var map = _props.map;

        var props = _objectWithoutProperties(_props, ["bounds", "map"]);

        this.leafletElement = Leaflet.rectangle(bounds, props);
      }
    },
    componentDidUpdate: {
      value: function componentDidUpdate(prevProps) {
        if (this.props.bounds !== prevProps.bounds) {
          this.leafletElement.setBounds(this.props.bounds);
        }
      }
    }
  });

  return Rectangle;
})(PopupContainer);

module.exports = Rectangle;

Rectangle.propTypes = {
  bounds: boundsType.isRequired
};