'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var baseControlledLayerPropTypes = {
  checked: _propTypes2.default.bool,
  children: _propTypes2.default.node.isRequired,
  removeLayer: _propTypes2.default.func,
  removeLayerControl: _propTypes2.default.func
};

var controlledLayerPropTypes = (0, _extends3.default)({}, baseControlledLayerPropTypes, {
  addBaseLayer: _propTypes2.default.func,
  addOverlay: _propTypes2.default.func,
  name: _propTypes2.default.string.isRequired

  // Abtract class for layer container, extended by BaseLayer and Overlay
});
var ControlledLayer = function (_Component) {
  (0, _inherits3.default)(ControlledLayer, _Component);

  function ControlledLayer() {
    (0, _classCallCheck3.default)(this, ControlledLayer);
    return (0, _possibleConstructorReturn3.default)(this, (ControlledLayer.__proto__ || (0, _getPrototypeOf2.default)(ControlledLayer)).apply(this, arguments));
  }

  (0, _createClass3.default)(ControlledLayer, [{
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
  (0, _inherits3.default)(BaseLayer, _ControlledLayer);

  function BaseLayer() {
    (0, _classCallCheck3.default)(this, BaseLayer);
    return (0, _possibleConstructorReturn3.default)(this, (BaseLayer.__proto__ || (0, _getPrototypeOf2.default)(BaseLayer)).apply(this, arguments));
  }

  (0, _createClass3.default)(BaseLayer, [{
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
  (0, _inherits3.default)(Overlay, _ControlledLayer2);

  function Overlay() {
    (0, _classCallCheck3.default)(this, Overlay);
    return (0, _possibleConstructorReturn3.default)(this, (Overlay.__proto__ || (0, _getPrototypeOf2.default)(Overlay)).apply(this, arguments));
  }

  (0, _createClass3.default)(Overlay, [{
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
  (0, _inherits3.default)(LayersControl, _MapControl);

  function LayersControl() {
    (0, _classCallCheck3.default)(this, LayersControl);
    return (0, _possibleConstructorReturn3.default)(this, (LayersControl.__proto__ || (0, _getPrototypeOf2.default)(LayersControl)).apply(this, arguments));
  }

  (0, _createClass3.default)(LayersControl, [{
    key: 'createLeafletElement',
    value: function createLeafletElement(props) {
      var _children = props.children,
          options = (0, _objectWithoutProperties3.default)(props, ['children']);

      return _leaflet.control.layers(undefined, undefined, options);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      (0, _get3.default)(LayersControl.prototype.__proto__ || (0, _getPrototypeOf2.default)(LayersControl.prototype), 'componentWillMount', this).call(this);
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
        (0, _get3.default)(LayersControl.prototype.__proto__ || (0, _getPrototypeOf2.default)(LayersControl.prototype), 'componentWillUnmount', _this5).call(_this5);
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