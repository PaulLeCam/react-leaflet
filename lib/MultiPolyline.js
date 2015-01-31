"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var React = _interopRequire(require("react"));

var Leaflet = _interopRequire(require("leaflet"));

var latlngListType = _interopRequire(require("./types/latlngList"));

var popupContainerMixin = _interopRequire(require("./mixins/popupContainer"));

module.exports = React.createClass({
  displayName: "MultiPolyline",

  mixins: [popupContainerMixin],

  propTypes: {
    polylines: React.PropTypes.arrayOf(latlngListType).isRequired
  },

  componentWillMount: function componentWillMount() {
    var _props = this.props;
    var map = _props.map;
    var polylines = _props.polylines;

    var props = _objectWithoutProperties(_props, ["map", "polylines"]);

    this._leafletElement = Leaflet.multiPolyline(polylines, props);
  },

  componentDidUpdate: function componentDidUpdate(prevProps) {
    if (this.props.polylines !== prevProps.polylines) {
      this.getLeafletElement().setLatLngs(this.props.polylines);
    }
  }
});