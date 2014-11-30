var React = require("react");
var {Circle, CircleMarker, Map, MultiPolygon, MultiPolyline,
  Polygon, Polyline, Popup, Rectangle, TileLayer} = require("react-leaflet");

module.exports = React.createClass({
  displayName: "VectorLayersExample",

  render() {
    var center = [51.505, -0.09];

    var polyline = [
      [51.505, -0.09],
      [51.51, -0.1],
      [51.51, -0.12]
    ];

    var multiPolyline = [
      [[51.5, -0.1], [51.5, -0.12], [51.52, -0.12]],
      [[51.5, -0.05], [51.5, -0.06], [51.52, -0.06]]
    ];

    var polygon = [
      [51.515, -0.09],
      [51.52, -0.1],
      [51.52, -0.12]
    ];

    var multiPolygon = [
      [[51.51, -0.12], [51.51, -0.13], [51.53, -0.13]],
      [[51.51, -0.05], [51.51, -0.07], [51.53, -0.07]]
    ];

    var rectangle = [
      [51.49, -0.08],
      [51.5, -0.06]
    ];

    return (
      <Map center={center} zoom={13}>
        <TileLayer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Circle center={center} radius={200} fillColor="blue" />
        <CircleMarker center={[51.51, -0.12]} radius={20} color="red">
          <Popup>
            <span>Popup in CircleMarker</span>
          </Popup>
        </CircleMarker>
        <Polyline positions={polyline} color="lime" />
        <MultiPolyline polylines={multiPolyline} color="lime" />
        <Polygon positions={polygon} color="purple" />
        <MultiPolygon polygons={multiPolygon} color="purple" />
        <Rectangle bounds={rectangle} color="black" />
      </Map>
    );
  }
});
