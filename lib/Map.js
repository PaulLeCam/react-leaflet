"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var isArray = _interopRequire(require("lodash/lang/isArray"));

var uniqueId = _interopRequire(require("lodash/utility/uniqueId"));

var React = _interopRequire(require("react/addons"));

var Leaflet = _interopRequire(require("leaflet"));

var boundsType = _interopRequire(require("./types/bounds"));

var latlngType = _interopRequire(require("./types/latlng"));

var elementMixin = _interopRequire(require("./mixins/element"));

var normalizeCenter = function (pos) {
  return isArray(pos) ? pos : [pos.lat, pos.lng || pos.lon];
};

var Map = React.createClass({
  displayName: "Map",

  mixins: [elementMixin],

  statics: {
    uid: function uid() {
      return uniqueId("map");
    }
  },

  propTypes: {
    center: latlngType,
    id: React.PropTypes.string,
    maxBounds: boundsType,
    maxZoom: React.PropTypes.number,
    minZoom: React.PropTypes.number,
    zoom: React.PropTypes.number
  },

  getInitialState: function getInitialState() {
    return {
      id: this.props.id || Map.uid()
    };
  },

  componentDidMount: function componentDidMount() {
    this._leafletElement = Leaflet.map(this.state.id, this.props);
    this.bindEvents(this._leafletEvents);
    this.setState({ map: this._leafletElement });
  },

  shouldUpdateCenter: function shouldUpdateCenter(next, prev) {
    if (!prev) {
      return true;
    }next = normalizeCenter(next);
    prev = normalizeCenter(prev);
    return next[0] !== prev[0] || next[1] !== prev[1];
  },

  componentDidUpdate: function componentDidUpdate(prevProps) {
    var _props = this.props;
    var center = _props.center;
    var zoom = _props.zoom;

    if (center && this.shouldUpdateCenter(center, prevProps.center)) {
      this.getLeafletElement().setView(center, zoom, { animate: false });
    } else if (zoom && zoom !== prevProps.zoom) {
      this.getLeafletElement().setZoom(zoom);
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    this.getLeafletElement().remove();
  },

  render: function render() {
    var map = this.getLeafletElement();
    var children = map ? React.Children.map(this.props.children, function (child) {
      return child ? React.addons.cloneWithProps(child, { map: map }) : null;
    }) : null;

    return React.createElement(
      "div",
      { className: this.props.className, id: this.state.id },
      children
    );
  }
});

module.exports = Map;