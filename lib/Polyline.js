"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var React = _interopRequire(require("react"));

var Leaflet = _interopRequire(require("leaflet"));

var latlngListType = _interopRequire(require("./types/latlngList"));

var popupContainerMixin = _interopRequire(require("./mixins/popupContainer"));

module.exports = React.createClass({
  displayName: "Polyline",

  mixins: [popupContainerMixin],

  propTypes: {
    positions: latlngListType.isRequired
  },

  componentWillMount: function componentWillMount() {
    var _props = this.props;
    var map = _props.map;
    var positions = _props.positions;

    var props = _objectWithoutProperties(_props, ["map", "positions"]);

    this._leafletElement = Leaflet.polyline(positions, props);
  },

  componentDidUpdate: function componentDidUpdate(prevProps) {
    if (this.props.positions !== prevProps.positions) {
      this.getLeafletElement().setLatLngs(this.props.positions);
    }
  }
});