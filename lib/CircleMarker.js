'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _leaflet = require('leaflet');

var _typesLatlng = require('./types/latlng');

var _typesLatlng2 = _interopRequireDefault(_typesLatlng);

var _PopupContainer2 = require('./PopupContainer');

var _PopupContainer3 = _interopRequireDefault(_PopupContainer2);

var CircleMarker = (function (_PopupContainer) {
  function CircleMarker() {
    _classCallCheck(this, CircleMarker);

    if (_PopupContainer != null) {
      _PopupContainer.apply(this, arguments);
    }
  }

  _inherits(CircleMarker, _PopupContainer);

  _createClass(CircleMarker, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      _get(Object.getPrototypeOf(CircleMarker.prototype), 'componentWillMount', this).call(this);
      var _props = this.props;
      var center = _props.center;
      var map = _props.map;

      var props = _objectWithoutProperties(_props, ['center', 'map']);

      this.leafletElement = (0, _leaflet.circleMarker)(center, props);
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
    }
  }], [{
    key: 'propTypes',
    value: {
      center: _typesLatlng2['default'].isRequired,
      radius: _react.PropTypes.number
    },
    enumerable: true
  }]);

  return CircleMarker;
})(_PopupContainer3['default']);

exports['default'] = CircleMarker;
module.exports = exports['default'];