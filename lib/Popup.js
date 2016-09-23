'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _leaflet = require('leaflet');

var _react = require('react');

var _reactDom = require('react-dom');

var _latlng = require('./types/latlng');

var _latlng2 = _interopRequireDefault(_latlng);

var _map = require('./types/map');

var _map2 = _interopRequireDefault(_map);

var _MapComponent2 = require('./MapComponent');

var _MapComponent3 = _interopRequireDefault(_MapComponent2);

var _pane = require('./types/pane');

var _pane2 = _interopRequireDefault(_pane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Popup = function (_MapComponent) {
  _inherits(Popup, _MapComponent);

  function Popup() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Popup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Popup.__proto__ || Object.getPrototypeOf(Popup)).call.apply(_ref, [this].concat(args))), _this), _this.onPopupOpen = function (_ref2) {
      var popup = _ref2.popup;

      if (popup === _this.leafletElement) {
        _this.renderPopupContent();
      }
    }, _this.onPopupClose = function (_ref3) {
      var popup = _ref3.popup;

      if (popup === _this.leafletElement) {
        _this.removePopupContent();
      }
    }, _this.renderPopupContent = function () {
      if (_this.props.children) {
        (0, _reactDom.render)(_react.Children.only(_this.props.children), _this.leafletElement._contentNode);
        _this.leafletElement.update();
      } else {
        _this.removePopupContent();
      }
    }, _this.removePopupContent = function () {
      if (_this.leafletElement._contentNode) {
        (0, _reactDom.unmountComponentAtNode)(_this.leafletElement._contentNode);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Popup, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      _get(Popup.prototype.__proto__ || Object.getPrototypeOf(Popup.prototype), 'componentWillMount', this).call(this);
      var _props = this.props;
      var _children = _props.children;

      var props = _objectWithoutProperties(_props, ['children']);

      this.leafletElement = (0, _leaflet.popup)(this.getInstanceOptions(props), this.context.popupContainer);

      this.context.map.on({
        popupopen: this.onPopupOpen,
        popupclose: this.onPopupClose
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var position = this.props.position;
      var _context = this.context;
      var map = _context.map;
      var popupContainer = _context.popupContainer;

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
      this.context.map.off({
        popupopen: this.onPopupOpen,
        popupclose: this.onPopupClose
      });
      this.context.map.removeLayer(this.leafletElement);
      _get(Popup.prototype.__proto__ || Object.getPrototypeOf(Popup.prototype), 'componentWillUnmount', this).call(this);
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
  position: _latlng2.default
};
Popup.contextTypes = {
  map: _map2.default,
  popupContainer: _react.PropTypes.object,
  pane: _pane2.default
};
exports.default = Popup;