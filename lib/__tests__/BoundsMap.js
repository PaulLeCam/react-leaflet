'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDomServer = require('react-dom/server');

jest.dontMock('../BoundsMap');
jest.dontMock('../Map');
jest.dontMock('../MapComponent');

var BoundsMap = require('../BoundsMap');

describe('BoundsMap', function () {
  beforeEach(function () {
    document.body.innerHTML = '<div id="test"></div>';
  });

  it('only renders the container div server-side', function () {
    var Component = (function (_React$Component) {
      _inherits(Component, _React$Component);

      function Component() {
        _classCallCheck(this, Component);

        _get(Object.getPrototypeOf(Component.prototype), 'constructor', this).apply(this, arguments);
      }

      _createClass(Component, [{
        key: 'render',
        value: function render() {
          return _react2['default'].createElement(
            'span',
            null,
            'test'
          );
        }
      }]);

      return Component;
    })(_react2['default'].Component);

    var component = _react2['default'].createElement(
      BoundsMap,
      null,
      _react2['default'].createElement(Component, null)
    );
    var html = (0, _reactDomServer.renderToStaticMarkup)(component, document.getElementById('test'));

    expect(html).toBe('<div id="map1"></div>');
  });

  it('initializes the map in the rendered container', function () {
    var component = _react2['default'].createElement(BoundsMap, null);
    var instance = (0, _reactDom.render)(component, document.getElementById('test'));
    var node = (0, _reactDom.findDOMNode)(instance);

    expect(node._leaflet).toBe(true);
  });

  it('sets bounds', function () {
    var bounds = [[0, 0], [2, 2]];

    var component = _react2['default'].createElement(BoundsMap, { bounds: bounds });
    var instance = (0, _reactDom.render)(component, document.getElementById('test'));
    var mapLeaflet = instance.leafletElement;

    expect(mapLeaflet.getCenter().lat).toBeCloseTo(1);
    expect(mapLeaflet.getCenter().lng).toBeCloseTo(1);
  });

  it('updates bounds props', function () {
    var Component = (function (_React$Component2) {
      _inherits(Component, _React$Component2);

      function Component() {
        _classCallCheck(this, Component);

        _get(Object.getPrototypeOf(Component.prototype), 'constructor', this).call(this);
        this.state = {
          bounds: [[0, 0], [2, 2]]
        };
      }

      _createClass(Component, [{
        key: 'getLeafletMap',
        value: function getLeafletMap() {
          return this.refs.map.leafletElement;
        }
      }, {
        key: 'updatePosition',
        value: function updatePosition() {
          this.setState({
            bounds: [[0, 0], [-2, -2]]
          });
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2['default'].createElement(BoundsMap, { bounds: this.state.bounds, ref: 'map' });
        }
      }]);

      return Component;
    })(_react2['default'].Component);

    var instance = (0, _reactDom.render)(_react2['default'].createElement(Component, null), document.getElementById('test'));
    var mapLeaflet = instance.getLeafletMap();

    expect(mapLeaflet.getCenter().lat).toBeCloseTo(1);
    expect(mapLeaflet.getCenter().lng).toBeCloseTo(1);

    instance.updatePosition();
    expect(mapLeaflet.getCenter().lat).toBeCloseTo(-1);
    expect(mapLeaflet.getCenter().lng).toBeCloseTo(-1);
  });
});