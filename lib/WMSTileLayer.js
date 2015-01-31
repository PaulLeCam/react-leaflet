"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var React = _interopRequire(require("react"));

var Leaflet = _interopRequire(require("leaflet"));

var tileLayerMixin = _interopRequire(require("./mixins/tileLayer"));

module.exports = React.createClass({
  displayName: "WMSTileLayer",

  mixins: [tileLayerMixin],

  propTypes: {
    url: React.PropTypes.string.isRequired
  },

  componentWillMount: function componentWillMount() {
    var _props = this.props;
    var map = _props.map;
    var url = _props.url;

    var props = _objectWithoutProperties(_props, ["map", "url"]);

    this._leafletElement = Leaflet.tileLayer.wms(url, props);
  }
});