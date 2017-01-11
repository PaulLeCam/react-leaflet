'use strict';

exports.__esModule = true;

var _omit2 = require('lodash/omit');

var _omit3 = _interopRequireDefault(_omit2);

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

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

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
/* eslint-disable react/no-did-mount-set-state */

var normalizeCenter = function normalizeCenter(pos) {
  return Array.isArray(pos) ? pos : [pos.lat, pos.lon ? pos.lon : pos.lng];
};

var Map = function (_MapComponent) {
  _inherits(Map, _MapComponent);

  function Map(props, context) {
    _classCallCheck(this, Map);

    var _this = _possibleConstructorReturn(this, _MapComponent.call(this, props, context));

    _this.bindContainer = function (container) {
      _this.container = container;
    };

    _this.className = props.className;
    return _this;
  }

  Map.prototype.getChildContext = function getChildContext() {
    return {
      map: this.leafletElement
    };
  };

  Map.prototype.createLeafletElement = function createLeafletElement(props) {
    return _leaflet2.default.map(this.container, props);
  };

  Map.prototype.updateLeafletElement = function updateLeafletElement(fromProps, toProps) {
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
  };

  Map.prototype.componentDidMount = function componentDidMount() {
    var props = (0, _omit3.default)(this.props, ['children', 'className', 'id', 'style']);
    this.leafletElement = this.createLeafletElement(props);
    _MapComponent.prototype.componentDidMount.call(this);
    this.setState({ map: this.leafletElement });
    if (!(0, _isUndefined3.default)(props.bounds)) {
      this.leafletElement.fitBounds(props.bounds, props.boundsOptions);
    }
  };

  Map.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    this.updateLeafletElement(prevProps, this.props);
  };

  Map.prototype.componentWillUnmount = function componentWillUnmount() {
    _MapComponent.prototype.componentWillUnmount.call(this);
    this.leafletElement.remove();
  };

  Map.prototype.shouldUpdateCenter = function shouldUpdateCenter(next, prev) {
    if (!prev) return true;
    next = normalizeCenter(next);
    prev = normalizeCenter(prev);
    return next[0] !== prev[0] || next[1] !== prev[1];
  };

  Map.prototype.shouldUpdateBounds = function shouldUpdateBounds(next, prev) {
    if (!prev) return true;
    next = _leaflet2.default.latLngBounds(next);
    prev = _leaflet2.default.latLngBounds(prev);
    return !next.equals(prev);
  };

  Map.prototype.render = function render() {
    var map = this.leafletElement;
    var children = map ? _react2.default.Children.map(this.props.children, function (child) {
      return child ? _react2.default.cloneElement(child, { map: map, layerContainer: map }) : null;
    }) : null;

    return _react2.default.createElement(
      'div',
      {
        className: this.className,
        id: this.props.id,
        ref: this.bindContainer,
        style: this.props.style },
      children
    );
  };

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
  useFlyTo: _react.PropTypes.bool,
  zoom: _react.PropTypes.number
};
Map.defaultProps = {
  animate: false,
  useFlyTo: false
};
Map.childContextTypes = {
  map: _react.PropTypes.instanceOf(_leaflet2.default.Map)
};
exports.default = Map;