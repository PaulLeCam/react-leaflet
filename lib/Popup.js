'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _leaflet = require('leaflet');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _reactDom = require('react-dom');

var _latlng = require('./propTypes/latlng');

var _latlng2 = _interopRequireDefault(_latlng);

var _map = require('./propTypes/map');

var _map2 = _interopRequireDefault(_map);

var _MapComponent2 = require('./MapComponent');

var _MapComponent3 = _interopRequireDefault(_MapComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Popup = function (_MapComponent) {
  (0, _inherits3.default)(Popup, _MapComponent);

  function Popup() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Popup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Popup.__proto__ || (0, _getPrototypeOf2.default)(Popup)).call.apply(_ref, [this].concat(args))), _this), _this.onPopupOpen = function (_ref2) {
      var popup = _ref2.popup;

      if (popup === _this.leafletElement) {
        _this.renderPopupContent();
        if (_this.props.onOpen) {
          _this.props.onOpen();
        }
      }
    }, _this.onPopupClose = function (_ref3) {
      var popup = _ref3.popup;

      if (popup === _this.leafletElement) {
        _this.removePopupContent();
        if (_this.props.onClose) {
          _this.props.onClose();
        }
      }
    }, _this.renderPopupContent = function () {
      if (_this.props.children) {
        (0, _reactDom.render)(_react.Children.only(_this.props.children), _this.leafletElement._contentNode);
        _this.leafletElement.update();
        if (_this.props.autoPan !== false) {
          if (_this.leafletElement._map && _this.leafletElement._map._panAnim) {
            _this.leafletElement._map._panAnim = undefined;
          }
          _this.leafletElement._adjustPan();
        }
      } else {
        _this.removePopupContent();
      }
    }, _this.removePopupContent = function () {
      if (_this.leafletElement._contentNode) {
        (0, _reactDom.unmountComponentAtNode)(_this.leafletElement._contentNode);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Popup, [{
    key: 'getOptions',
    value: function getOptions() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return (0, _extends3.default)({}, (0, _get3.default)(Popup.prototype.__proto__ || (0, _getPrototypeOf2.default)(Popup.prototype), 'getOptions', this).call(this, props), {
        autoPan: false
      });
    }
  }, {
    key: 'createLeafletElement',
    value: function createLeafletElement(props) {
      var _children = props.children,
          options = (0, _objectWithoutProperties3.default)(props, ['children']);

      return (0, _leaflet.popup)(this.getOptions(options), this.context.popupContainer);
    }
  }, {
    key: 'updateLeafletElement',
    value: function updateLeafletElement(fromProps, toProps) {
      if (toProps.position !== fromProps.position) {
        this.leafletElement.setLatLng(toProps.position);
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      (0, _get3.default)(Popup.prototype.__proto__ || (0, _getPrototypeOf2.default)(Popup.prototype), 'componentWillMount', this).call(this);
      this.leafletElement = this.createLeafletElement(this.props);
      this.leafletElement.options.autoPan = this.props.autoPan !== false;

      this.context.map.on({
        popupopen: this.onPopupOpen,
        popupclose: this.onPopupClose
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
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
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      this.updateLeafletElement(prevProps, this.props);

      if (this.leafletElement.isOpen()) {
        this.renderPopupContent();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.removePopupContent();

      this.context.map.off({
        popupopen: this.onPopupOpen,
        popupclose: this.onPopupClose
      });
      this.context.map.removeLayer(this.leafletElement);

      (0, _get3.default)(Popup.prototype.__proto__ || (0, _getPrototypeOf2.default)(Popup.prototype), 'componentWillUnmount', this).call(this);
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
  children: _propTypes2.default.node,
  onClose: _propTypes2.default.func,
  onOpen: _propTypes2.default.func,
  position: _latlng2.default
};
Popup.contextTypes = {
  map: _map2.default,
  popupContainer: _propTypes2.default.object,
  pane: _propTypes2.default.string
};
exports.default = Popup;