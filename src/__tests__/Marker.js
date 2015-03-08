jest.dontMock("../BaseTileLayer");
jest.dontMock("../MapComponent");
jest.dontMock("../MapLayer");
jest.dontMock("../PopupContainer");
jest.dontMock("../Map");
jest.dontMock("../TileLayer");
jest.dontMock("../Marker");
jest.dontMock("../index");

import React from "react";
import {Map, Marker, TileLayer} from "../";

describe("Marker", () => {
  it("adds the marker to the map", () => {
    const position = [0, 0];
    const component = <Map center={position} zoom={10}>
      <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
      <Marker position={position} />
    </Map>;

    document.body.innerHTML = '<div id="test"></div>';
    React.render(component, document.getElementById("test"));

    expect(document.querySelector("#test .leaflet-marker-pane img")).toBeDefined();
  });
});
