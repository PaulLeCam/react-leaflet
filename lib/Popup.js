"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var React = _interopRequire(require("react"));

var Leaflet = _interopRequire(require("leaflet"));

var latlngType = _interopRequire(require("./types/latlng"));

var elementMixin = _interopRequire(require("./mixins/element"));

module.exports = React.createClass({
  displayName: "Popup",

  mixins: [elementMixin],

  propTypes: {
    map: React.PropTypes.object.isRequired,
    position: latlngType
  },

  componentWillMount: function componentWillMount() {
    var _props = this.props;
    var children = _props.children;
    var map = _props.map;

    var props = _objectWithoutProperties(_props, ["children", "map"]);

    this._leafletElement = Leaflet.popup(props);
  },

  componentDidUpdate: function componentDidUpdate(prevProps) {
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
        var el = this.getLeafletElement();
        el.setContent(content);
        if (position !== prevProps.position) el.setLatLng(position);
      }
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    this.props.map.removeLayer(this.getLeafletElement());
  },

  render: function render() {
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
      var el = this.getLeafletElement();
      el.setContent(content);
      if (position) el.setLatLng(position);
      el.openOn(map);
    }
    return null;
  }
});