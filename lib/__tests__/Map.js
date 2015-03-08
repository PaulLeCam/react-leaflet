"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

jest.dontMock("../Map");
jest.dontMock("../MapComponent");

var React = _interopRequire(require("react"));

var Map = _interopRequire(require("../Map"));

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

      _createClass(Component, {
        render: {
          value: function render() {
            return React.createElement(
              "span",
              null,
              "test"
            );
          }
        }
      });

      return Component;
    })(React.Component);

    var component = React.createElement(
      Map,
      null,
      React.createElement(Component, null)
    );
    var html = React.renderToStaticMarkup(component, document.getElementById("test"));

    expect(html).toBe("<div id=\"map1\"></div>");
  });

  it("initializes the map in the rendered container", function () {
    var component = React.createElement(Map, null);
    var instance = React.render(component, document.getElementById("test"));
    var node = React.findDOMNode(instance);

    expect(node._leaflet).toBe(true);
  });

  it("sets center and zoom props", function () {
    var center = [1.2, 3.4];
    var zoom = 10;

    var component = React.createElement(Map, { center: center, zoom: zoom });
    var instance = React.render(component, document.getElementById("test"));
    var mapLeaflet = instance.leafletElement;

    expect(mapLeaflet.getCenter().lat).toBe(center[0]);
    expect(mapLeaflet.getCenter().lng).toBe(center[1]);
    expect(mapLeaflet.getZoom()).toBe(zoom);
  });

  it("updates center and zoom props", function () {
    var Component = (function (_React$Component) {
      function Component() {
        _classCallCheck(this, Component);

        this.state = {
          center: [1.2, 3.4],
          zoom: 10
        };
      }

      _inherits(Component, _React$Component);

      _createClass(Component, {
        getLeafletMap: {
          value: function getLeafletMap() {
            return this.refs.map.leafletElement;
          }
        },
        updatePosition: {
          value: function updatePosition() {
            this.setState({
              center: [2.3, 4.5],
              zoom: 12
            });
          }
        },
        render: {
          value: function render() {
            return React.createElement(Map, { ref: "map", center: this.state.center, zoom: this.state.zoom });
          }
        }
      });

      return Component;
    })(React.Component);

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