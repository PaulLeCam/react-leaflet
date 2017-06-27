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

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _controlPosition = require('./propTypes/controlPosition');

var _controlPosition2 = _interopRequireDefault(_controlPosition);

var _map = require('./propTypes/map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MapControl = function (_Component) {
  (0, _inherits3.default)(MapControl, _Component);

  function MapControl() {
    (0, _classCallCheck3.default)(this, MapControl);
    return (0, _possibleConstructorReturn3.default)(this, (MapControl.__proto__ || (0, _getPrototypeOf2.default)(MapControl)).apply(this, arguments));
  }

  (0, _createClass3.default)(MapControl, [{
    key: 'createLeafletElement',


    // eslint-disable-next-line no-unused-vars
    value: function createLeafletElement(props) {
      throw new Error('createLeafletElement() must be implemented');
    }
  }, {
    key: 'updateLeafletElement',
    value: function updateLeafletElement(fromProps, toProps) {
      if (toProps.position !== fromProps.position) {
        this.leafletElement.setPosition(toProps.position);
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.leafletElement = this.createLeafletElement(this.props);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.leafletElement.addTo(this.context.map);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      this.updateLeafletElement(prevProps, this.props);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.leafletElement.remove();
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return MapControl;
}(_react.Component);

MapControl.propTypes = {
  position: _controlPosition2.default
};
MapControl.contextTypes = {
  map: _map2.default
};
exports.default = MapControl;