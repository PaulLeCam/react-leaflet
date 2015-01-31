"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var React = _interopRequire(require("react"));

var Leaflet = _interopRequire(require("leaflet"));

var boundsType = _interopRequire(require("./types/bounds"));

var mapLayerMixin = _interopRequire(require("./mixins/mapLayer"));

module.exports = React.createClass({
  displayName: "ImageOverlay",

  mixins: [mapLayerMixin],

  propTypes: {
    url: React.PropTypes.string.isRequired,
    bounds: boundsType.isRequired,
    opacity: React.PropTypes.number,
    attribution: React.PropTypes.string
  },

  componentWillMount: function componentWillMount() {
    var _props = this.props;
    var bounds = _props.bounds;
    var map = _props.map;
    var url = _props.url;

    var props = _objectWithoutProperties(_props, ["bounds", "map", "url"]);

    this._leafletElement = Leaflet.imageOverlay(url, bounds, props);
  },

  componentDidUpdate: function componentDidUpdate(prevProps) {
    if (this.props.url !== prevProps.url) {
      this.getLeafletElement().setUrl(this.props.url);
    }
    if (this.props.opacity !== prevProps.opacity) {
      this.getLeafletElement().setOpacity(this.props.opacity);
    }
  },

  render: function render() {
    return null;
  }
});