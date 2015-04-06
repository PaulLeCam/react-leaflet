"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _clone = require("lodash/lang/clone");

var _clone2 = _interopRequireWildcard(_clone);

var _forEach = require("lodash/collection/forEach");

var _forEach2 = _interopRequireWildcard(_forEach);

var _reduce = require("lodash/collection/reduce");

var _reduce2 = _interopRequireWildcard(_reduce);

var _Component2 = require("react");

var EVENTS_RE = /on(?:Leaflet)?(.+)/i;

var MapComponent = (function (_Component) {
  function MapComponent() {
    _classCallCheck(this, MapComponent);

    if (_Component != null) {
      _Component.apply(this, arguments);
    }
  }

  _inherits(MapComponent, _Component);

  _createClass(MapComponent, [{
    key: "getLeafletElement",
    value: function getLeafletElement() {
      return this.leafletElement;
    }
  }, {
    key: "extractLeafletEvents",
    value: function extractLeafletEvents(props) {
      return _reduce2["default"](props, function (res, cb, ev) {
        if (EVENTS_RE.test(ev)) {
          var key = ev.replace(EVENTS_RE, function (match, p) {
            return p.toLowerCase();
          });
          res[key] = cb;
        }
        return res;
      }, {});
    }
  }, {
    key: "bindLeafletEvents",
    value: function bindLeafletEvents() {
      var next = arguments[0] === undefined ? {} : arguments[0];
      var prev = arguments[1] === undefined ? {} : arguments[1];

      var el = this.leafletElement;
      if (!el) {
        return;
      }var diff = _clone2["default"](prev);
      _forEach2["default"](prev, function (cb, ev) {
        if (!next[ev] || cb !== next[ev]) {
          delete diff[ev];
          el.off(ev, cb);
        }
      });

      _forEach2["default"](next, function (cb, ev) {
        if (!prev[ev] || cb !== prev[ev]) {
          diff[ev] = cb;
          el.on(ev, cb);
        }
      });

      return diff;
    }
  }, {
    key: "fireLeafletEvent",
    value: function fireLeafletEvent(type, data) {
      var el = this.leafletElement;
      if (el) el.fire(type, data);
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      this._leafletEvents = this.extractLeafletEvents(this.props);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.bindLeafletEvents(this._leafletEvents);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var next = this.extractLeafletEvents(nextProps);
      this._leafletEvents = this.bindLeafletEvents(next, this._leafletEvents);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var el = this.leafletElement;
      if (!el) {
        return;
      }_forEach2["default"](this._leafletEvents, function (cb, ev) {
        el.off(ev, cb);
      });
    }
  }]);

  return MapComponent;
})(_Component2.Component);

exports["default"] = MapComponent;
module.exports = exports["default"];