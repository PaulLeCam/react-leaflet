"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

jest.dontMock("../element");

var Leaflet = _interopRequire(require("leaflet"));

var React = _interopRequire(require("react"));

var elementMixin = _interopRequire(require("../element"));

describe("elementMixin", function () {
  var Component = React.createClass({
    displayName: "Component",

    mixins: [elementMixin],
    componentWillMount: function componentWillMount() {
      this._leafletElement = Leaflet.map("test");
    },
    render: function render() {
      return null;
    }
  });

  it("exposes a `getLeafletElement()` method", function () {
    document.body.innerHTML = "<div id=\"test\"></div>";

    var component = React.createElement(Component, null);
    var instance = React.render(component, document.getElementById("test"));

    expect(instance.getLeafletElement()._container).toBeDefined();
  });

  it("binds the event", function () {
    document.body.innerHTML = "<div id=\"test\"></div>";

    var callback = jest.genMockFn();
    var component = React.createElement(Component, { onLeafletClick: callback });
    var instance = React.render(component, document.getElementById("test"));

    instance.fireEvent("click");
    expect(callback.mock.calls.length).toBe(1);
  });

  it("binds events as Leaflet events", function () {
    document.body.innerHTML = "<div id=\"test\"></div>";

    var callback = jest.genMockFn();
    var component = React.createElement(Component, { onClick: callback });
    var instance = React.render(component, document.getElementById("test"));

    instance.fireEvent("click");
    expect(callback.mock.calls.length).toBe(1);
  });

  it("unbinds the event", function () {
    document.body.innerHTML = "<div id=\"test\"></div>";

    var callback = jest.genMockFn();
    var TestComponent = React.createClass({
      displayName: "TestComponent",

      getInitialState: function getInitialState() {
        return { bindEvent: true };
      },
      dontBind: function dontBind() {
        this.setState({ bindEvent: false });
      },
      fire: function fire() {
        this.refs.c.fireEvent("click");
      },
      render: function render() {
        return this.state.bindEvent ? React.createElement(Component, { ref: "c", onLeafletClick: callback }) : React.createElement(Component, { ref: "c" });
      }
    });
    var component = React.createElement(TestComponent, null);
    var instance = React.render(component, document.getElementById("test"));

    instance.fire();
    expect(callback.mock.calls.length).toBe(1);

    instance.dontBind();
    instance.fire();
    expect(callback.mock.calls.length).toBe(1);
  });

  it("replaces the event", function () {
    document.body.innerHTML = "<div id=\"test\"></div>";

    var callback1 = jest.genMockFn();
    var callback2 = jest.genMockFn();
    var TestComponent = React.createClass({
      displayName: "TestComponent",

      getInitialState: function getInitialState() {
        return { cb: callback1 };
      },
      replaceCallback: function replaceCallback() {
        this.setState({ cb: callback2 });
      },
      fire: function fire() {
        this.refs.c.fireEvent("click");
      },
      render: function render() {
        return React.createElement(Component, { ref: "c", onLeafletClick: this.state.cb });
      }
    });
    var component = React.createElement(TestComponent, null);
    var instance = React.render(component, document.getElementById("test"));

    instance.fire();
    expect(callback1.mock.calls.length).toBe(1);
    expect(callback2.mock.calls.length).toBe(0);

    instance.replaceCallback();
    instance.fire();
    expect(callback1.mock.calls.length).toBe(1);
    expect(callback2.mock.calls.length).toBe(1);
  });
});