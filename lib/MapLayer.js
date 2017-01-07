'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _children = require('./types/children');

var _children2 = _interopRequireDefault(_children);

var _layerContainer = require('./types/layerContainer');

var _layerContainer2 = _interopRequireDefault(_layerContainer);

var _map = require('./types/map');

var _map2 = _interopRequireDefault(_map);

var _MapComponent2 = require('./MapComponent');

var _MapComponent3 = _interopRequireDefault(_MapComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var MapLayer = function (_MapComponent) {
  _inherits(MapLayer, _MapComponent);

  function MapLayer() {
    _classCallCheck(this, MapLayer);

    return _possibleConstructorReturn(this, _MapComponent.apply(this, arguments));
  }

  // eslint-disable-next-line no-unused-vars
  MapLayer.prototype.createLeafletElement = function createLeafletElement(props) {
    throw new Error('createLeafletElement() must be implemented');
  };

  // eslint-disable-next-line no-unused-vars


  MapLayer.prototype.updateLeafletElement = function updateLeafletElement(fromProps, toProps) {};

  MapLayer.prototype.componentWillMount = function componentWillMount() {
    _MapComponent.prototype.componentWillMount.call(this);
    this.leafletElement = this.createLeafletElement(this.props);
  };

  MapLayer.prototype.componentDidMount = function componentDidMount() {
    _MapComponent.prototype.componentDidMount.call(this);
    this.layerContainer.addLayer(this.leafletElement);
  };

  MapLayer.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    this.updateLeafletElement(prevProps, this.props);
  };

  MapLayer.prototype.componentWillUnmount = function componentWillUnmount() {
    _MapComponent.prototype.componentWillUnmount.call(this);
    this.layerContainer.removeLayer(this.leafletElement);
  };

  MapLayer.prototype.render = function render() {
    return Array.isArray(this.props.children) ? _react2.default.createElement(
      'div',
      { style: { display: 'none' } },
      this.props.children
    ) : this.props.children || null;
  };

  _createClass(MapLayer, [{
    key: 'layerContainer',
    get: function get() {
      return this.context.layerContainer || this.context.map;
    }
  }]);

  return MapLayer;
}(_MapComponent3.default);

MapLayer.propTypes = {
  children: _children2.default
};
MapLayer.contextTypes = {
  layerContainer: _layerContainer2.default,
  map: _map2.default,
  pane: _react2.default.PropTypes.string
};
exports.default = MapLayer;