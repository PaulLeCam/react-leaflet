var Map, Type, currentId, div, eventsMixins, latlngListType, latlngType, leaflet, react;

react = require("react/addons");

leaflet = require("leaflet");

Type = react.PropTypes;

latlngType = require("./types/latlng");

latlngListType = require("./types/latlngList");

eventsMixins = require("./mixins/events");

div = react.DOM.div;

currentId = 0;

Map = react.createClass({
  displayName: "Map",
  mixins: [eventsMixins("map")],
  statics: {
    uid: function() {
      return "map" + (++currentId);
    }
  },
  propTypes: {
    center: latlngType,
    zoom: Type.number,
    minZoom: Type.number,
    maxZoom: Type.number,
    maxBounds: latlngListType
  },
  getInitialState: function() {
    return {
      id: Map.uid()
    };
  },
  componentDidMount: function() {
    var map;
    map = leaflet.map(this.state.id, this.props);
    this.bindEvents(this.state._events);
    return this.setState({
      map: map
    });
  },
  render: function() {
    var children;
    if (this.state.map != null) {
      children = react.Children.map(this.props.children, (function(_this) {
        return function(child) {
          return react.addons.cloneWithProps(child, {
            map: _this.state.map
          });
        };
      })(this));
    }
    return div({
      id: this.state.id
    }, children);
  }
});

module.exports = Map;
