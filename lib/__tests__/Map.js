"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

jest.dontMock("../Map");
jest.dontMock("../mixins/element");

var React = _interopRequire(require("react"));

var Map = _interopRequire(require("../Map"));

describe("Map", function () {
  it("only renders the container div server-side", function () {
    document.body.innerHTML = "<div id=\"test\"></div>";
    var Component = React.createClass({
      displayName: "Component",

      render: function render() {
        return React.createElement(
          "span",
          null,
          "test"
        );
      }
    });
    var component = React.createElement(
      Map,
      null,
      React.createElement(Component, null)
    );
    var html = React.renderToStaticMarkup(React.createElement(Map, null), document.getElementById("test"));

    expect(html).toBe("<div id=\"map1\"></div>");
  });

  it("initializes the map in the rendered container", function () {
    document.body.innerHTML = "<div id=\"test\"></div>";
    var instance = React.render(React.createElement(Map, null), document.getElementById("test"));

    expect(instance.getDOMNode()._leaflet).toBe(true);
  });

  it("sets center and zoom props", function () {
    var center = [1.2, 3.4];
    var zoom = 10;

    document.body.innerHTML = "<div id=\"test\"></div>";
    var component = React.createElement(Map, { center: center, zoom: zoom });
    var instance = React.render(component, document.getElementById("test"));
    var mapLeaflet = instance.getLeafletElement();

    expect(mapLeaflet.getCenter().lat).toBe(center[0]);
    expect(mapLeaflet.getCenter().lng).toBe(center[1]);
    expect(mapLeaflet.getZoom()).toBe(zoom);
  });

  it("updates center and zoom props", function () {
    document.body.innerHTML = "<div id=\"test\"></div>";
    var Component = React.createClass({
      displayName: "Component",

      getInitialState: function getInitialState() {
        return {
          center: [1.2, 3.4],
          zoom: 10
        };
      },
      getLeafletMap: function getLeafletMap() {
        return this.refs.map.getLeafletElement();
      },
      updatePosition: function updatePosition() {
        this.setState({
          center: [2.3, 4.5],
          zoom: 12
        });
      },
      render: function render() {
        return React.createElement(Map, { ref: "map", center: this.state.center, zoom: this.state.zoom });
      }
    });
    var instance = React.render(React.createElement(Component, null), document.getElementById("test"));
    var mapLeaflet = instance.getLeafletMap();

    expect(mapLeaflet.getCenter().lat).toBe(1.2);
    expect(mapLeaflet.getCenter().lng).toBe(3.4);
    expect(mapLeaflet.getZoom()).toBe(10);

    instance.updatePosition();
    expect(mapLeaflet.getCenter().lat).toBe(2.3);
    expect(mapLeaflet.getCenter().lng).toBe(4.5);
    expect(mapLeaflet.getZoom()).toBe(12);
  });
});