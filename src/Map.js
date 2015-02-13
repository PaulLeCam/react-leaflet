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
    uid() {
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

  getInitialState() {
    return {
      id: this.props.id || Map.uid()
    };
  },

  componentDidMount() {
    this._leafletElement = Leaflet.map(this.state.id, this.props);
    this.bindEvents(this._leafletEvents);
    this.setState({map: this._leafletElement});
  },

  shouldUpdateCenter(next, prev) {
    if (!prev) return true;
    next = normalizeCenter(next);
    prev = normalizeCenter(prev);
    return next[0] !== prev[0] || next[1] !== prev[1];
  },

  componentDidUpdate(prevProps) {
    var {center, zoom} = this.props;
    if (center && this.shouldUpdateCenter(center, prevProps.center)) {
      this.getLeafletElement().setView(center, zoom, {animate: false});
    }
    else if (zoom && zoom !== prevProps.zoom) {
      this.getLeafletElement().setZoom(zoom);
    }
  },

  componentWillUnmount() {
    this.getLeafletElement().remove();
  },

  getEventHandlers() {
    var handlers = {};

    for (var propKey in this.props) {
      if (!this.props.hasOwnProperty(propKey)) continue;

      if (propKey.match(/^on/)) {
        handlers[propKey] = this.props[propKey];
      }
    }

    return handlers;
  },

  render() {
    var map = this.getLeafletElement();
    var handlers = this.getEventHandlers();

    var children = map ? React.Children.map(this.props.children, child => {
      return child ? React.addons.cloneWithProps(child, {map}) : null;
    }) : null;

    return <div className={this.props.className} id={this.state.id} {...handlers}>{children}</div>;
  }
});

module.exports = Map;
