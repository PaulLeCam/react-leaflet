'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _leaflet = require('leaflet');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _children = require('./propTypes/children');

var _children2 = _interopRequireDefault(_children);

var _latlngList = require('./propTypes/latlngList');

var _latlngList2 = _interopRequireDefault(_latlngList);

var _Path2 = require('./Path');

var _Path3 = _interopRequireDefault(_Path2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var multiLatLngListType = _propTypes2.default.arrayOf(_latlngList2.default);

var Polygon = function (_Path) {
  _inherits(Polygon, _Path);

  function Polygon() {
    _classCallCheck(this, Polygon);

    return _possibleConstructorReturn(this, (Polygon.__proto__ || Object.getPrototypeOf(Polygon)).apply(this, arguments));
  }

  _createClass(Polygon, [{
    key: 'createLeafletElement',
    value: function createLeafletElement(props) {
      var positions = props.positions,
          options = _objectWithoutProperties(props, ['positions']);

      return (0, _leaflet.polygon)(positions, this.getOptions(options));
    }
  }, {
    key: 'updateLeafletElement',
    value: function updateLeafletElement(fromProps, toProps) {
      console.log('positions', toProps.positions !== fromProps.positions, fromProps.positions, toProps.positions);
      if (toProps.positions !== fromProps.positions) {
        this.leafletElement.setLatLngs(toProps.positions);
      }
      this.setStyleIfChanged(fromProps, toProps);
    }
  }]);

  return Polygon;
}(_Path3.default);

Polygon.propTypes = {
  children: _children2.default,
  popupContainer: _propTypes2.default.object,
  positions: _propTypes2.default.oneOfType([_latlngList2.default, multiLatLngListType, _propTypes2.default.arrayOf(multiLatLngListType)]).isRequired
};
exports.default = Polygon;