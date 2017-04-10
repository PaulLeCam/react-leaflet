'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _leaflet = require('leaflet');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _children2 = require('./propTypes/children');

var _children3 = _interopRequireDefault(_children2);

var _controlPosition = require('./propTypes/controlPosition');

var _controlPosition2 = _interopRequireDefault(_controlPosition);

var _layerContainer = require('./propTypes/layerContainer');

var _layerContainer2 = _interopRequireDefault(_layerContainer);

var _map = require('./propTypes/map');

var _map2 = _interopRequireDefault(_map);

var _MapControl2 = require('./MapControl');

var _MapControl3 = _interopRequireDefault(_MapControl2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var baseControlledLayerPropTypes = {
  checked: _propTypes2.default.bool,
  children: _propTypes2.default.node.isRequired,
  removeLayer: _propTypes2.default.func,
  removeLayerControl: _propTypes2.default.func
};

var controlledLayerPropTypes = _extends({}, baseControlledLayerPropTypes, {
  addBaseLayer: _propTypes2.default.func,
  addOverlay: _propTypes2.default.func,
  name: _propTypes2.default.string.isRequired
});

// Abtract class for layer container, extended by BaseLayer and Overlay

var ControlledLayer = function (_Component) {
  _inherits(ControlledLayer, _Component);

  function ControlledLayer() {
    _classCallCheck(this, ControlledLayer);

    return _possibleConstructorReturn(this, (ControlledLayer.__proto__ || Object.getPrototypeOf(ControlledLayer)).apply(this, arguments));
  }

  _createClass(ControlledLayer, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        layerContainer: {
          addLayer: this.addLayer.bind(this),
          removeLayer: this.removeLayer.bind(this)
        }
      };
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var checked = _ref.checked;

      // Handle dynamically (un)checking the layer => adding/removing from the map
      if (checked && !this.props.checked) {
        this.context.map.addLayer(this.layer);
      } else if (this.props.checked && !checked) {
        this.context.map.removeLayer(this.layer);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.removeLayerControl(this.layer);
    }
  }, {
    key: 'addLayer',
    value: function addLayer() {
      throw new Error('Must be implemented in extending class');
    }
  }, {
    key: 'removeLayer',
    value: function removeLayer(layer) {
      this.props.removeLayer(layer);
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children || null;
    }
  }]);

  return ControlledLayer;
}(_react.Component);

ControlledLayer.propTypes = baseControlledLayerPropTypes;
ControlledLayer.contextTypes = {
  map: _map2.default
};
ControlledLayer.childContextTypes = {
  layerContainer: _layerContainer2.default
};

var BaseLayer = function (_ControlledLayer) {
  _inherits(BaseLayer, _ControlledLayer);

  function BaseLayer() {
    _classCallCheck(this, BaseLayer);

    return _possibleConstructorReturn(this, (BaseLayer.__proto__ || Object.getPrototypeOf(BaseLayer)).apply(this, arguments));
  }

  _createClass(BaseLayer, [{
    key: 'addLayer',
    value: function addLayer(layer) {
      this.layer = layer; // Keep layer reference to handle dynamic changes of props
      var _props = this.props,
          addBaseLayer = _props.addBaseLayer,
          checked = _props.checked,
          name = _props.name;

      addBaseLayer(layer, name, checked);
    }
  }]);

  return BaseLayer;
}(ControlledLayer);

BaseLayer.propTypes = controlledLayerPropTypes;

var Overlay = function (_ControlledLayer2) {
  _inherits(Overlay, _ControlledLayer2);

  function Overlay() {
    _classCallCheck(this, Overlay);

    return _possibleConstructorReturn(this, (Overlay.__proto__ || Object.getPrototypeOf(Overlay)).apply(this, arguments));
  }

  _createClass(Overlay, [{
    key: 'addLayer',
    value: function addLayer(layer) {
      this.layer = layer; // Keep layer reference to handle dynamic changes of props
      var _props2 = this.props,
          addOverlay = _props2.addOverlay,
          checked = _props2.checked,
          name = _props2.name;

      addOverlay(layer, name, checked);
    }
  }]);

  return Overlay;
}(ControlledLayer);

Overlay.propTypes = controlledLayerPropTypes;

var LayersControl = function (_MapControl) {
  _inherits(LayersControl, _MapControl);

  function LayersControl() {
    _classCallCheck(this, LayersControl);

    return _possibleConstructorReturn(this, (LayersControl.__proto__ || Object.getPrototypeOf(LayersControl)).apply(this, arguments));
  }

  _createClass(LayersControl, [{
    key: 'createLeafletElement',
    value: function createLeafletElement(props) {
      var _children = props.children,
          options = _objectWithoutProperties(props, ['children']);

      return _leaflet.control.layers(undefined, undefined, options);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      _get(LayersControl.prototype.__proto__ || Object.getPrototypeOf(LayersControl.prototype), 'componentWillMount', this).call(this);
      this.controlProps = {
        addBaseLayer: this.addBaseLayer.bind(this),
        addOverlay: this.addOverlay.bind(this),
        removeLayer: this.removeLayer.bind(this),
        removeLayerControl: this.removeLayerControl.bind(this)
      };
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this5 = this;

      setTimeout(function () {
        _get(LayersControl.prototype.__proto__ || Object.getPrototypeOf(LayersControl.prototype), 'componentWillUnmount', _this5).call(_this5);
      }, 0);
    }
  }, {
    key: 'addBaseLayer',
    value: function addBaseLayer(layer, name) {
      var checked = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (checked) {
        this.context.map.addLayer(layer);
      }
      this.leafletElement.addBaseLayer(layer, name);
    }
  }, {
    key: 'addOverlay',
    value: function addOverlay(layer, name) {
      var checked = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (checked) {
        this.context.map.addLayer(layer);
      }
      this.leafletElement.addOverlay(layer, name);
    }
  }, {
    key: 'removeLayer',
    value: function removeLayer(layer) {
      this.context.map.removeLayer(layer);
    }
  }, {
    key: 'removeLayerControl',
    value: function removeLayerControl(layer) {
      this.leafletElement.removeLayer(layer);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var children = _react.Children.map(this.props.children, function (child) {
        return child ? (0, _react.cloneElement)(child, _this6.controlProps) : null;
      });
      return _react2.default.createElement(
        'div',
        { style: { display: 'none' } },
        children
      );
    }
  }]);

  return LayersControl;
}(_MapControl3.default);

LayersControl.propTypes = {
  baseLayers: _propTypes2.default.object,
  children: _children3.default,
  overlays: _propTypes2.default.object,
  position: _controlPosition2.default
};
LayersControl.contextTypes = {
  layerContainer: _layerContainer2.default,
  map: _map2.default
};
exports.default = LayersControl;


LayersControl.BaseLayer = BaseLayer;
LayersControl.Overlay = Overlay;