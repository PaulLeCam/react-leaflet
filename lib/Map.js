'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _omit2 = require('lodash/omit');

var _omit3 = _interopRequireDefault(_omit2);

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

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

var _viewport = require('./propTypes/viewport');

var _viewport2 = _interopRequireDefault(_viewport);

var _MapComponent2 = require('./MapComponent');

var _MapComponent3 = _interopRequireDefault(_MapComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OTHER_PROPS = ['children', 'className', 'id', 'style', 'useFlyTo', 'whenReady'];

var normalizeCenter = function normalizeCenter(pos) {
  return Array.isArray(pos) ? pos : [pos.lat, pos.lon ? pos.lon : pos.lng];
};

var Map = function (_MapComponent) {
  (0, _inherits3.default)(Map, _MapComponent);

  function Map(props, context) {
    (0, _classCallCheck3.default)(this, Map);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Map.__proto__ || (0, _getPrototypeOf2.default)(Map)).call(this, props, context));

    _this.viewport = {
      center: undefined,
      zoom: undefined
    };
    _this._updating = false;

    _this.onViewportChange = function () {
      var center = _this.leafletElement.getCenter();
      _this.viewport = {
        center: center ? [center.lat, center.lng] : undefined,
        zoom: _this.leafletElement.getZoom()
      };
      if (_this.props.onViewportChange && !_this._updating) {
        _this.props.onViewportChange(_this.viewport);
      }
    };

    _this.onViewportChanged = function () {
      if (_this.props.onViewportChanged && !_this._updating) {
        _this.props.onViewportChanged(_this.viewport);
      }
    };

    _this.bindContainer = function (container) {
      _this.container = container;
    };

    _this.className = props.className;
    return _this;
  }

  (0, _createClass3.default)(Map, [{
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
      var viewport = props.viewport,
          options = (0, _objectWithoutProperties3.default)(props, ['viewport']);

      if (viewport) {
        if (viewport.center) {
          options.center = viewport.center;
        }
        if (viewport.zoom) {
          options.zoom = viewport.zoom;
        }
      }
      return _leaflet2.default.map(this.container, options);
    }
  }, {
    key: 'updateLeafletElement',
    value: function updateLeafletElement(fromProps, toProps) {
      this._updating = true;

      var animate = toProps.animate,
          bounds = toProps.bounds,
          boundsOptions = toProps.boundsOptions,
          center = toProps.center,
          className = toProps.className,
          maxBounds = toProps.maxBounds,
          useFlyTo = toProps.useFlyTo,
          viewport = toProps.viewport,
          zoom = toProps.zoom;


      if (className !== fromProps.className) {
        if (fromProps.className) {
          _leaflet2.default.DomUtil.removeClass(this.container, fromProps.className);
        }
        if (className) {
          _leaflet2.default.DomUtil.addClass(this.container, className);
        }
      }

      if (viewport && viewport !== fromProps.viewport) {
        var c = viewport.center ? viewport.center : center;
        var z = viewport.zoom ? viewport.zoom : zoom;
        if (useFlyTo) {
          this.leafletElement.flyTo(c, z, { animate: animate });
        } else {
          this.leafletElement.setView(c, z, { animate: animate });
        }
      } else if (center && this.shouldUpdateCenter(center, fromProps.center)) {
        if (useFlyTo) {
          this.leafletElement.flyTo(center, zoom, { animate: animate });
        } else {
          this.leafletElement.setView(center, zoom, { animate: animate });
        }
      } else if (zoom && zoom !== fromProps.zoom) {
        if (fromProps.zoom) {
          this.leafletElement.setZoom(zoom);
        } else {
          this.leafletElement.setView(center, zoom);
        }
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

      this._updating = false;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var props = (0, _omit3.default)(this.props, OTHER_PROPS);
      this.leafletElement = this.createLeafletElement(props);

      this.leafletElement.on('move', this.onViewportChange);
      this.leafletElement.on('moveend', this.onViewportChanged);

      if (!(0, _isUndefined3.default)(props.bounds)) {
        this.leafletElement.fitBounds(props.bounds, props.boundsOptions);
      }

      if (this.props.whenReady) {
        this.leafletElement.whenReady(this.props.whenReady);
      }

      (0, _get3.default)(Map.prototype.__proto__ || (0, _getPrototypeOf2.default)(Map.prototype), 'componentDidMount', this).call(this);
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
      (0, _get3.default)(Map.prototype.__proto__ || (0, _getPrototypeOf2.default)(Map.prototype), 'componentWillUnmount', this).call(this);
      this.leafletElement.off('move', this.onViewportChange);
      this.leafletElement.off('moveend', this.onViewportChanged);
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
  viewport: _viewport2.default,
  whenReady: _propTypes2.default.func,
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