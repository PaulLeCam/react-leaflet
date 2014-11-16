jest.dontMock("../element");
jest.dontMock("../mapLayer");
jest.dontMock("../../Map");

describe("mapLayerMixin", function() {
  var Leaflet = require("leaflet");
  var React = require("react");

  var mapLayerMixin = require("../mapLayer");
  var Map = require("../../Map");

  it("passes its `map` prop to its children", function() {
    document.body.innerHTML = '<div id="test"></div>';

    var Component = React.createClass({
      mixins: [mapLayerMixin],
      componentWillMount() {
        expect(this.props.map).toBeDefined();
        this._leafletElement = Leaflet.marker([0, 0]);
      },
      render() {
        var children = this.getClonedChildrenWithMap({parent: true});
        return <div>{children}</div>;
      }
    });
    var ChildComponent = React.createClass({
      componentWillMount() {
        expect(this.props.map).toBeDefined();
        expect(this.props.parent).toBe(true);
      },
      render() {
        return null;
      }
    });

    var component = (
      <Map>
        <Component>
          <ChildComponent />
        </Component>
      </Map>
    );
    var instance = React.render(component, document.getElementById("test"));
  });
});
