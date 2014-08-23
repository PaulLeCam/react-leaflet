var clone;

clone = require("lodash-node/modern/objects/clone");

module.exports = function(elName) {
  return {
    extractEvents: function(props) {
      var add, cb, ev, re, ret;
      re = /onLeaflet(.+)/i;
      ret = {};
      add = function(ev, cb) {
        ev = ev.replace(re, function(match, p) {
          return p.toLowerCase();
        });
        return ret[ev] = cb;
      };
      for (ev in props) {
        cb = props[ev];
        if (re.test(ev)) {
          add(ev, cb);
        }
      }
      return ret;
    },
    bindEvents: function(next, prev) {
      var add, cb, diff, el, ev, rem;
      if (next == null) {
        next = {};
      }
      if (prev == null) {
        prev = {};
      }
      if (!(el = this.state[elName])) {
        return;
      }
      diff = clone(prev);
      add = function(ev, cb) {
        diff[ev] = cb;
        return el.on(ev, cb);
      };
      rem = function(ev, cb) {
        delete diff[ev];
        return el.off(ev, cb);
      };
      for (ev in prev) {
        cb = prev[ev];
        if (!next[ev] || cb !== next[ev]) {
          rem(ev, cb);
        }
      }
      for (ev in next) {
        cb = next[ev];
        if (!prev[ev] || cb !== prev[ev]) {
          add(ev, cb);
        }
      }
      return diff;
    },
    fireEvent: function(type, data) {
      var _ref;
      return (_ref = this.state[elName]) != null ? _ref.fire(type, data) : void 0;
    },
    componentWillMount: function() {
      return this.setState({
        _events: this.extractEvents(this.props)
      });
    },
    componentDidMount: function() {
      return this.bindEvents(this.state._events);
    },
    componentWillReceiveProps: function(nextProps) {
      var bound, next;
      next = this.extractEvents(nextProps);
      bound = this.bindEvents(next, this.state._listeners);
      return this.setState({
        _events: bound
      });
    },
    componentWillUnmount: function() {
      var cb, el, ev, _ref, _results;
      if (!(el = this.state[elName])) {
        return;
      }
      _ref = this.state._events;
      _results = [];
      for (ev in _ref) {
        cb = _ref[ev];
        _results.push(el.off(ev, cb));
      }
      return _results;
    }
  };
};
