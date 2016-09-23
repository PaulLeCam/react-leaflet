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

var _Path2 = require('./Path');

var _Path3 = _interopRequireDefault(_Path2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CircleMarker = function (_Path) {
  _inherits(CircleMarker, _Path);

  function CircleMarker() {
    _classCallCheck(this, CircleMarker);

    return _possibleConstructorReturn(this, (CircleMarker.__proto__ || Object.getPrototypeOf(CircleMarker)).apply(this, arguments));
  }

  _createClass(CircleMarker, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      _get(CircleMarker.prototype.__proto__ || Object.getPrototypeOf(CircleMarker.prototype), 'componentWillMount', this).call(this);
      var _props = this.props;
      var center = _props.center;

      var props = _objectWithoutProperties(_props, ['center']);

      this.leafletElement = (0, _leaflet.circleMarker)(center, this.getInstanceOptions(props));
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.center !== prevProps.center) {
        this.leafletElement.setLatLng(this.props.center);
      }
      if (this.props.radius !== prevProps.radius) {
        this.leafletElement.setRadius(this.props.radius);
      }
      this.setStyleIfChanged(prevProps, this.props);
    }
  }]);

  return CircleMarker;
}(_Path3.default);

CircleMarker.propTypes = {
  center: _latlng2.default.isRequired,
  radius: _react.PropTypes.number
};
exports.default = CircleMarker;