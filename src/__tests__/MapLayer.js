import Leaflet from "leaflet-headless";
import React from "react";

jest.dontMock("../MapComponent");
jest.dontMock("../MapLayer");
jest.dontMock("../Map");

const MapLayer = require("../MapLayer");
const Map = require("../Map");

describe("MapLayer", () => {
  it("passes its `map` prop to its children", () => {
    document.body.innerHTML = '<div id="test"></div>';

    class Component extends MapLayer {
      componentWillMount() {
        super.componentWillMount();
        expect(this.props.map).toBeDefined();
        this.leafletElement = Leaflet.marker([0, 0]);
      }
      render() {
        const children = this.getClonedChildrenWithMap({parent: true});
        return <div>{children}</div>;
      }
    }

    class ChildComponent extends React.Component {
      componentWillMount() {
        expect(this.props.map).toBeDefined();
        expect(this.props.parent).toBe(true);
      }
      render() {
        return null;
      }
    }

    const component = (
      <Map>
        <Component>
          <ChildComponent />
        </Component>
      </Map>
    );
    const instance = React.render(component, document.getElementById("test"));
  });
});
