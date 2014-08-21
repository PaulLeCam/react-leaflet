var bind, clone, extract, unbind;

clone = require("lodash-node/modern/objects/clone");

extract = function(props) {
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
};

bind = function(el, next, prev) {
  var add, cb, diff, ev, rem;
  if (next == null) {
    next = {};
  }
  if (prev == null) {
    prev = {};
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
};

unbind = function(el, listeners) {
  var cb, ev, _results;
  _results = [];
  for (ev in listeners) {
    cb = listeners[ev];
    _results.push(el.off(ev, cb));
  }
  return _results;
};

module.exports = function(elName) {
  return {
    componentWillMount: function() {
      return this.setState({
        _listeners: extract(this.props)
      });
    },
    componentDidMount: function() {
      var el;
      if (!(el = this.state[elName])) {
        return;
      }
      return bind(el, this.state._listeners);
    },
    componentWillReceiveProps: function(nextProps) {
      var bound, el, next;
      if (!(el = this.state[elName])) {
        return;
      }
      next = extract(nextProps);
      bound = bind(el, next, this.state._listeners);
      return this.setState({
        _listeners: bound
      });
    },
    componentWillUnmount: function() {
      var el;
      if (!(el = this.state[elName])) {
        return;
      }
      return unbind(el, this.state._listeners);
    }
  };
};
