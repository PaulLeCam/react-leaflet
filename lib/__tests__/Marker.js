'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

jest.dontMock('../BaseTileLayer');
jest.dontMock('../MapComponent');
jest.dontMock('../MapLayer');
jest.dontMock('../PopupContainer');
jest.dontMock('../Map');
jest.dontMock('../TileLayer');
jest.dontMock('../Marker');
jest.dontMock('../index');

var _require = require('../');

var Map = _require.Map;
var Marker = _require.Marker;
var TileLayer = _require.TileLayer;

describe('Marker', function () {
  it('adds the marker to the map', function () {
    var position = [0, 0];
    var component = _react2['default'].createElement(
      Map,
      { center: position, zoom: 10 },
      _react2['default'].createElement(TileLayer, { url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png' }),
      _react2['default'].createElement(Marker, { position: position })
    );

    document.body.innerHTML = '<div id="test"></div>';
    (0, _reactDom.render)(component, document.getElementById('test'));

    expect(document.querySelector('#test .leaflet-marker-pane img')).toBeDefined();
  });
});