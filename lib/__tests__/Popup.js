'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

jest.dontMock('../BaseTileLayer');
jest.dontMock('../MapComponent');
jest.dontMock('../MapLayer');
jest.dontMock('../PopupContainer');
jest.dontMock('../Map');
jest.dontMock('../Marker');
jest.dontMock('../Popup');
jest.dontMock('../TileLayer');
jest.dontMock('../index');

var _require = require('../');

var Map = _require.Map;
var Marker = _require.Marker;
var Popup = _require.Popup;
var TileLayer = _require.TileLayer;

describe('Popup', function () {
  it('adds the popup to the map', function () {
    var position = [0, 0];
    var component = _react2['default'].createElement(
      Map,
      { center: position, zoom: 10 },
      _react2['default'].createElement(TileLayer, { url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png' }),
      _react2['default'].createElement(
        Popup,
        { position: position },
        _react2['default'].createElement(
          'span',
          null,
          'Test Popup'
        )
      )
    );

    document.body.innerHTML = '<div id="test"></div>';
    _react2['default'].render(component, document.getElementById('test'));

    expect(document.querySelector('#test .leaflet-popup-content span').textContent).toBe('Test Popup');
  });

  it('adds and removes the popup on the map', function () {
    var getNode = function getNode() {
      return document.querySelector('#test .leaflet-popup-content span');
    };

    var Component = (function (_React$Component) {
      function Component() {
        _classCallCheck(this, Component);

        _get(Object.getPrototypeOf(Component.prototype), 'constructor', this).call(this);
        this.state = {
          show: false,
          test: true
        };
      }

      _inherits(Component, _React$Component);

      _createClass(Component, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          expect(getNode()).toBe(null);
          this.setState({ show: true });
        }
      }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
          if (this.state.test) {
            expect(getNode()).toBeDefined();
            this.setState({
              show: false,
              test: false
            });
          } else {
            expect(getNode()).toBe(null);
          }
        }
      }, {
        key: 'render',
        value: function render() {
          var position = [0, 0];
          var popup = this.state.show ? _react2['default'].createElement(
            Popup,
            { position: position },
            _react2['default'].createElement(
              'span',
              null,
              'Test Popup'
            )
          ) : null;

          return _react2['default'].createElement(
            Map,
            { ref: 'map', center: position, zoom: 10 },
            _react2['default'].createElement(TileLayer, { url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png' }),
            popup
          );
        }
      }]);

      return Component;
    })(_react2['default'].Component);

    document.body.innerHTML = '<div id="test"></div>';
    _react2['default'].render(_react2['default'].createElement(Component, null), document.getElementById('test'));
  });
});