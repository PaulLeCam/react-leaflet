"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var isArray = _interopRequire(require("lodash/lang/isArray"));

var uniqueId = _interopRequire(require("lodash/utility/uniqueId"));

var React = _interopRequire(require("react"));

var Leaflet = _interopRequire(require("leaflet"));

var boundsType = _interopRequire(require("./types/bounds"));

var latlngType = _interopRequire(require("./types/latlng"));

var MapComponent = _interopRequire(require("./MapComponent"));

var normalizeCenter = function (pos) {
  return isArray(pos) ? pos : [pos.lat, pos.lng || pos.lon];
};

var Map = (function (_MapComponent) {
  function Map(props) {
    _classCallCheck(this, Map);

    _get(Object.getPrototypeOf(Map.prototype), "constructor", this).call(this, props);
    this.state = {
      id: props.id || uniqueId("map")
    };
  }

  _inherits(Map, _MapComponent);

  _createClass(Map, {
    componentDidMount: {
      value: function componentDidMount() {
        this.leafletElement = Leaflet.map(this.state.id, this.props);
        _get(Object.getPrototypeOf(Map.prototype), "componentDidMount", this).call(this);
        this.setState({ map: this.leafletElement });
      }
    },
    shouldUpdateCenter: {
      value: function shouldUpdateCenter(next, prev) {
        if (!prev) {
          return true;
        }next = normalizeCenter(next);
        prev = normalizeCenter(prev);
        return next[0] !== prev[0] || next[1] !== prev[1];
      }
    },
    componentDidUpdate: {
      value: function componentDidUpdate(prevProps) {
        var _props = this.props;
        var center = _props.center;
        var zoom = _props.zoom;

        if (center && this.shouldUpdateCenter(center, prevProps.center)) {
          this.leafletElement.setView(center, zoom, { animate: false });
        } else if (zoom && zoom !== prevProps.zoom) {
          this.leafletElement.setZoom(zoom);
        }
      }
    },
    componentWillUnmount: {
      value: function componentWillUnmount() {
        _get(Object.getPrototypeOf(Map.prototype), "componentWillUnmount", this).call(this);
        this.leafletElement.remove();
      }
    },
    render: {
      value: function render() {
        var map = this.leafletElement;
        var children = map ? React.Children.map(this.props.children, function (child) {
          return child ? React.cloneElement(child, { map: map }) : null;
        }) : null;

        return React.createElement(
          "div",
          { className: this.props.className, id: this.state.id },
          children
        );
      }
    }
  });

  return Map;
})(MapComponent);

module.exports = Map;

Map.propTypes = {
  center: latlngType,
  id: React.PropTypes.string,
  maxBounds: boundsType,
  maxZoom: React.PropTypes.number,
  minZoom: React.PropTypes.number,
  zoom: React.PropTypes.number
};