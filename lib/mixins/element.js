"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var clone = _interopRequire(require("lodash/lang/clone"));

var forEach = _interopRequire(require("lodash/collection/forEach"));

var reduce = _interopRequire(require("lodash/collection/reduce"));

module.exports = {
  getLeafletElement: function getLeafletElement() {
    return this._leafletElement;
  },

  extractEvents: function extractEvents(props) {
    var re = /on(?:Leaflet)?(.+)/i;
    return reduce(props, function (res, cb, ev) {
      if (re.test(ev)) {
        var key = ev.replace(re, function (match, p) {
          return p.toLowerCase();
        });
        res[key] = cb;
      }
      return res;
    }, {});
  },

  bindEvents: function bindEvents() {
    var next = arguments[0] === undefined ? {} : arguments[0];
    var prev = arguments[1] === undefined ? {} : arguments[1];

    var el = this.getLeafletElement();
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
  },

  fireEvent: function fireEvent(type, data) {
    var el = this.getLeafletElement();
    if (el) el.fire(type, data);
  },

  componentWillMount: function componentWillMount() {
    this._leafletEvents = this.extractEvents(this.props);
  },

  componentDidMount: function componentDidMount() {
    this.bindEvents(this._leafletEvents);
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var next = this.extractEvents(nextProps);
    this._leafletEvents = this.bindEvents(next, this._leafletEvents);
  },

  componentWillUnmount: function componentWillUnmount() {
    var el = this.getLeafletElement();
    if (!el) {
      return;
    }forEach(this._leafletEvents, function (cb, ev) {
      el.off(ev, cb);
    });
  }
};