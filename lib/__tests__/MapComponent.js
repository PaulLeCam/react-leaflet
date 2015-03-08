"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

jest.dontMock("../MapComponent");

var Leaflet = _interopRequire(require("leaflet"));

var React = _interopRequire(require("react"));

var MapComponent = _interopRequire(require("../MapComponent"));

describe("MapComponent", function () {
  var Component = (function (_MapComponent) {
    function Component() {
      _classCallCheck(this, Component);

      if (_MapComponent != null) {
        _MapComponent.apply(this, arguments);
      }
    }

    _inherits(Component, _MapComponent);

    _createClass(Component, {
      componentWillMount: {
        value: function componentWillMount() {
          _get(Object.getPrototypeOf(Component.prototype), "componentWillMount", this).call(this);
          this.leafletElement = Leaflet.map("test");
        }
      },
      render: {
        value: function render() {
          return null;
        }
      }
    });

    return Component;
  })(MapComponent);

  it("exposes a `leafletElement` method", function () {
    document.body.innerHTML = "<div id=\"test\"></div>";

    var component = React.createElement(Component, null);
    var instance = React.render(component, document.getElementById("test"));

    expect(instance.leafletElement._container).toBeDefined();
  });

  it("binds the event", function () {
    document.body.innerHTML = "<div id=\"test\"></div>";

    var callback = jest.genMockFn();
    var component = React.createElement(Component, { onLeafletClick: callback });
    var instance = React.render(component, document.getElementById("test"));

    instance.fireLeafletEvent("click");
    expect(callback.mock.calls.length).toBe(1);
  });

  it("binds events as Leaflet events", function () {
    document.body.innerHTML = "<div id=\"test\"></div>";

    var callback = jest.genMockFn();
    var component = React.createElement(Component, { onClick: callback });
    var instance = React.render(component, document.getElementById("test"));

    instance.fireLeafletEvent("click");
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
        this.refs.c.fireLeafletEvent("click");
      },
      render: function render() {
        return this.state.bindEvent ? React.createElement(Component, { ref: "c", onClick: callback }) : React.createElement(Component, { ref: "c" });
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
        this.refs.c.fireLeafletEvent("click");
      },
      render: function render() {
        return React.createElement(Component, { ref: "c", onClick: this.state.cb });
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