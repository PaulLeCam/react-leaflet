"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

jest.dontMock("../element");
jest.dontMock("../mapLayer");
jest.dontMock("../../Map");

var Leaflet = _interopRequire(require("leaflet"));

var React = _interopRequire(require("react"));

var mapLayerMixin = _interopRequire(require("../mapLayer"));

var Map = _interopRequire(require("../../Map"));

describe("mapLayerMixin", function () {
  it("passes its `map` prop to its children", function () {
    document.body.innerHTML = "<div id=\"test\"></div>";

    var Component = React.createClass({
      displayName: "Component",

      mixins: [mapLayerMixin],
      componentWillMount: function componentWillMount() {
        expect(this.props.map).toBeDefined();
        this._leafletElement = Leaflet.marker([0, 0]);
      },
      render: function render() {
        var children = this.getClonedChildrenWithMap({ parent: true });
        return React.createElement(
          "div",
          null,
          children
        );
      }
    });
    var ChildComponent = React.createClass({
      displayName: "ChildComponent",

      componentWillMount: function componentWillMount() {
        expect(this.props.map).toBeDefined();
        expect(this.props.parent).toBe(true);
      },
      render: function render() {
        return null;
      }
    });

    var component = React.createElement(
      Map,
      null,
      React.createElement(
        Component,
        null,
        React.createElement(ChildComponent, null)
      )
    );
    var instance = React.render(component, document.getElementById("test"));
  });
});