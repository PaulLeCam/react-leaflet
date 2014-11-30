var React = require("react");
var {Map, TileLayer, Marker, Popup} = require("react-leaflet");

module.exports = React.createClass({
  displayName: "EventsExample",

  getInitialState() {
    return {
      hasLocation: false,
      latlng: {
        lat: 51.505,
        lng: -0.09
      }
    };
  },

  handleClick() {
    this.refs.map.getLeafletElement().locate();
  },

  handleLocationFound(e) {
    this.setState({
      hasLocation: true,
      latlng: e.latlng
    });
  },

  render() {
    var marker = null;
    if (this.state.hasLocation) {
      marker = (
        <Marker position={this.state.latlng}>
          <Popup>
            <span>You are here</span>
          </Popup>
        </Marker>
      );
    }

    return (
      <Map ref="map"
        center={this.state.latlng}
        zoom={13}
        onLeafletClick={this.handleClick}
        onLeafletLocationfound={this.handleLocationFound}>
        <TileLayer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {marker}
      </Map>
    );
  }
});
