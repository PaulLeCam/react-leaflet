"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var React = _interopRequire(require("react"));

var Leaflet = _interopRequire(require("leaflet"));

var popupContainerMixin = _interopRequire(require("./mixins/popupContainer"));

module.exports = React.createClass({
  displayName: "FeatureGroup",

  mixins: [popupContainerMixin],

  propTypes: {
    layers: React.PropTypes.array.isRequired
  },

  componentWillMount: function componentWillMount() {
    var _props = this.props;
    var layers = _props.layers;
    var map = _props.map;

    var props = _objectWithoutProperties(_props, ["layers", "map"]);

    this._leafletElement = Leaflet.featureGroup(layers);
  }
});