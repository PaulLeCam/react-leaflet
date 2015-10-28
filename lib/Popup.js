'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _reactDom = require('react-dom');

var _leaflet = require('leaflet');

var _typesLatlng = require('./types/latlng');

var _typesLatlng2 = _interopRequireDefault(_typesLatlng);

var _MapComponent2 = require('./MapComponent');

var _MapComponent3 = _interopRequireDefault(_MapComponent2);

var Popup = (function (_MapComponent) {
  _inherits(Popup, _MapComponent);

  function Popup() {
    _classCallCheck(this, Popup);

    _get(Object.getPrototypeOf(Popup.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Popup, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      _get(Object.getPrototypeOf(Popup.prototype), 'componentWillMount', this).call(this);
      var _props = this.props;
      var children = _props.children;
      var map = _props.map;

      var props = _objectWithoutProperties(_props, ['children', 'map']);

      this.leafletElement = (0, _leaflet.popup)(props);
      this.leafletElement.on('open', this.renderPopupContent.bind(this));
      this.leafletElement.on('close', this.removePopupContent.bind(this));
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

      if (this.leafletElement._isOpen) {
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
  }], [{
    key: 'propTypes',
    value: {
      children: _react.PropTypes.node,
      map: _react.PropTypes.instanceOf(_leaflet.Map),
      popupContainer: _react.PropTypes.object,
      position: _typesLatlng2['default']
    },
    enumerable: true
  }]);

  return Popup;
})(_MapComponent3['default']);

exports['default'] = Popup;
module.exports = exports['default'];