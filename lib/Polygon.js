'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _leaflet = require('leaflet');

var _latlngList = require('./types/latlngList');

var _latlngList2 = _interopRequireDefault(_latlngList);

var _Path2 = require('./Path');

var _Path3 = _interopRequireDefault(_Path2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Polygon = function (_Path) {
  _inherits(Polygon, _Path);

  function Polygon() {
    _classCallCheck(this, Polygon);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Polygon).apply(this, arguments));
  }

  _createClass(Polygon, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      _get(Object.getPrototypeOf(Polygon.prototype), 'componentWillMount', this).call(this);
      var _props = this.props;
      var _map = _props.map;
      var _lc = _props.layerContainer;
      var positions = _props.positions;

      var props = _objectWithoutProperties(_props, ['map', 'layerContainer', 'positions']);

      this.leafletElement = (0, _leaflet.polygon)(positions, props);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.positions !== prevProps.positions) {
        this.leafletElement.setLatLngs(this.props.positions);
      }
      this.setStyleIfChanged(prevProps, this.props);
    }
  }]);

  return Polygon;
}(_Path3.default);

Polygon.propTypes = {
  positions: _react.PropTypes.oneOfType([_latlngList2.default, _react.PropTypes.arrayOf(_latlngList2.default)]).isRequired
};
exports.default = Polygon;