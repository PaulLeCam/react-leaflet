"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var React = _interopRequire(require("react"));

var Leaflet = _interopRequire(require("leaflet"));

var boundsType = _interopRequire(require("./types/bounds"));

var popupContainerMixin = _interopRequire(require("./mixins/popupContainer"));

module.exports = React.createClass({
  displayName: "Rectangle",

  mixins: [popupContainerMixin],

  propTypes: {
    bounds: boundsType.isRequired
  },

  componentWillMount: function componentWillMount() {
    var _props = this.props;
    var bounds = _props.bounds;
    var map = _props.map;

    var props = _objectWithoutProperties(_props, ["bounds", "map"]);

    this._leafletElement = Leaflet.rectangle(bounds, props);
  },

  componentDidUpdate: function componentDidUpdate(prevProps) {
    if (this.props.bounds !== prevProps.bounds) {
      this.getLeafletElement().setBounds(this.props.bounds);
    }
  }
});