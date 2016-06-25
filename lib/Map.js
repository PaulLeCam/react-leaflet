'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _uniqueId2 = require('lodash/uniqueId');

var _uniqueId3 = _interopRequireDefault(_uniqueId2);

var _omit2 = require('lodash/omit');

var _omit3 = _interopRequireDefault(_omit2);

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _leaflet = require('leaflet');

var _leaflet2 = _interopRequireDefault(_leaflet);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bounds = require('./types/bounds');

var _bounds2 = _interopRequireDefault(_bounds);

var _children = require('./types/children');

var _children2 = _interopRequireDefault(_children);

var _latlng = require('./types/latlng');

var _latlng2 = _interopRequireDefault(_latlng);

var _MapComponent2 = require('./MapComponent');

var _MapComponent3 = _interopRequireDefault(_MapComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/* eslint-disable react/no-did-mount-set-state */

var normalizeCenter = function normalizeCenter(pos) {
  return Array.isArray(pos) ? pos : [pos.lat, pos.lon ? pos.lon : pos.lng];
};

var Map = function (_MapComponent) {
  _inherits(Map, _MapComponent);

  _createClass(Map, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        map: this.leafletElement
      };
    }
  }]);

  function Map(props, context) {
    _classCallCheck(this, Map);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Map).call(this, props, context));

    _this.state = {
      id: props.id || (0, _uniqueId3.default)('map')
    };
    return _this;
  }

  _createClass(Map, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var props = (0, _omit3.default)(this.props, ['children', 'className', 'id', 'style']);
      this.leafletElement = _leaflet2.default.map(this.state.id, props);
      _get(Object.getPrototypeOf(Map.prototype), 'componentDidMount', this).call(this);
      this.setState({ map: this.leafletElement });
      if (!(0, _isUndefined3.default)(props.bounds)) {
        this.leafletElement.fitBounds(props.bounds, props.boundsOptions);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _props = this.props;
      var bounds = _props.bounds;
      var boundsOptions = _props.boundsOptions;
      var center = _props.center;
      var maxBounds = _props.maxBounds;
      var zoom = _props.zoom;
      var animate = _props.animate;

      if (center && this.shouldUpdateCenter(center, prevProps.center)) {
        this.leafletElement.setView(center, zoom, { animate: animate });
      } else if (zoom && zoom !== prevProps.zoom) {
        this.leafletElement.setZoom(zoom);
      }
      if (maxBounds && this.shouldUpdateBounds(maxBounds, prevProps.maxBounds)) {
        this.leafletElement.setMaxBounds(maxBounds);
      }
      if (bounds && (this.shouldUpdateBounds(bounds, prevProps.bounds) || boundsOptions !== prevProps.boundsOptions)) {
        this.leafletElement.fitBounds(bounds, boundsOptions);
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
      next = _leaflet2.default.latLngBounds(next);
      prev = _leaflet2.default.latLngBounds(prev);
      return !next.equals(prev);
    }
  }, {
    key: 'render',
    value: function render() {
      var map = this.leafletElement;
      var children = map ? _react2.default.Children.map(this.props.children, function (child) {
        return child ? _react2.default.cloneElement(child, { map: map, layerContainer: map }) : null;
      }) : null;

      return _react2.default.createElement(
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
}(_MapComponent3.default);

Map.propTypes = {
  animate: _react.PropTypes.bool,
  bounds: _bounds2.default,
  boundsOptions: _react.PropTypes.object,
  center: _latlng2.default,
  children: _children2.default,
  className: _react.PropTypes.string,
  id: _react.PropTypes.string,
  maxBounds: _bounds2.default,
  maxZoom: _react.PropTypes.number,
  minZoom: _react.PropTypes.number,
  style: _react.PropTypes.object,
  zoom: _react.PropTypes.number
};
Map.defaultProps = {
  animate: false
};
Map.childContextTypes = {
  map: _react.PropTypes.instanceOf(_leaflet2.default.Map)
};
exports.default = Map;