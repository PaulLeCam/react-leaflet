'use strict';

exports.__esModule = true;

var _leaflet = require('leaflet');

var _react = require('react');

var _reactDom = require('react-dom');

var _latlng = require('./types/latlng');

var _latlng2 = _interopRequireDefault(_latlng);

var _map = require('./types/map');

var _map2 = _interopRequireDefault(_map);

var _MapComponent2 = require('./MapComponent');

var _MapComponent3 = _interopRequireDefault(_MapComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Popup = function (_MapComponent) {
  _inherits(Popup, _MapComponent);

  function Popup() {
    _classCallCheck(this, Popup);

    return _possibleConstructorReturn(this, _MapComponent.apply(this, arguments));
  }

  Popup.prototype.componentWillMount = function componentWillMount() {
    _MapComponent.prototype.componentWillMount.call(this);

    var _props = this.props,
        _children = _props.children,
        props = _objectWithoutProperties(_props, ['children']);

    this.leafletElement = (0, _leaflet.popup)(props, this.context.popupContainer);
    this.leafletElement.on('open', this.renderPopupContent.bind(this));
    this.leafletElement.on('close', this.removePopupContent.bind(this));
  };

  Popup.prototype.componentDidMount = function componentDidMount() {
    var position = this.props.position;
    var _context = this.context,
        map = _context.map,
        popupContainer = _context.popupContainer;

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
  };

  Popup.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    var position = this.props.position;


    if (position !== prevProps.position) {
      this.leafletElement.setLatLng(position);
    }

    if (this.leafletElement._isOpen) {
      this.renderPopupContent();
    }
  };

  Popup.prototype.componentWillUnmount = function componentWillUnmount() {
    _MapComponent.prototype.componentWillUnmount.call(this);
    this.removePopupContent();
    this.context.map.removeLayer(this.leafletElement);
  };

  Popup.prototype.renderPopupContent = function renderPopupContent() {
    if (this.props.children) {
      (0, _reactDom.render)(_react.Children.only(this.props.children), this.leafletElement._contentNode);

      this.leafletElement._updateLayout();
      this.leafletElement._updatePosition();
      this.leafletElement._adjustPan();
    } else {
      this.removePopupContent();
    }
  };

  Popup.prototype.removePopupContent = function removePopupContent() {
    if (this.leafletElement._contentNode) {
      (0, _reactDom.unmountComponentAtNode)(this.leafletElement._contentNode);
    }
  };

  Popup.prototype.render = function render() {
    return null;
  };

  return Popup;
}(_MapComponent3.default);

Popup.propTypes = {
  children: _react.PropTypes.node,
  position: _latlng2.default
};
Popup.contextTypes = {
  map: _map2.default,
  popupContainer: _react.PropTypes.object
};
exports.default = Popup;