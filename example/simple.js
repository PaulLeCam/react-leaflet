var React = require("react");
var {Map, TileLayer, Marker, Popup} = require("react-leaflet");

module.exports = React.createClass({
  displayName: "SimpleExample",

  getInitialState() {
    return {
      lat: 51.505,
      lng: -0.09,
      zoom: 13
    };
  },

  render() {
    var position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>A pretty CSS3 popup. <br/> Easily customizable.</Popup>
        </Marker>
      </Map>
    );
  }
});
