'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduce2 = require('lodash/reduce');

var _reduce3 = _interopRequireDefault(_reduce2);

var _keys2 = require('lodash/keys');

var _keys3 = _interopRequireDefault(_keys2);

var _forEach2 = require('lodash/forEach');

var _forEach3 = _interopRequireDefault(_forEach2);

var _clone2 = require('lodash/clone');

var _clone3 = _interopRequireDefault(_clone2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var EVENTS_RE = /^on(.+)$/i;

var MapComponent = function (_Component) {
  _inherits(MapComponent, _Component);

  function MapComponent(props, context) {
    _classCallCheck(this, MapComponent);

    var _this = _possibleConstructorReturn(this, (MapComponent.__proto__ || Object.getPrototypeOf(MapComponent)).call(this, props, context));

    _this._leafletEvents = {};
    return _this;
  }

  _createClass(MapComponent, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._leafletEvents = this.extractLeafletEvents(this.props);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.bindLeafletEvents(this._leafletEvents);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var next = this.extractLeafletEvents(nextProps);
      this._leafletEvents = this.bindLeafletEvents(next, this._leafletEvents);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var el = this.leafletElement;
      if (!el) return;

      (0, _forEach3.default)(this._leafletEvents, function (cb, ev) {
        el.off(ev, cb);
      });
    }
  }, {
    key: 'extractLeafletEvents',
    value: function extractLeafletEvents(props) {
      return (0, _reduce3.default)((0, _keys3.default)(props), function (res, prop) {
        if (EVENTS_RE.test(prop)) {
          var _key = prop.replace(EVENTS_RE, function (match, p) {
            return p.toLowerCase();
          });
          if (props[prop]) {
            res[_key] = props[prop];
          }
        }
        return res;
      }, {});
    }
  }, {
    key: 'bindLeafletEvents',
    value: function bindLeafletEvents() {
      var next = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var prev = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var el = this.leafletElement;
      if (!el || !el.on) return {};

      var diff = (0, _clone3.default)(prev);
      (0, _forEach3.default)(prev, function (cb, ev) {
        if (!next[ev] || cb !== next[ev]) {
          delete diff[ev];
          el.off(ev, cb);
        }
      });

      (0, _forEach3.default)(next, function (cb, ev) {
        if (!prev[ev] || cb !== prev[ev]) {
          diff[ev] = cb;
          el.on(ev, cb);
        }
      });

      return diff;
    }
  }, {
    key: 'fireLeafletEvent',
    value: function fireLeafletEvent(type, data) {
      var el = this.leafletElement;
      if (el) el.fire(type, data);
    }
  }, {
    key: 'getOptions',
    value: function getOptions() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var pane = props.pane || this.context.pane;
      return pane ? _extends({}, props, { pane: pane }) : props;
    }
  }]);

  return MapComponent;
}(_react.Component);

exports.default = MapComponent;