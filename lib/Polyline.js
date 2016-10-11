'use strict';

exports.__esModule = true;

var _leaflet = require('leaflet');

var _latlngList = require('./types/latlngList');

var _latlngList2 = _interopRequireDefault(_latlngList);

var _Path2 = require('./Path');

var _Path3 = _interopRequireDefault(_Path2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Polyline = function (_Path) {
  _inherits(Polyline, _Path);

  function Polyline() {
    _classCallCheck(this, Polyline);

    return _possibleConstructorReturn(this, _Path.apply(this, arguments));
  }

  Polyline.prototype.componentWillMount = function componentWillMount() {
    _Path.prototype.componentWillMount.call(this);
    var _props = this.props;
    var positions = _props.positions;

    var props = _objectWithoutProperties(_props, ['positions']);

    this.leafletElement = (0, _leaflet.polyline)(positions, props);
  };

  Polyline.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.props.positions !== prevProps.positions) {
      this.leafletElement.setLatLngs(this.props.positions);
    }
    this.setStyleIfChanged(prevProps, this.props);
  };

  return Polyline;
}(_Path3.default);

Polyline.propTypes = {
  positions: _latlngList2.default.isRequired
};
exports.default = Polyline;