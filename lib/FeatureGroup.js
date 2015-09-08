'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _leaflet = require('leaflet');

var _Path2 = require('./Path');

var _Path3 = _interopRequireDefault(_Path2);

var FeatureGroup = (function (_Path) {
  _inherits(FeatureGroup, _Path);

  function FeatureGroup() {
    _classCallCheck(this, FeatureGroup);

    _get(Object.getPrototypeOf(FeatureGroup.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(FeatureGroup, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props;
      var layers = _props.layers;
      var map = _props.map;

      var props = _objectWithoutProperties(_props, ['layers', 'map']);

      this.leafletElement = (0, _leaflet.featureGroup)(layers);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      this.setStyleIfChanged(prevProps, this.props);
    }
  }], [{
    key: 'propTypes',
    value: {
      layers: _react.PropTypes.array.isRequired
    },
    enumerable: true
  }]);

  return FeatureGroup;
})(_Path3['default']);

exports['default'] = FeatureGroup;
module.exports = exports['default'];