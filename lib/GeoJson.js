"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var React = _interopRequire(require("react"));

var Leaflet = _interopRequire(require("leaflet"));

var popupContainerMixin = _interopRequire(require("./mixins/popupContainer"));

module.exports = React.createClass({
  displayName: "GeoJson",

  mixins: [popupContainerMixin],

  propTypes: {
    data: React.PropTypes.object.isRequired
  },

  getInitialState: function getInitialState() {
    return { geoJson: Leaflet.geoJson(this.props.data, this.props) };
  },

  componentWillMount: function componentWillMount() {
    var _props = this.props;
    var data = _props.data;
    var map = _props.map;

    var props = _objectWithoutProperties(_props, ["data", "map"]);

    this._leafletElement = Leaflet.geoJson(data, props);
  }
});