var Type, latlngType, leaflet, react;

react = require("react");

leaflet = require("leaflet");

Type = react.PropTypes;

latlngType = require("./types/latlng");

module.exports = react.createClass({
  displayName: "Marker",
  propTypes: {
    position: latlngType.isRequired
  },
  getInitialState: function() {
    return {
      marker: leaflet.marker(this.props.position, this.props)
    };
  },
  render: function() {
    if (this.props.map) {
      this.state.marker.addTo(this.props.map);
    }
    return null;
  }
});
