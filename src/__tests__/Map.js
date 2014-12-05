jest.dontMock("../Map");
jest.dontMock("../mixins/element");

describe("Map", function() {
  var React, Map;

  beforeEach(function() {
    React = require("react");
    Map = require("../Map");
  });

  it("initializes the map in the rendered container", function() {
    document.body.innerHTML = '<div id="test"></div>';
    var instance = React.render(<Map />, document.getElementById("test"));

    expect(instance.getDOMNode()._leaflet).toBe(true);
  });

  it("sets center and zoom props", function() {
    var center = [1.2, 3.4];
    var zoom = 10;

    document.body.innerHTML = '<div id="test"></div>';
    var component = <Map center={center} zoom={zoom} />;
    var instance = React.render(component, document.getElementById("test"));
    var mapLeaflet = instance.getLeafletElement();

    expect(mapLeaflet.getCenter().lat).toBe(center[0]);
    expect(mapLeaflet.getCenter().lng).toBe(center[1]);
    expect(mapLeaflet.getZoom()).toBe(zoom);
  });

  it("updates center and zoom props", function() {
    document.body.innerHTML = '<div id="test"></div>';
    var Component = React.createClass({
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
    var instance = React.render(<Component />, document.getElementById("test"));
    var mapLeaflet = instance.getLeafletMap();

    expect(mapLeaflet.getCenter().lat).toBe(1.2);
    expect(mapLeaflet.getCenter().lng).toBe(3.4);
    expect(mapLeaflet.getZoom()).toBe(10);

    instance.updatePosition();
    expect(mapLeaflet.getCenter().lat).toBe(2.3);
    expect(mapLeaflet.getCenter().lng).toBe(4.5);
    expect(mapLeaflet.getZoom()).toBe(12);
  });

  it("only renders the container div server-side", function() {
    document.body.innerHTML = '<div id="test"></div>';
    var Component = React.createClass({
      render() {
        return <span>test</span>;
      }
    });
    var component = <Map><Component /></Map>;
    var html = React.renderToStaticMarkup(<Map />, document.getElementById("test"));

    expect(html).toBe('<div id="map1"></div>');
  });
});
