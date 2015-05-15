"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x,
    property = _x2,
    receiver = _x3; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _Leaflet = require("leaflet");

var _Leaflet2 = _interopRequireDefault(_Leaflet);

var _React = require("react");

var _React2 = _interopRequireDefault(_React);

jest.dontMock("../MapComponent");
jest.dontMock("../MapLayer");
jest.dontMock("../Map");

var MapLayer = require("../MapLayer");
var Map = require("../Map");

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

      _createClass(Component, [{
        key: "componentWillMount",
        value: function componentWillMount() {
          _get(Object.getPrototypeOf(Component.prototype), "componentWillMount", this).call(this);
          expect(this.props.map).toBeDefined();
          this.leafletElement = _Leaflet2["default"].marker([0, 0]);
        }
      }, {
        key: "render",
        value: function render() {
          var children = this.getClonedChildrenWithMap({ parent: true });
          return _React2["default"].createElement(
            "div",
            null,
            children
          );
        }
      }]);

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

      _createClass(ChildComponent, [{
        key: "componentWillMount",
        value: function componentWillMount() {
          expect(this.props.map).toBeDefined();
          expect(this.props.parent).toBe(true);
        }
      }, {
        key: "render",
        value: function render() {
          return null;
        }
      }]);

      return ChildComponent;
    })(_React2["default"].Component);

    var component = _React2["default"].createElement(
      Map,
      null,
      _React2["default"].createElement(
        Component,
        null,
        _React2["default"].createElement(ChildComponent, null)
      )
    );
    var instance = _React2["default"].render(component, document.getElementById("test"));
  });
});