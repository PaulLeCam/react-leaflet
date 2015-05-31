'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _leaflet = require('leaflet');

var _typesLatlng = require('./types/latlng');

var _typesLatlng2 = _interopRequireDefault(_typesLatlng);

var _MapComponent2 = require('./MapComponent');

var _MapComponent3 = _interopRequireDefault(_MapComponent2);

var Popup = (function (_MapComponent) {
  function Popup() {
    _classCallCheck(this, Popup);

    if (_MapComponent != null) {
      _MapComponent.apply(this, arguments);
    }
  }

  _inherits(Popup, _MapComponent);

  _createClass(Popup, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      _get(Object.getPrototypeOf(Popup.prototype), 'componentWillMount', this).call(this);
      var _props = this.props;
      var children = _props.children;
      var map = _props.map;

      var props = _objectWithoutProperties(_props, ['children', 'map']);

      this.leafletElement = (0, _leaflet.popup)(props);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _props2 = this.props;
      var children = _props2.children;
      var map = _props2.map;
      var popupContainer = _props2.popupContainer;
      var position = _props2.position;

      var props = _objectWithoutProperties(_props2, ['children', 'map', 'popupContainer', 'position']);

      if (children !== prevProps.children) {
        var content = _react2['default'].renderToStaticMarkup(children);
        if (popupContainer) {
          popupContainer.bindPopup(content, props);
        } else {
          var el = this.leafletElement;
          el.setContent(content);
          if (position !== prevProps.position) el.setLatLng(position);
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _get(Object.getPrototypeOf(Popup.prototype), 'componentWillUnmount', this).call(this);
      this.props.map.removeLayer(this.leafletElement);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var children = _props3.children;
      var map = _props3.map;
      var popupContainer = _props3.popupContainer;
      var position = _props3.position;

      var props = _objectWithoutProperties(_props3, ['children', 'map', 'popupContainer', 'position']);

      if (children) {
        var content = _react2['default'].renderToStaticMarkup(children);
        // Attach to container component
        if (popupContainer) {
          popupContainer.bindPopup(content, props);
          return null;
        }
        // Attach to a Map
        var el = this.leafletElement;
        el.setContent(content);
        if (position) el.setLatLng(position);
        el.openOn(map);
      }
      return null;
    }
  }], [{
    key: 'propTypes',
    value: {
      position: _typesLatlng2['default']
    },
    enumerable: true
  }]);

  return Popup;
})(_MapComponent3['default']);

exports['default'] = Popup;
module.exports = exports['default'];