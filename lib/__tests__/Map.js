"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _React = require("react");

var _React2 = _interopRequireDefault(_React);

jest.dontMock("../Map");
jest.dontMock("../MapComponent");

var Map = require("../Map");

describe("Map", function () {
  beforeEach(function () {
    document.body.innerHTML = "<div id=\"test\"></div>";
  });

  it("only renders the container div server-side", function () {
    var Component = (function (_React$Component) {
      function Component() {
        _classCallCheck(this, Component);

        if (_React$Component != null) {
          _React$Component.apply(this, arguments);
        }
      }

      _inherits(Component, _React$Component);

      _createClass(Component, [{
        key: "render",
        value: function render() {
          return _React2["default"].createElement(
            "span",
            null,
            "test"
          );
        }
      }]);

      return Component;
    })(_React2["default"].Component);

    var component = _React2["default"].createElement(
      Map,
      null,
      _React2["default"].createElement(Component, null)
    );
    var html = _React2["default"].renderToStaticMarkup(component, document.getElementById("test"));

    expect(html).toBe("<div id=\"map1\"></div>");
  });

  it("initializes the map in the rendered container", function () {
    var component = _React2["default"].createElement(Map, null);
    var instance = _React2["default"].render(component, document.getElementById("test"));
    var node = _React2["default"].findDOMNode(instance);

    expect(node._leaflet).toBe(true);
  });

  it("sets center and zoom props", function () {
    var center = [1.2, 3.4];
    var zoom = 10;

    var component = _React2["default"].createElement(Map, { center: center, zoom: zoom });
    var instance = _React2["default"].render(component, document.getElementById("test"));
    var mapLeaflet = instance.leafletElement;

    expect(mapLeaflet.getCenter().lat).toBe(center[0]);
    expect(mapLeaflet.getCenter().lng).toBe(center[1]);
    expect(mapLeaflet.getZoom()).toBe(zoom);
  });

  it("updates center and zoom props", function () {
    var Component = (function (_React$Component2) {
      function Component() {
        _classCallCheck(this, Component);

        _get(Object.getPrototypeOf(Component.prototype), "constructor", this).call(this);
        this.state = {
          center: [1.2, 3.4],
          zoom: 10
        };
      }

      _inherits(Component, _React$Component2);

      _createClass(Component, [{
        key: "getLeafletMap",
        value: function getLeafletMap() {
          return this.refs.map.leafletElement;
        }
      }, {
        key: "updatePosition",
        value: function updatePosition() {
          this.setState({
            center: [2.3, 4.5],
            zoom: 12
          });
        }
      }, {
        key: "render",
        value: function render() {
          return _React2["default"].createElement(Map, { ref: "map", center: this.state.center, zoom: this.state.zoom });
        }
      }]);

      return Component;
    })(_React2["default"].Component);

    var instance = _React2["default"].render(_React2["default"].createElement(Component, null), document.getElementById("test"));
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