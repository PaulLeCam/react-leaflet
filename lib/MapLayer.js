"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var assign = _interopRequire(require("lodash/object/assign"));

var React = _interopRequire(require("react"));

var MapComponent = _interopRequire(require("./MapComponent"));

var MapLayer = (function (_MapComponent) {
  function MapLayer() {
    _classCallCheck(this, MapLayer);

    if (_MapComponent != null) {
      _MapComponent.apply(this, arguments);
    }
  }

  _inherits(MapLayer, _MapComponent);

  _createClass(MapLayer, {
    componentDidMount: {
      value: function componentDidMount() {
        _get(Object.getPrototypeOf(MapLayer.prototype), "componentDidMount", this).call(this);
        this.props.map.addLayer(this.leafletElement);
      }
    },
    componentWillUnmount: {
      value: function componentWillUnmount() {
        _get(Object.getPrototypeOf(MapLayer.prototype), "componentWillUnmount", this).call(this);
        this.props.map.removeLayer(this.leafletElement);
      }
    },
    getClonedChildrenWithMap: {
      value: function getClonedChildrenWithMap(extra) {
        var _props = this.props;
        var children = _props.children;
        var map = _props.map;

        var props = assign({ map: map }, extra);

        return React.Children.map(children, function (child) {
          return child ? React.cloneElement(child, props) : null;
        });
      }
    }
  });

  return MapLayer;
})(MapComponent);

module.exports = MapLayer;