var Map, Type, currentId, div, latlngBoundsType, latlngType, leaflet, react;

react = require("react/addons");

leaflet = require("leaflet");

Type = react.PropTypes;

latlngType = require("./types/latlng");

latlngBoundsType = require("./types/latlngBounds");

div = react.DOM.div;

currentId = 0;

Map = react.createClass({
  displayName: "Map",
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
    return div({
      id: this.state.id
    }, react.Children.map(this.props.children, (function(_this) {
      return function(child) {
        return react.addons.cloneWithProps(child, {
          map: _this.state.map
        });
      };
    })(this)));
  }
});

module.exports = Map;
