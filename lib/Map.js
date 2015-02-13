var isArray = require("lodash-node/modern/objects/isArray");

var React = require("react/addons");
var Leaflet = require("leaflet");

var boundsType = require("./types/bounds");
var latlngType = require("./types/latlng");

var elementMixin = require("./mixins/element");
var currentId = 0;

var normalizeCenter = function(pos) {
  return isArray(pos) ? pos : [pos.lat, pos.lng || pos.lon];
};

var Map = React.createClass({
  displayName: "Map",

  mixins: [elementMixin],

  statics: {
    uid:function() {
      return "map" + ++currentId;
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

  getInitialState:function() {
    return {
      id: this.props.id || Map.uid()
    };
  },

  componentDidMount:function() {
    this._leafletElement = Leaflet.map(this.state.id, this.props);
    this.bindEvents(this._leafletEvents);
    this.setState({map: this._leafletElement});
  },

  shouldUpdateCenter:function(next, prev) {
    if (!prev) return true;
    next = normalizeCenter(next);
    prev = normalizeCenter(prev);
    return next[0] !== prev[0] || next[1] !== prev[1];
  },

  componentDidUpdate:function(prevProps) {
    var $__0=   this.props,center=$__0.center,zoom=$__0.zoom;
    if (center && this.shouldUpdateCenter(center, prevProps.center)) {
      this.getLeafletElement().setView(center, zoom, {animate: false});
    }
    else if (zoom && zoom !== prevProps.zoom) {
      this.getLeafletElement().setZoom(zoom);
    }
  },

  componentWillUnmount:function() {
    this.getLeafletElement().remove();
  },

  getEventHandlers:function() {
    var handlers = {};

    for (var propKey in this.props) {
      if (!this.props.hasOwnProperty(propKey)) continue;

      if (propKey.match(/^on/)) {
        handlers[propKey] = this.props[propKey];
      }
    }

    return handlers;
  },

  render:function() {
    var map = this.getLeafletElement();
    var handlers = this.getEventHandlers();

    var children = map ? React.Children.map(this.props.children, function(child)  {
      return child ? React.addons.cloneWithProps(child, {map:map}) : null;
    }) : null;

    return React.createElement("div", React.__spread({className: this.props.className, id: this.state.id},  handlers), children);
  }
});

module.exports = Map;
