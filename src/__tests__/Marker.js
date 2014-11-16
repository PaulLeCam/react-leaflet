jest.dontMock("../Map");
jest.dontMock("../TileLayer");
jest.dontMock("../Marker");
jest.dontMock("../mixins/element");
jest.dontMock("../mixins/mapLayer");

describe("Marker", function() {
  it("should add the marker to the map", function() {
    var React = require("react/addons");
    var Utils = React.addons.TestUtils;
    var {Map, Marker, TileLayer} = require("../");

    document.body.innerHTML = '<div id="test"></div>';
    var position = [0, 0];
    var mapComponent = (
      <Map center={position} zoom={10}>
        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        <Marker position={position} />
      </Map>
    );
    var mapInstance = React.render(mapComponent, document.getElementById("test"));

    expect(mapInstance.getDOMNode().querySelector(".leaflet-marker-pane img")).toBeDefined();
  });
});
