'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _clone = require('lodash/clone');

var _clone2 = _interopRequireDefault(_clone);

var _forEach = require('lodash/forEach');

var _forEach2 = _interopRequireDefault(_forEach);

var _keys = require('lodash/keys');

var _keys2 = _interopRequireDefault(_keys);

var _reduce = require('lodash/reduce');

var _reduce2 = _interopRequireDefault(_reduce);

var _react = require('react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EVENTS_RE = /on(?:Leaflet)?(.+)/i;

var MapComponent = function (_Component) {
  _inherits(MapComponent, _Component);

  function MapComponent() {
    _classCallCheck(this, MapComponent);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MapComponent).apply(this, arguments));
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

      (0, _forEach2.default)(this._leafletEvents, function (cb, ev) {
        el.off(ev, cb);
      });
    }
  }, {
    key: 'getLeafletElement',
    value: function getLeafletElement() {
      return this.leafletElement;
    }
  }, {
    key: 'extractLeafletEvents',
    value: function extractLeafletEvents(props) {
      return (0, _reduce2.default)((0, _keys2.default)(props), function (res, ev) {
        if (EVENTS_RE.test(ev)) {
          var key = ev.replace(EVENTS_RE, function (match, p) {
            return p.toLowerCase();
          });
          res[key] = props[ev];
        }
        return res;
      }, {});
    }
  }, {
    key: 'bindLeafletEvents',
    value: function bindLeafletEvents() {
      var next = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var prev = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var el = this.leafletElement;
      if (!el) return;

      var diff = (0, _clone2.default)(prev);
      (0, _forEach2.default)(prev, function (cb, ev) {
        if (!next[ev] || cb !== next[ev]) {
          delete diff[ev];
          el.off(ev, cb);
        }
      });

      (0, _forEach2.default)(next, function (cb, ev) {
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
  }]);

  return MapComponent;
}(_react.Component);

exports.default = MapComponent;