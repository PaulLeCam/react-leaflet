'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _reduce2 = require('lodash/reduce');

var _reduce3 = _interopRequireDefault(_reduce2);

var _keys2 = require('lodash/keys');

var _keys3 = _interopRequireDefault(_keys2);

var _forEach2 = require('lodash/forEach');

var _forEach3 = _interopRequireDefault(_forEach2);

var _clone2 = require('lodash/clone');

var _clone3 = _interopRequireDefault(_clone2);

var _react = require('react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EVENTS_RE = /^on(.+)$/i;

var MapComponent = function (_Component) {
  (0, _inherits3.default)(MapComponent, _Component);

  function MapComponent(props, context) {
    (0, _classCallCheck3.default)(this, MapComponent);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MapComponent.__proto__ || (0, _getPrototypeOf2.default)(MapComponent)).call(this, props, context));

    _this._leafletEvents = {};
    return _this;
  }

  (0, _createClass3.default)(MapComponent, [{
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
      return pane ? (0, _extends3.default)({}, props, { pane: pane }) : props;
    }
  }]);
  return MapComponent;
}(_react.Component);

exports.default = MapComponent;