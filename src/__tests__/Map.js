jest.dontMock("../Map");
jest.dontMock("../MapComponent");

import React from "react";
import Map from "../Map";

describe("Map", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="test"></div>';
  });

  it("only renders the container div server-side", () => {
    class Component extends React.Component {
      render() {
        return <span>test</span>;
      }
    }
    const component = <Map><Component /></Map>;
    const html = React.renderToStaticMarkup(component, document.getElementById("test"));

    expect(html).toBe('<div id="map1"></div>');
  });

  it("initializes the map in the rendered container", () => {
    const component = <Map />;
    const instance = React.render(component, document.getElementById("test"));
    const node = React.findDOMNode(instance);

    expect(node._leaflet).toBe(true);
  });

  it("sets center and zoom props", () => {
    const center = [1.2, 3.4];
    const zoom = 10;

    const component = <Map center={center} zoom={zoom} />;
    const instance = React.render(component, document.getElementById("test"));
    const mapLeaflet = instance.leafletElement;

    expect(mapLeaflet.getCenter().lat).toBe(center[0]);
    expect(mapLeaflet.getCenter().lng).toBe(center[1]);
    expect(mapLeaflet.getZoom()).toBe(zoom);
  });

  it("updates center and zoom props", () => {
    class Component extends React.Component {
      constructor() {
        this.state = {
          center: [1.2, 3.4],
          zoom: 10
        };
      }
      getLeafletMap() {
        return this.refs.map.leafletElement;
      }
      updatePosition() {
        this.setState({
          center: [2.3, 4.5],
          zoom: 12
        });
      }
      render() {
        return <Map ref="map" center={this.state.center} zoom={this.state.zoom} />;
      }
    }
    const instance = React.render(<Component />, document.getElementById("test"));
    const mapLeaflet = instance.getLeafletMap();

    expect(mapLeaflet.getCenter().lat).toBe(1.2);
    expect(mapLeaflet.getCenter().lng).toBe(3.4);
    expect(mapLeaflet.getZoom()).toBe(10);

    instance.updatePosition();
    expect(mapLeaflet.getCenter().lat).toBe(2.3);
    expect(mapLeaflet.getCenter().lng).toBe(4.5);
    expect(mapLeaflet.getZoom()).toBe(12);
  });
});
