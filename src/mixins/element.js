import clone from "lodash/lang/clone";
import forEach from "lodash/collection/forEach";
import reduce from "lodash/collection/reduce";

export default {
  getLeafletElement() {
    return this._leafletElement;
  },

  extractEvents(props) {
    let re = /on(?:Leaflet)?(.+)/i;
    return reduce(props, (res, cb, ev) => {
      if (re.test(ev)) {
        let key = ev.replace(re, (match, p) => p.toLowerCase());
        res[ key ] = cb;
      }
      return res;
    }, {});
  },

  bindEvents(next = {}, prev = {}) {
    let el = this.getLeafletElement();
    if (!el) return;

    let diff = clone(prev);
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
    let el = this.getLeafletElement();
    if (el) el.fire(type, data);
  },

  componentWillMount() {
    this._leafletEvents = this.extractEvents(this.props);
  },

  componentDidMount() {
    this.bindEvents(this._leafletEvents);
  },

  componentWillReceiveProps(nextProps) {
    let next = this.extractEvents(nextProps);
    this._leafletEvents = this.bindEvents(next, this._leafletEvents);
  },

  componentWillUnmount() {
    let el = this.getLeafletElement();
    if (!el) return;

    forEach(this._leafletEvents, (cb, ev) => {
      el.off(ev, cb);
    });
  }
};
