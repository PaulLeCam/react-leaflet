var Type, leaflet, react;

react = require("react");

leaflet = require("leaflet");

Type = react.PropTypes;

module.exports = react.createClass({
  displayName: "TileLayer",
  propTypes: {
    url: Type.string.isRequired
  },
  getInitialState: function() {
    return {
      tile: leaflet.tileLayer(this.props.url, this.props)
    };
  },
  render: function() {
    if (this.props.map) {
      this.state.tile.addTo(this.props.map);
    }
    return null;
  }
});
