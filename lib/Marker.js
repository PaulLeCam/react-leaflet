"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var React = _interopRequire(require("react"));

var Leaflet = _interopRequire(require("leaflet"));

var latlngType = _interopRequire(require("./types/latlng"));

var popupContainerMixin = _interopRequire(require("./mixins/popupContainer"));

module.exports = React.createClass({
  displayName: "Marker",

  mixins: [popupContainerMixin],

  propTypes: {
    position: latlngType.isRequired
  },

  componentWillMount: function componentWillMount() {
    var _props = this.props;
    var map = _props.map;
    var position = _props.position;

    var props = _objectWithoutProperties(_props, ["map", "position"]);

    this._leafletElement = Leaflet.marker(position, props);
  },

  componentDidUpdate: function componentDidUpdate(prevProps) {
    if (this.props.position !== prevProps.position) {
      this.getLeafletElement().setLatLng(this.props.position);
    }
  }
});