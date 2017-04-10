'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _omit2 = require('lodash/omit');

var _omit3 = _interopRequireDefault(_omit2);

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _leaflet = require('leaflet');

var _leaflet2 = _interopRequireDefault(_leaflet);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bounds = require('./propTypes/bounds');

var _bounds2 = _interopRequireDefault(_bounds);

var _children = require('./propTypes/children');

var _children2 = _interopRequireDefault(_children);

var _latlng = require('./propTypes/latlng');

var _latlng2 = _interopRequireDefault(_latlng);

var _layerContainer = require('./propTypes/layerContainer');

var _layerContainer2 = _interopRequireDefault(_layerContainer);

var _map = require('./propTypes/map');

var _map2 = _interopRequireDefault(_map);

var _MapComponent2 = require('./MapComponent');

var _MapComponent3 = _interopRequireDefault(_MapComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var OTHER_PROPS = ['children', 'className', 'id', 'style', 'useFlyTo'];

var normalizeCenter = function normalizeCenter(pos) {
  return Array.isArray(pos) ? pos : [pos.lat, pos.lon ? pos.lon : pos.lng];
};

var Map = function (_MapComponent) {
  _inherits(Map, _MapComponent);

  function Map(props, context) {
    _classCallCheck(this, Map);

    var _this = _possibleConstructorReturn(this, (Map.__proto__ || Object.getPrototypeOf(Map)).call(this, props, context));

    _this.bindContainer = function (container) {
      _this.container = container;
    };

    _this.className = props.className;
    return _this;
  }

  _createClass(Map, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        layerContainer: this.leafletElement,
        map: this.leafletElement
      };
    }
  }, {
    key: 'createLeafletElement',
    value: function createLeafletElement(props) {
      return _leaflet2.default.map(this.container, props);
    }
  }, {
    key: 'updateLeafletElement',
    value: function updateLeafletElement(fromProps, toProps) {
      var animate = toProps.animate,
          bounds = toProps.bounds,
          boundsOptions = toProps.boundsOptions,
          center = toProps.center,
          className = toProps.className,
          maxBounds = toProps.maxBounds,
          useFlyTo = toProps.useFlyTo,
          zoom = toProps.zoom;


      if (className !== fromProps.className) {
        if (fromProps.className) {
          _leaflet2.default.DomUtil.removeClass(this.container, fromProps.className);
        }
        if (className) {
          _leaflet2.default.DomUtil.addClass(this.container, className);
        }
      }

      if (center && this.shouldUpdateCenter(center, fromProps.center)) {
        if (useFlyTo) {
          this.leafletElement.flyTo(center, zoom, { animate: animate });
        } else {
          this.leafletElement.setView(center, zoom, { animate: animate });
        }
      } else if (zoom && zoom !== fromProps.zoom) {
        this.leafletElement.setZoom(zoom);
      }

      if (maxBounds && this.shouldUpdateBounds(maxBounds, fromProps.maxBounds)) {
        this.leafletElement.setMaxBounds(maxBounds);
      }

      if (bounds && (this.shouldUpdateBounds(bounds, fromProps.bounds) || boundsOptions !== fromProps.boundsOptions)) {
        if (useFlyTo) {
          this.leafletElement.flyToBounds(bounds, boundsOptions);
        } else {
          this.leafletElement.fitBounds(bounds, boundsOptions);
        }
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var props = (0, _omit3.default)(this.props, OTHER_PROPS);
      this.leafletElement = this.createLeafletElement(props);
      if (!(0, _isUndefined3.default)(props.bounds)) {
        this.leafletElement.fitBounds(props.bounds, props.boundsOptions);
      }
      _get(Map.prototype.__proto__ || Object.getPrototypeOf(Map.prototype), 'componentDidMount', this).call(this);
      this.forceUpdate(); // Re-render now that leafletElement is created
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      this.updateLeafletElement(prevProps, this.props);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _get(Map.prototype.__proto__ || Object.getPrototypeOf(Map.prototype), 'componentWillUnmount', this).call(this);
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
      var children = map ? this.props.children : null;

      return _react2.default.createElement(
        'div',
        {
          className: this.className,
          id: this.props.id,
          ref: this.bindContainer,
          style: this.props.style },
        children
      );
    }
  }]);

  return Map;
}(_MapComponent3.default);

Map.propTypes = {
  animate: _propTypes2.default.bool,
  bounds: _bounds2.default,
  boundsOptions: _propTypes2.default.object,
  center: _latlng2.default,
  children: _children2.default,
  className: _propTypes2.default.string,
  id: _propTypes2.default.string,
  maxBounds: _bounds2.default,
  maxZoom: _propTypes2.default.number,
  minZoom: _propTypes2.default.number,
  style: _propTypes2.default.object,
  useFlyTo: _propTypes2.default.bool,
  zoom: _propTypes2.default.number
};
Map.defaultProps = {
  animate: false,
  useFlyTo: false
};
Map.childContextTypes = {
  layerContainer: _layerContainer2.default,
  map: _map2.default
};
exports.default = Map;