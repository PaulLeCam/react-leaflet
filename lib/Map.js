var Map, Type, div, latlngBoundsType, latlngType, leaflet, react, uniqueId;

react = require("react");

leaflet = require("leaflet");

uniqueId = require("lodash-node/modern/utilities/uniqueId");

Type = react.PropTypes;

latlngType = require("./types/latlng");

latlngBoundsType = require("./types/latlngBounds");

div = react.DOM.div;

Map = react.createClass({
  displayName: "Map",
  statics: {
    uid: function() {
      return uniqueId("map");
    }
  },
  propTypes: {
    center: latlngType,
    zoom: Type.number,
    minZoom: Type.number,
    maxZoom: Type.number,
    maxBounds: latlngBoundsType
  },
  getInitialState: function() {
    return {
      id: Map.uid()
    };
  },
  componentDidMount: function() {
    var map;
    map = leaflet.map(this.state.id, this.props);
    return this.setState({
      map: map
    });
  },
  render: function() {
    var children;
    children = {};
    react.Children.forEach(this.props.children, (function(_this) {
      return function(child) {
        child.props.map = _this.state.map;
        return children[uniqueId("child")] = child;
      };
    })(this));
    return div({
      id: this.state.id
    }, children);
  }
});

module.exports = Map;
