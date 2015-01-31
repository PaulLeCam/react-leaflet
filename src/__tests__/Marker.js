jest.dontMock("../Map");
jest.dontMock("../TileLayer");
jest.dontMock("../Marker");
jest.dontMock("../mixins/element");
jest.dontMock("../mixins/mapLayer");

import React from "react/addons";
let Utils = React.addons.TestUtils;

import {Map, Marker, TileLayer} from "../";

describe("Marker", () => {
  it("should add the marker to the map", () => {
    document.body.innerHTML = '<div id="test"></div>';
    let position = [0, 0];
    let mapComponent = (
      <Map center={position} zoom={10}>
        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        <Marker position={position} />
      </Map>
    );
    let mapInstance = React.render(mapComponent, document.getElementById("test"));

    expect(mapInstance.getDOMNode().querySelector(".leaflet-marker-pane img")).toBeDefined();
  });
});
