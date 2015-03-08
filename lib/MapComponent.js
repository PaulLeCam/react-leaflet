"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var clone = _interopRequire(require("lodash/lang/clone"));

var forEach = _interopRequire(require("lodash/collection/forEach"));

var reduce = _interopRequire(require("lodash/collection/reduce"));

var Component = require("react").Component;

var EVENTS_RE = /on(?:Leaflet)?(.+)/i;

var MapComponent = (function (_Component) {
  function MapComponent() {
    _classCallCheck(this, MapComponent);

    if (_Component != null) {
      _Component.apply(this, arguments);
    }
  }

  _inherits(MapComponent, _Component);

  _createClass(MapComponent, {
    getLeafletElement: {
      value: function getLeafletElement() {
        console && console.warn && console.warn("`getLeafletElement()` is deprecated, use `leafletElement` instead");
        return this.leafletElement;
      }
    },
    extractLeafletEvents: {
      value: function extractLeafletEvents(props) {
        return reduce(props, function (res, cb, ev) {
          if (EVENTS_RE.test(ev)) {
            var key = ev.replace(EVENTS_RE, function (match, p) {
              return p.toLowerCase();
            });
            res[key] = cb;
          }
          return res;
        }, {});
      }
    },
    bindLeafletEvents: {
      value: function bindLeafletEvents() {
        var next = arguments[0] === undefined ? {} : arguments[0];
        var prev = arguments[1] === undefined ? {} : arguments[1];

        var el = this.leafletElement;
        if (!el) {
          return;
        }var diff = clone(prev);
        forEach(prev, function (cb, ev) {
          if (!next[ev] || cb !== next[ev]) {
            delete diff[ev];
            el.off(ev, cb);
          }
        });

        forEach(next, function (cb, ev) {
          if (!prev[ev] || cb !== prev[ev]) {
            diff[ev] = cb;
            el.on(ev, cb);
          }
        });

        return diff;
      }
    },
    fireLeafletEvent: {
      value: function fireLeafletEvent(type, data) {
        var el = this.leafletElement;
        if (el) el.fire(type, data);
      }
    },
    componentWillMount: {
      value: function componentWillMount() {
        this._leafletEvents = this.extractLeafletEvents(this.props);
      }
    },
    componentDidMount: {
      value: function componentDidMount() {
        this.bindLeafletEvents(this._leafletEvents);
      }
    },
    componentWillReceiveProps: {
      value: function componentWillReceiveProps(nextProps) {
        var next = this.extractLeafletEvents(nextProps);
        this._leafletEvents = this.bindLeafletEvents(next, this._leafletEvents);
      }
    },
    componentWillUnmount: {
      value: function componentWillUnmount() {
        var el = this.leafletElement;
        if (!el) {
          return;
        }forEach(this._leafletEvents, function (cb, ev) {
          el.off(ev, cb);
        });
      }
    }
  });

  return MapComponent;
})(Component);

module.exports = MapComponent;