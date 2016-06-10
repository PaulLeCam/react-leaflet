'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _leaflet = require('leaflet');

var _react = require('react');

var _latlng = require('./types/latlng');

var _latlng2 = _interopRequireDefault(_latlng);

var _MapLayer2 = require('./MapLayer');

var _MapLayer3 = _interopRequireDefault(_MapLayer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Marker = function (_MapLayer) {
  _inherits(Marker, _MapLayer);

  function Marker() {
    _classCallCheck(this, Marker);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Marker).apply(this, arguments));
  }

  _createClass(Marker, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        popupContainer: this.leafletElement
      };
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      _get(Object.getPrototypeOf(Marker.prototype), 'componentWillMount', this).call(this);
      var _props = this.props;
      var position = _props.position;

      var props = _objectWithoutProperties(_props, ['position']);

      this.leafletElement = (0, _leaflet.marker)(position, props);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.position !== prevProps.position) {
        this.leafletElement.setLatLng(this.props.position);
      }
      if (this.props.icon !== prevProps.icon) {
        this.leafletElement.setIcon(this.props.icon);
      }
      if (this.props.zIndexOffset !== prevProps.zIndexOffset) {
        this.leafletElement.setZIndexOffset(this.props.zIndexOffset);
      }
      if (this.props.opacity !== prevProps.opacity) {
        this.leafletElement.setOpacity(this.props.opacity);
      }
      if (this.props.draggable !== prevProps.draggable) {
        if (this.props.draggable) {
          this.leafletElement.dragging.enable();
        } else {
          this.leafletElement.dragging.disable();
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children || null;
    }
  }]);

  return Marker;
}(_MapLayer3.default);

Marker.propTypes = {
  icon: _react.PropTypes.instanceOf(_leaflet.Icon),
  opacity: _react.PropTypes.number,
  position: _latlng2.default.isRequired,
  zIndexOffset: _react.PropTypes.number
};
Marker.childContextTypes = {
  popupContainer: _react.PropTypes.object
};
exports.default = Marker;