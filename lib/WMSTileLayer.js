'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _leaflet = require('leaflet');

var _react = require('react');

var _BaseTileLayer2 = require('./BaseTileLayer');

var _BaseTileLayer3 = _interopRequireDefault(_BaseTileLayer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WMSTileLayer = function (_BaseTileLayer) {
  _inherits(WMSTileLayer, _BaseTileLayer);

  function WMSTileLayer() {
    _classCallCheck(this, WMSTileLayer);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(WMSTileLayer).apply(this, arguments));
  }

  _createClass(WMSTileLayer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      _get(Object.getPrototypeOf(WMSTileLayer.prototype), 'componentWillMount', this).call(this);
      var _props = this.props;
      var url = _props.url;

      var props = _objectWithoutProperties(_props, ['url']);

      this.leafletElement = _leaflet.tileLayer.wms(url, props);
    }
  }]);

  return WMSTileLayer;
}(_BaseTileLayer3.default);

WMSTileLayer.propTypes = {
  url: _react.PropTypes.string.isRequired
};
exports.default = WMSTileLayer;