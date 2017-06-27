'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _leaflet = require('leaflet');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _children = require('./propTypes/children');

var _children2 = _interopRequireDefault(_children);

var _latlng = require('./propTypes/latlng');

var _latlng2 = _interopRequireDefault(_latlng);

var _MapLayer2 = require('./MapLayer');

var _MapLayer3 = _interopRequireDefault(_MapLayer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Marker = function (_MapLayer) {
  (0, _inherits3.default)(Marker, _MapLayer);

  function Marker() {
    (0, _classCallCheck3.default)(this, Marker);
    return (0, _possibleConstructorReturn3.default)(this, (Marker.__proto__ || (0, _getPrototypeOf2.default)(Marker)).apply(this, arguments));
  }

  (0, _createClass3.default)(Marker, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        popupContainer: this.leafletElement
      };
    }
  }, {
    key: 'createLeafletElement',
    value: function createLeafletElement(props) {
      var position = props.position,
          options = (0, _objectWithoutProperties3.default)(props, ['position']);

      return (0, _leaflet.marker)(position, this.getOptions(options));
    }
  }, {
    key: 'updateLeafletElement',
    value: function updateLeafletElement(fromProps, toProps) {
      if (toProps.position !== fromProps.position) {
        this.leafletElement.setLatLng(toProps.position);
      }
      if (toProps.icon !== fromProps.icon) {
        this.leafletElement.setIcon(toProps.icon);
      }
      if (toProps.zIndexOffset !== fromProps.zIndexOffset) {
        this.leafletElement.setZIndexOffset(toProps.zIndexOffset);
      }
      if (toProps.opacity !== fromProps.opacity) {
        this.leafletElement.setOpacity(toProps.opacity);
      }
      if (toProps.draggable !== fromProps.draggable) {
        if (toProps.draggable) {
          this.leafletElement.dragging.enable();
        } else {
          this.leafletElement.dragging.disable();
        }
      }
    }
  }]);
  return Marker;
}(_MapLayer3.default);

Marker.propTypes = {
  children: _children2.default,
  icon: _propTypes2.default.instanceOf(_leaflet.Icon),
  opacity: _propTypes2.default.number,
  position: _latlng2.default.isRequired,
  zIndexOffset: _propTypes2.default.number
};
Marker.childContextTypes = {
  popupContainer: _propTypes2.default.object
};
exports.default = Marker;