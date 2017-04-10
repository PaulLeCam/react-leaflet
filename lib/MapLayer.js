'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _children = require('./propTypes/children');

var _children2 = _interopRequireDefault(_children);

var _layerContainer = require('./propTypes/layerContainer');

var _layerContainer2 = _interopRequireDefault(_layerContainer);

var _map = require('./propTypes/map');

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

    return _possibleConstructorReturn(this, (MapLayer.__proto__ || Object.getPrototypeOf(MapLayer)).apply(this, arguments));
  }

  _createClass(MapLayer, [{
    key: 'createLeafletElement',


    // eslint-disable-next-line no-unused-vars
    value: function createLeafletElement(props) {
      throw new Error('createLeafletElement() must be implemented');
    }

    // eslint-disable-next-line no-unused-vars

  }, {
    key: 'updateLeafletElement',
    value: function updateLeafletElement(fromProps, toProps) {}
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      _get(MapLayer.prototype.__proto__ || Object.getPrototypeOf(MapLayer.prototype), 'componentWillMount', this).call(this);
      this.leafletElement = this.createLeafletElement(this.props);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _get(MapLayer.prototype.__proto__ || Object.getPrototypeOf(MapLayer.prototype), 'componentDidMount', this).call(this);
      this.layerContainer.addLayer(this.leafletElement);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      this.updateLeafletElement(prevProps, this.props);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _get(MapLayer.prototype.__proto__ || Object.getPrototypeOf(MapLayer.prototype), 'componentWillUnmount', this).call(this);
      this.layerContainer.removeLayer(this.leafletElement);
    }
  }, {
    key: 'render',
    value: function render() {
      return Array.isArray(this.props.children) ? _react2.default.createElement(
        'div',
        { style: { display: 'none' } },
        this.props.children
      ) : this.props.children || null;
    }
  }, {
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
  pane: _propTypes2.default.string
};
exports.default = MapLayer;