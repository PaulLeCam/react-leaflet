"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var React = _interopRequire(require("react"));

var Leaflet = _interopRequire(require("leaflet"));

var latlngType = _interopRequire(require("./types/latlng"));

var MapComponent = _interopRequire(require("./MapComponent"));

var Popup = (function (_MapComponent) {
  function Popup() {
    _classCallCheck(this, Popup);

    if (_MapComponent != null) {
      _MapComponent.apply(this, arguments);
    }
  }

  _inherits(Popup, _MapComponent);

  _createClass(Popup, {
    componentWillMount: {
      value: function componentWillMount() {
        _get(Object.getPrototypeOf(Popup.prototype), "componentWillMount", this).call(this);
        var _props = this.props;
        var children = _props.children;
        var map = _props.map;

        var props = _objectWithoutProperties(_props, ["children", "map"]);

        this.leafletElement = Leaflet.popup(props);
      }
    },
    componentDidUpdate: {
      value: function componentDidUpdate(prevProps) {
        var _props = this.props;
        var children = _props.children;
        var map = _props.map;
        var popupContainer = _props.popupContainer;
        var position = _props.position;

        var props = _objectWithoutProperties(_props, ["children", "map", "popupContainer", "position"]);

        if (children !== prevProps.children) {
          var content = React.renderToStaticMarkup(children);
          if (popupContainer) {
            popupContainer.bindPopup(content, props);
          } else {
            var el = this.leafletElement;
            el.setContent(content);
            if (position !== prevProps.position) el.setLatLng(position);
          }
        }
      }
    },
    componentWillUnmount: {
      value: function componentWillUnmount() {
        _get(Object.getPrototypeOf(Popup.prototype), "componentWillUnmount", this).call(this);
        this.props.map.removeLayer(this.leafletElement);
      }
    },
    render: {
      value: function render() {
        var _props = this.props;
        var children = _props.children;
        var map = _props.map;
        var popupContainer = _props.popupContainer;
        var position = _props.position;

        var props = _objectWithoutProperties(_props, ["children", "map", "popupContainer", "position"]);

        if (children) {
          var content = React.renderToStaticMarkup(children);
          // Attach to container component
          if (popupContainer) {
            popupContainer.bindPopup(content, props);
            return null;
          }
          // Attach to a Map
          var el = this.leafletElement;
          el.setContent(content);
          if (position) el.setLatLng(position);
          el.openOn(map);
        }
        return null;
      }
    }
  });

  return Popup;
})(MapComponent);

module.exports = Popup;

Popup.propTypes = {
  position: latlngType
};