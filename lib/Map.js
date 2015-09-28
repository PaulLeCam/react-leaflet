'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _lodashLangIsArray = require('lodash/lang/isArray');

var _lodashLangIsArray2 = _interopRequireDefault(_lodashLangIsArray);

var _lodashLangIsUndefined = require('lodash/lang/isUndefined');

var _lodashLangIsUndefined2 = _interopRequireDefault(_lodashLangIsUndefined);

var _lodashUtilityUniqueId = require('lodash/utility/uniqueId');

var _lodashUtilityUniqueId2 = _interopRequireDefault(_lodashUtilityUniqueId);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _leaflet = require('leaflet');

var _leaflet2 = _interopRequireDefault(_leaflet);

var _typesBounds = require('./types/bounds');

var _typesBounds2 = _interopRequireDefault(_typesBounds);

var _typesLatlng = require('./types/latlng');

var _typesLatlng2 = _interopRequireDefault(_typesLatlng);

var _MapComponent2 = require('./MapComponent');

var _MapComponent3 = _interopRequireDefault(_MapComponent2);

var normalizeCenter = function normalizeCenter(pos) {
  return (0, _lodashLangIsArray2['default'])(pos) ? pos : [pos.lat, pos.lng || pos.lon];
};

var Map = (function (_MapComponent) {
  _inherits(Map, _MapComponent);

  _createClass(Map, null, [{
    key: 'propTypes',
    value: {
      bounds: _typesBounds2['default'],
      center: _typesLatlng2['default'],
      children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.node), _react.PropTypes.node]),
      className: _react.PropTypes.string,
      id: _react.PropTypes.string,
      maxBounds: _typesBounds2['default'],
      maxZoom: _react.PropTypes.number,
      minZoom: _react.PropTypes.number,
      style: _react.PropTypes.object,
      zoom: _react.PropTypes.number
    },
    enumerable: true
  }]);

  function Map(props) {
    _classCallCheck(this, Map);

    _get(Object.getPrototypeOf(Map.prototype), 'constructor', this).call(this, props);
    this.state = {
      id: props.id || (0, _lodashUtilityUniqueId2['default'])('map')
    };
  }

  _createClass(Map, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.leafletElement = _leaflet2['default'].map(this.state.id, this.props);
      _get(Object.getPrototypeOf(Map.prototype), 'componentDidMount', this).call(this);
      this.setState({ map: this.leafletElement });
      if (!(0, _lodashLangIsUndefined2['default'])(this.props.bounds)) {
        this.leafletElement.fitBounds(this.props.bounds);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _props = this.props;
      var bounds = _props.bounds;
      var center = _props.center;
      var zoom = _props.zoom;

      if (center && this.shouldUpdateCenter(center, prevProps.center)) {
        this.leafletElement.setView(center, zoom, { animate: false });
      } else if (zoom && zoom !== prevProps.zoom) {
        // This branch must be an else if because if the center updates, the zoom
        // will already be updated with it
        this.leafletElement.setZoom(zoom);
      }
      if (bounds && this.shouldUpdateBounds(bounds, prevProps.bounds)) {
        this.leafletElement.fitBounds(bounds);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _get(Object.getPrototypeOf(Map.prototype), 'componentWillUnmount', this).call(this);
      this.leafletElement.remove();
    }
  }, {
    key: 'shouldUpdateCenter',
    value: function shouldUpdateCenter(next, prev) {
      if (!prev) return true;
      next = normalizeCenter(next);
      prev = normalizeCenter(prev);
      return next[0] !== prev[0] || next[1] !== prev[1];
    }
  }, {
    key: 'shouldUpdateBounds',
    value: function shouldUpdateBounds(next, prev) {
      if (!prev) return true;
      next = _leaflet2['default'].latLngBounds(next);
      prev = _leaflet2['default'].latLngBounds(prev);
      return !next.equals(prev);
    }
  }, {
    key: 'render',
    value: function render() {
      var map = this.leafletElement;
      var children = map ? _react2['default'].Children.map(this.props.children, function (child) {
        return child ? _react2['default'].cloneElement(child, { map: map }) : null;
      }) : null;

      return _react2['default'].createElement(
        'div',
        {
          className: this.props.className,
          id: this.state.id,
          style: this.props.style },
        children
      );
    }
  }]);

  return Map;
})(_MapComponent3['default']);

exports['default'] = Map;
module.exports = exports['default'];