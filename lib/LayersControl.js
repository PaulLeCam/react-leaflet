'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign2 = require('lodash/assign');

var _assign3 = _interopRequireDefault(_assign2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _leaflet = require('leaflet');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _children2 = require('./types/children');

var _children3 = _interopRequireDefault(_children2);

var _layerContainer = require('./types/layerContainer');

var _layerContainer2 = _interopRequireDefault(_layerContainer);

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
  children: _react.PropTypes.node.isRequired,
  layerContainer: _layerContainer2.default,
  name: _react.PropTypes.string.isRequired,
  removeLayer: _react.PropTypes.func
};

var ControlledLayer = function (_Component) {
  _inherits(ControlledLayer, _Component);

  function ControlledLayer() {
    _classCallCheck(this, ControlledLayer);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ControlledLayer).apply(this, arguments));
  }

  _createClass(ControlledLayer, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.removeLayer(this.layer);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var children = _props.children;
      var layerContainer = _props.layerContainer;

      return (0, _react.cloneElement)(_react.Children.only(children), {
        layerContainer: layerContainer,
        ref: function ref(e) {
          _this2.layer = e.leafletElement;
        }
      });
    }
  }]);

  return ControlledLayer;
}(_react.Component);

ControlledLayer.propTypes = controlledLayerPropTypes;

var BaseLayer = function (_ControlledLayer) {
  _inherits(BaseLayer, _ControlledLayer);

  function BaseLayer() {
    _classCallCheck(this, BaseLayer);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(BaseLayer).apply(this, arguments));
  }

  _createClass(BaseLayer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props2 = this.props;
      var addBaseLayer = _props2.addBaseLayer;
      var name = _props2.name;

      addBaseLayer(this.layer, name);
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
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props3 = this.props;
      var addOverlay = _props3.addOverlay;
      var name = _props3.name;

      addOverlay(this.layer, name);
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
      var _props4 = this.props;
      var baseLayers = _props4.baseLayers;
      var _children = _props4.children;
      var _lc = _props4.layerContainer;
      var _map = _props4.map;
      var overlays = _props4.overlays;

      var options = _objectWithoutProperties(_props4, ['baseLayers', 'children', 'layerContainer', 'map', 'overlays']);

      this.legacy = !!(baseLayers || overlays);

      if (this.legacy) {
        (0, _warning2.default)(false, 'The "baseLayers" and "overlays" properties for "LayersControl" are deprecated and will be removed in the next version. You should use the "LayersControl.BaseLayer" and "LayersControl.Overlay" instead, see the documentation for more information.');
        this.leafletElement = _leaflet.control.layers(baseLayers, overlays, options);
      } else {
        this.leafletElement = _leaflet.control.layers(undefined, undefined, options);
        this.controlProps = {
          addBaseLayer: this.leafletElement.addBaseLayer.bind(this.leafletElement),
          addOverlay: this.leafletElement.addOverlay.bind(this.leafletElement),
          removeLayer: this.leafletElement.removeLayer.bind(this.leafletElement)
        };
      }
    }
  }, {
    key: 'getClonedChildrenWithProps',
    value: function getClonedChildrenWithProps(extra) {
      var _props5 = this.props;
      var children = _props5.children;
      var map = _props5.map;
      var layerContainer = _props5.layerContainer;

      var props = (0, _assign3.default)({ map: map, layerContainer: layerContainer }, extra);

      return _react.Children.map(children, function (child) {
        return child ? (0, _react.cloneElement)(child, props) : null;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.legacy) {
        return null;
      }

      var children = this.getClonedChildrenWithProps(this.controlProps);
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
  layerContainer: _layerContainer2.default,
  map: _react.PropTypes.instanceOf(_leaflet.Map),
  overlays: _react.PropTypes.object
};
exports.default = LayersControl;


LayersControl.BaseLayer = BaseLayer;
LayersControl.Overlay = Overlay;