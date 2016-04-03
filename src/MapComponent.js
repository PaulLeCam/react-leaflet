import { clone, forEach, keys, reduce } from 'lodash';
import { Component } from 'react';
import warning from 'warning';

const EVENTS_RE_LEGACY = /^onLeaflet(.+)$/i;
const EVENTS_RE = /^on(.+)$/i;

export default class MapComponent extends Component {
  componentWillMount() {
    this._leafletEvents = this.extractLeafletEvents(this.props);
  }

  componentDidMount() {
    this.bindLeafletEvents(this._leafletEvents);
  }

  componentWillReceiveProps(nextProps) {
    const next = this.extractLeafletEvents(nextProps);
    this._leafletEvents = this.bindLeafletEvents(next, this._leafletEvents);
  }

  componentWillUnmount() {
    const el = this.leafletElement;
    if (!el) return;

    forEach(this._leafletEvents, (cb, ev) => {
      el.off(ev, cb);
    });
  }

  getLeafletElement() {
    return this.leafletElement;
  }

  extractLeafletEvents(props) {
    return reduce(keys(props), (res, prop) => {
      const maybeEvent = prop.replace(EVENTS_RE_LEGACY, (match, p) => {
        warning(false, `"onLeaflet${ p }" and other "onLeaflet..." properties are deprecated and support will be removed in the next version, use "on${ p }" instead.`);
        return `on${ p }`;
      });
      if (EVENTS_RE.test(maybeEvent)) {
        const key = maybeEvent.replace(EVENTS_RE, (match, p) => p.toLowerCase());
        res[ key ] = props[ prop ];
      }
      return res;
    }, {});
  }

  bindLeafletEvents(next = {}, prev = {}) {
    const el = this.leafletElement;
    if (!el || !el.on) return;

    const diff = clone(prev);
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
  }

  fireLeafletEvent(type, data) {
    const el = this.leafletElement;
    if (el) el.fire(type, data);
  }
}
