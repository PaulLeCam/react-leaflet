var clone = require("lodash-node/modern/objects/clone");
var forEach = require("lodash-node/modern/collections/forEach");
var reduce = require("lodash-node/modern/collections/reduce");

module.exports = {
  getLeafletElement:function() {
    return this._leafletElement;
  },

  extractEvents:function(props) {
    var re = /onLeaflet(.+)/i;
    return reduce(props, function(res, cb, ev)  {
      if (re.test(ev)) {
        var key = ev.replace(re, function(match, p)  {return p.toLowerCase();});
        res[ key ] = cb;
      }
      return res;
    }, {});
  },

  bindEvents:function(next, prev) {
    var el = this.getLeafletElement();
    if (!el) return;

    next = next || {};
    prev = prev || {};
    var diff = clone(prev);

    forEach(prev, function(cb, ev)  {
      if (!next[ ev ] || cb !== next[ ev ]) {
        delete diff[ ev ];
        el.off(ev, cb);
      }
    });

    forEach(next, function(cb, ev)  {
      if (!prev[ ev ] || cb !== prev[ ev ]) {
        diff[ ev ] = cb;
        el.on(ev, cb);
      }
    });

    return diff;
  },

  fireEvent:function(type, data) {
    var el = this.getLeafletElement();
    if (el) el.fire(type, data);
  },

  componentWillMount:function() {
    this._leafletEvents = this.extractEvents(this.props);
  },

  componentDidMount:function() {
    this.bindEvents(this._leafletEvents);
  },

  componentWillReceiveProps:function(nextProps) {
    var next = this.extractEvents(nextProps);
    this._leafletEvents = this.bindEvents(next, this._leafletEvents);
  },

  componentWillUnmount:function() {
    var el = this.getLeafletElement();
    if (!el) return;

    forEach(this._leafletEvents, function(cb, ev)  {
      el.off(ev, cb);
    });
  }
};
