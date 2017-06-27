'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

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

var MapLayer = function (_MapComponent) {
  (0, _inherits3.default)(MapLayer, _MapComponent);

  function MapLayer() {
    (0, _classCallCheck3.default)(this, MapLayer);
    return (0, _possibleConstructorReturn3.default)(this, (MapLayer.__proto__ || (0, _getPrototypeOf2.default)(MapLayer)).apply(this, arguments));
  }

  (0, _createClass3.default)(MapLayer, [{
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
      (0, _get3.default)(MapLayer.prototype.__proto__ || (0, _getPrototypeOf2.default)(MapLayer.prototype), 'componentWillMount', this).call(this);
      this.leafletElement = this.createLeafletElement(this.props);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      (0, _get3.default)(MapLayer.prototype.__proto__ || (0, _getPrototypeOf2.default)(MapLayer.prototype), 'componentDidMount', this).call(this);
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
      (0, _get3.default)(MapLayer.prototype.__proto__ || (0, _getPrototypeOf2.default)(MapLayer.prototype), 'componentWillUnmount', this).call(this);
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