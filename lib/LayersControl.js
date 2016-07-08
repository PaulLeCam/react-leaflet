'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _leaflet = require('leaflet');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _children2 = require('./types/children');

var _children3 = _interopRequireDefault(_children2);

var _layerContainer = require('./types/layerContainer');

var _layerContainer2 = _interopRequireDefault(_layerContainer);

var _map = require('./types/map');

var _map2 = _interopRequireDefault(_map);

var _MapControl2 = require('./MapControl');

var _MapControl3 = _interopRequireDefault(_MapControl2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var controlledLayerPropTypes = {
  addBaseLayer: _react.PropTypes.func,
  addOverlay: _react.PropTypes.func,
  checked: _react.PropTypes.bool,
  children: _react.PropTypes.node.isRequired,
  name: _react.PropTypes.string.isRequired,
  removeLayer: _react.PropTypes.func,
  removeLayerControl: _react.PropTypes.func
};

// Abtract class for layer container, extended by BaseLayer and Overlay

var ControlledLayer = function (_Component) {
  _inherits(ControlledLayer, _Component);

  function ControlledLayer() {
    _classCallCheck(this, ControlledLayer);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ControlledLayer).apply(this, arguments));
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

ControlledLayer.propTypes = controlledLayerPropTypes;
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

    return _possibleConstructorReturn(this, Object.getPrototypeOf(BaseLayer).apply(this, arguments));
  }

  _createClass(BaseLayer, [{
    key: 'addLayer',
    value: function addLayer(layer) {
      this.layer = layer; // Keep layer reference to handle dynamic changes of props
      var _props = this.props;
      var addBaseLayer = _props.addBaseLayer;
      var checked = _props.checked;
      var name = _props.name;

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

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Overlay).apply(this, arguments));
  }

  _createClass(Overlay, [{
    key: 'addLayer',
    value: function addLayer(layer) {
      this.layer = layer; // Keep layer reference to handle dynamic changes of props
      var _props2 = this.props;
      var addOverlay = _props2.addOverlay;
      var checked = _props2.checked;
      var name = _props2.name;

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

    return _possibleConstructorReturn(this, Object.getPrototypeOf(LayersControl).apply(this, arguments));
  }

  _createClass(LayersControl, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props3 = this.props;
      var _children = _props3.children;

      var options = _objectWithoutProperties(_props3, ['children']);

      this.leafletElement = _leaflet.control.layers(undefined, undefined, options);
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
        _get(Object.getPrototypeOf(LayersControl.prototype), 'componentWillUnmount', _this5).call(_this5);
      }, 0);
    }
  }, {
    key: 'addBaseLayer',
    value: function addBaseLayer(layer, name) {
      var checked = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

      if (checked) {
        this.context.map.addLayer(layer);
      }
      this.leafletElement.addBaseLayer(layer, name);
    }
  }, {
    key: 'addOverlay',
    value: function addOverlay(layer, name) {
      var checked = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

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
  baseLayers: _react.PropTypes.object,
  children: _children3.default,
  overlays: _react.PropTypes.object
};
LayersControl.contextTypes = {
  layerContainer: _layerContainer2.default,
  map: _map2.default
};
exports.default = LayersControl;


LayersControl.BaseLayer = BaseLayer;
LayersControl.Overlay = Overlay;