'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _lodashLangIsUndefined = require('lodash/lang/isUndefined');

var _lodashLangIsUndefined2 = _interopRequireDefault(_lodashLangIsUndefined);

var _react = require('react');

var _leaflet = require('leaflet');

var _leaflet2 = _interopRequireDefault(_leaflet);

var _typesBounds = require('./types/bounds');

var _typesBounds2 = _interopRequireDefault(_typesBounds);

var _Map = require('./Map');

var _Map2 = _interopRequireDefault(_Map);

var BoundsMap = (function (_CenterZoomMap) {
  _inherits(BoundsMap, _CenterZoomMap);

  function BoundsMap() {
    _classCallCheck(this, BoundsMap);

    _get(Object.getPrototypeOf(BoundsMap.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(BoundsMap, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _get(Object.getPrototypeOf(BoundsMap.prototype), 'componentDidMount', this).call(this);
      if (!(0, _lodashLangIsUndefined2['default'])(this.props.bounds)) {
        this.leafletElement.fitBounds(this.props.bounds);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(_ref) {
      var oldBounds = _ref.bounds;
      var bounds = this.props.bounds;

      if (!(0, _lodashLangIsUndefined2['default'])(bounds) && this.shouldUpdateBounds(bounds, oldBounds)) {
        this.leafletElement.fitBounds(bounds);
      }
    }
  }, {
    key: 'shouldUpdateBounds',
    value: function shouldUpdateBounds(next, prev) {
      if (!prev) {
        return true;
      }
      var nextLLB = _leaflet2['default'].latLngBounds(next);
      var prevLLB = _leaflet2['default'].latLngBounds(prev);
      return !nextLLB.equals(prevLLB);
    }
  }], [{
    key: 'propTypes',
    value: {
      bounds: _typesBounds2['default'],
      children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.node), _react.PropTypes.node]),
      className: _react.PropTypes.string,
      id: _react.PropTypes.string,
      maxBounds: _typesBounds2['default'],
      maxZoom: _react.PropTypes.number,
      minZoom: _react.PropTypes.number,
      style: _react.PropTypes.object
    },
    enumerable: true
  }]);

  return BoundsMap;
})(_Map2['default']);

exports['default'] = BoundsMap;
module.exports = exports['default'];