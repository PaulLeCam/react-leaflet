var clone = require("lodash-node/modern/objects/clone");
var forEach = require("lodash-node/modern/collections/forEach");
var reduce = require("lodash-node/modern/collections/reduce");

module.exports = {
  getLeafletElement() {
    return this._leafletElement;
  },

  extractEvents(props) {
    var re = /onLeaflet(.+)/i;
    return reduce(props, (res, cb, ev) => {
      if (re.test(ev)) {
        var key = ev.replace(re, (match, p) => p.toLowerCase());
        res[ key ] = cb;
      }
      return res;
    }, {});
  },

  bindEvents(next, prev) {
    var el = this.getLeafletElement();
    if (!el) return;

    next = next || {};
    prev = prev || {};
    var diff = clone(prev);

    forEach(prev, (cb, ev) => {
      if (!next[ ev ] || cb !== next[ ev ]) {
        delete diff[ ev ];
        el.off(ev, cb);
      }
    });

    forEach(next, (cb, ev) => {
      if (!prev[ ev ] || cb !== prev[ ev ]) {
        diff[ ev ] = cb;
        el.on(ev, cb);
      }
    });

    return diff;
  },

  fireEvent(type, data) {
    var el = this.getLeafletElement();
    if (el) el.fire(type, data);
  },

  componentWillMount() {
    this._leafletEvents = this.extractEvents(this.props);
  },

  componentDidMount() {
    this.bindEvents(this._leafletEvents);
  },

  componentWillReceiveProps(nextProps) {
    var next = this.extractEvents(nextProps);
    this._leafletEvents = this.bindEvents(next, this._leafletEvents);
  },

  componentWillUnmount() {
    var el = this.getLeafletElement();
    if (!el) return;

    forEach(this._leafletEvents, (cb, ev) => {
      el.off(ev, cb);
    });
  }
};
