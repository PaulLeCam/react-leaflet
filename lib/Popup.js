'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _reactDom = require('react-dom');

var _leaflet = require('leaflet');

var _latlng = require('./types/latlng');

var _latlng2 = _interopRequireDefault(_latlng);

var _MapComponent2 = require('./MapComponent');

var _MapComponent3 = _interopRequireDefault(_MapComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Popup = function (_MapComponent) {
  _inherits(Popup, _MapComponent);

  function Popup() {
    _classCallCheck(this, Popup);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Popup).apply(this, arguments));
  }

  _createClass(Popup, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      _get(Object.getPrototypeOf(Popup.prototype), 'componentWillMount', this).call(this);
      var _props = this.props;
      var _children = _props.children;
      var _map = _props.map;
      var popupContainer = _props.popupContainer;

      var props = _objectWithoutProperties(_props, ['children', 'map', 'popupContainer']);

      this.leafletElement = (0, _leaflet.popup)(props, popupContainer);
      this.leafletElement.on('add', this.renderPopupContent.bind(this));
      this.leafletElement.on('remove', this.removePopupContent.bind(this));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props2 = this.props;
      var map = _props2.map;
      var popupContainer = _props2.popupContainer;
      var position = _props2.position;

      var el = this.leafletElement;

      if (popupContainer) {
        // Attach to container component
        popupContainer.bindPopup(el);
      } else {
        // Attach to a Map
        if (position) {
          el.setLatLng(position);
        }
        el.openOn(map);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var position = this.props.position;


      if (position !== prevProps.position) {
        this.leafletElement.setLatLng(position);
      }

      if (this.leafletElement.isOpen()) {
        this.renderPopupContent();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _get(Object.getPrototypeOf(Popup.prototype), 'componentWillUnmount', this).call(this);
      this.removePopupContent();
      this.props.map.removeLayer(this.leafletElement);
    }
  }, {
    key: 'renderPopupContent',
    value: function renderPopupContent() {
      if (this.props.children) {
        (0, _reactDom.render)(_react.Children.only(this.props.children), this.leafletElement._contentNode);

        this.leafletElement._updateLayout();
        this.leafletElement._updatePosition();
        this.leafletElement._adjustPan();
      } else {
        this.removePopupContent();
      }
    }
  }, {
    key: 'removePopupContent',
    value: function removePopupContent() {
      if (this.leafletElement._contentNode) {
        (0, _reactDom.unmountComponentAtNode)(this.leafletElement._contentNode);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return Popup;
}(_MapComponent3.default);

Popup.propTypes = {
  children: _react.PropTypes.node,
  map: _react.PropTypes.instanceOf(_leaflet.Map),
  popupContainer: _react.PropTypes.object,
  position: _latlng2.default
};
exports.default = Popup;