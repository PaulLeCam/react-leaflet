'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _leaflet = require('leaflet');

var _lodash = require('lodash');

var _react = require('react');

var _children = require('./types/children');

var _children2 = _interopRequireDefault(_children);

var _GridLayer2 = require('./GridLayer');

var _GridLayer3 = _interopRequireDefault(_GridLayer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WMSTileLayer = function (_GridLayer) {
  _inherits(WMSTileLayer, _GridLayer);

  function WMSTileLayer() {
    _classCallCheck(this, WMSTileLayer);

    return _possibleConstructorReturn(this, (WMSTileLayer.__proto__ || Object.getPrototypeOf(WMSTileLayer)).apply(this, arguments));
  }

  _createClass(WMSTileLayer, [{
    key: 'createLeafletElement',
    value: function createLeafletElement(props) {
      var url = props.url,
          options = _objectWithoutProperties(props, ['url']);

      return _leaflet.tileLayer.wms(url, this.getOptions(options));
    }
  }, {
    key: 'updateLeafletElement',
    value: function updateLeafletElement(fromProps, toProps) {
      var prevUrl = fromProps.url,
          _po = fromProps.opacity,
          _pz = fromProps.zIndex,
          prevParams = _objectWithoutProperties(fromProps, ['url', 'opacity', 'zIndex']);

      var url = toProps.url,
          _o = toProps.opacity,
          _z = toProps.zIndex,
          params = _objectWithoutProperties(toProps, ['url', 'opacity', 'zIndex']);

      if (url !== prevUrl) {
        this.leafletElement.setUrl(url);
      }
      if (!(0, _lodash.isEqual)(params, prevParams)) {
        this.leafletElement.setParams(params);
      }
    }
  }]);

  return WMSTileLayer;
}(_GridLayer3.default);

WMSTileLayer.propTypes = {
  children: _children2.default,
  opacity: _react.PropTypes.number,
  url: _react.PropTypes.string.isRequired,
  zIndex: _react.PropTypes.number
};
exports.default = WMSTileLayer;