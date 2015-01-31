jest.dontMock("../Map");
jest.dontMock("../mixins/element");

import React from "react";
import Map from "../Map";

describe("Map", () => {
  it("only renders the container div server-side", () => {
    document.body.innerHTML = '<div id="test"></div>';
    let Component = React.createClass({
      render() {
        return <span>test</span>;
      }
    });
    let component = <Map><Component /></Map>;
    let html = React.renderToStaticMarkup(<Map />, document.getElementById("test"));

    expect(html).toBe('<div id="map1"></div>');
  });

  it("initializes the map in the rendered container", () => {
    document.body.innerHTML = '<div id="test"></div>';
    let instance = React.render(<Map />, document.getElementById("test"));

    expect(instance.getDOMNode()._leaflet).toBe(true);
  });

  it("sets center and zoom props", () => {
    let center = [1.2, 3.4];
    let zoom = 10;

    document.body.innerHTML = '<div id="test"></div>';
    let component = <Map center={center} zoom={zoom} />;
    let instance = React.render(component, document.getElementById("test"));
    let mapLeaflet = instance.getLeafletElement();

    expect(mapLeaflet.getCenter().lat).toBe(center[0]);
    expect(mapLeaflet.getCenter().lng).toBe(center[1]);
    expect(mapLeaflet.getZoom()).toBe(zoom);
  });

  it("updates center and zoom props", () => {
    document.body.innerHTML = '<div id="test"></div>';
    let Component = React.createClass({
      getInitialState() {
        return {
          center: [1.2, 3.4],
          zoom: 10
        };
      },
      getLeafletMap() {
        return this.refs.map.getLeafletElement();
      },
      updatePosition() {
        this.setState({
          center: [2.3, 4.5],
          zoom: 12
        });
      },
      render() {
        return <Map ref="map" center={this.state.center} zoom={this.state.zoom} />;
      }
    });
    let instance = React.render(<Component />, document.getElementById("test"));
    let mapLeaflet = instance.getLeafletMap();

    expect(mapLeaflet.getCenter().lat).toBe(1.2);
    expect(mapLeaflet.getCenter().lng).toBe(3.4);
    expect(mapLeaflet.getZoom()).toBe(10);

    instance.updatePosition();
    expect(mapLeaflet.getCenter().lat).toBe(2.3);
    expect(mapLeaflet.getCenter().lng).toBe(4.5);
    expect(mapLeaflet.getZoom()).toBe(12);
  });
});
