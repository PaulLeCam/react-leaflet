jest.dontMock("../element");
jest.dontMock("../mapLayer");
jest.dontMock("../../Map");

import Leaflet from "leaflet";
import React from "react";

import mapLayerMixin from "../mapLayer";
import Map from "../../Map";

describe("mapLayerMixin", () => {
  it("passes its `map` prop to its children", () => {
    document.body.innerHTML = '<div id="test"></div>';

    let Component = React.createClass({
      mixins: [mapLayerMixin],
      componentWillMount() {
        expect(this.props.map).toBeDefined();
        this._leafletElement = Leaflet.marker([0, 0]);
      },
      render() {
        let children = this.getClonedChildrenWithMap({parent: true});
        return <div>{children}</div>;
      }
    });
    let ChildComponent = React.createClass({
      componentWillMount() {
        expect(this.props.map).toBeDefined();
        expect(this.props.parent).toBe(true);
      },
      render() {
        return null;
      }
    });

    let component = (
      <Map>
        <Component>
          <ChildComponent />
        </Component>
      </Map>
    );
    let instance = React.render(component, document.getElementById("test"));
  });
});
