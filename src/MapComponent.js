import clone from 'lodash/lang/clone';
import forEach from 'lodash/collection/forEach';
import reduce from 'lodash/collection/reduce';
import keys from 'lodash/object/keys';
import { Component } from 'react';

const EVENTS_RE = /on(?:Leaflet)?(.+)/i;

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
    return reduce(keys(props), (res, ev) => {
      if (EVENTS_RE.test(ev)) {
        const key = ev.replace(EVENTS_RE, (match, p) => p.toLowerCase());
        res[ key ] = props[ ev ];
      }
      return res;
    }, {});
  }

  bindLeafletEvents(next = {}, prev = {}) {
    const el = this.leafletElement;
    if (!el) return;

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
