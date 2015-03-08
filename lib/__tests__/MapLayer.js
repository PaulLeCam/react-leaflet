"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

jest.dontMock("../MapComponent");
jest.dontMock("../MapLayer");
jest.dontMock("../Map");

var Leaflet = _interopRequire(require("leaflet"));

var React = _interopRequire(require("react"));

var MapLayer = _interopRequire(require("../MapLayer"));

var Map = _interopRequire(require("../Map"));

describe("MapLayer", function () {
  it("passes its `map` prop to its children", function () {
    document.body.innerHTML = "<div id=\"test\"></div>";

    var Component = (function (_MapLayer) {
      function Component() {
        _classCallCheck(this, Component);

        if (_MapLayer != null) {
          _MapLayer.apply(this, arguments);
        }
      }

      _inherits(Component, _MapLayer);

      _createClass(Component, {
        componentWillMount: {
          value: function componentWillMount() {
            _get(Object.getPrototypeOf(Component.prototype), "componentWillMount", this).call(this);
            expect(this.props.map).toBeDefined();
            this.leafletElement = Leaflet.marker([0, 0]);
          }
        },
        render: {
          value: function render() {
            var children = this.getClonedChildrenWithMap({ parent: true });
            return React.createElement(
              "div",
              null,
              children
            );
          }
        }
      });

      return Component;
    })(MapLayer);

    var ChildComponent = (function (_React$Component) {
      function ChildComponent() {
        _classCallCheck(this, ChildComponent);

        if (_React$Component != null) {
          _React$Component.apply(this, arguments);
        }
      }

      _inherits(ChildComponent, _React$Component);

      _createClass(ChildComponent, {
        componentWillMount: {
          value: function componentWillMount() {
            expect(this.props.map).toBeDefined();
            expect(this.props.parent).toBe(true);
          }
        },
        render: {
          value: function render() {
            return null;
          }
        }
      });

      return ChildComponent;
    })(React.Component);

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