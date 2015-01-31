"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var React = _interopRequire(require("react"));

var Leaflet = _interopRequire(require("leaflet"));

var latlngType = _interopRequire(require("./types/latlng"));

var popupContainerMixin = _interopRequire(require("./mixins/popupContainer"));

module.exports = React.createClass({
  displayName: "CircleMarker",

  mixins: [popupContainerMixin],

  propTypes: {
    center: latlngType.isRequired,
    radius: React.PropTypes.number
  },

  componentWillMount: function componentWillMount() {
    var _props = this.props;
    var center = _props.center;
    var map = _props.map;

    var props = _objectWithoutProperties(_props, ["center", "map"]);

    this._leafletElement = Leaflet.circleMarker(center, props);
  },

  componentDidUpdate: function componentDidUpdate(prevProps) {
    if (this.props.center !== prevProps.center) {
      this.getLeafletElement().setLatLng(this.props.center);
    }
    if (this.props.radius !== prevProps.radius) {
      this.getLeafletElement().setRadius(this.props.radius);
    }
  }
});