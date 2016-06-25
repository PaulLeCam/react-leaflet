/* @flow */

import { clone, forEach, keys, reduce } from 'lodash'
import { Component } from 'react'
import warning from 'warning'

const EVENTS_RE = /^on(.+)$/i

export default class MapComponent extends Component<any, any, any> {
  _leafletEvents: Object;
  leafletElement: Object;

  constructor (props: Object, context: Object) {
    super(props, context)
    this._leafletEvents = {}
  }

  componentWillMount () {
    this._leafletEvents = this.extractLeafletEvents(this.props)
  }

  componentDidMount () {
    this.bindLeafletEvents(this._leafletEvents, {})
  }

  componentWillReceiveProps (nextProps: Object) {
    const next = this.extractLeafletEvents(nextProps)
    this._leafletEvents = this.bindLeafletEvents(next, this._leafletEvents)
  }

  componentWillUnmount () {
    const el = this.leafletElement
    if (!el) return

    forEach(this._leafletEvents, (cb, ev) => {
      el.off(ev, cb)
    })
  }

  getLeafletElement () {
    warning(false, 'The "getLeafletElement()" method is deprecated and will be removed in the next version, simply use the "leafletElement" property instead.')
    return this.leafletElement
  }

  extractLeafletEvents (props: Object) {
    return reduce(keys(props), (res, prop) => {
      if (EVENTS_RE.test(prop)) {
        const key = prop.replace(EVENTS_RE, (match, p) => p.toLowerCase())
        res[ key ] = props[ prop ]
      }
      return res
    }, {})
  }

  bindLeafletEvents (next: Object = {}, prev: Object = {}): Object {
    const el = this.leafletElement
    if (!el || !el.on) return {}

    const diff = clone(prev)
    forEach(prev, (cb, ev) => {
      if (!next[ ev ] || cb !== next[ ev ]) {
        delete diff[ ev ]
        el.off(ev, cb)
      }
    })

    forEach(next, (cb, ev) => {
      if (!prev[ ev ] || cb !== prev[ ev ]) {
        diff[ ev ] = cb
        el.on(ev, cb)
      }
    })

    return diff
  }

  fireLeafletEvent (type: string, data: ?any) {
    const el = this.leafletElement
    if (el) el.fire(type, data)
  }
}
