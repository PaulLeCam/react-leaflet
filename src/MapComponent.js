/* @flow */

import { clone, forEach, keys, reduce } from 'lodash'
import { Component } from 'react'

const EVENTS_RE = /^on(.+)$/i

export default class MapComponent extends Component<any, any, any> {
  constructor (props: Object, context: Object) {
    super(props, context)
    this._leafletEvents = {}
  }

  componentWillMount () {
    this._leafletEvents = this.extractLeafletEvents(this.props)
  }

  componentDidMount () {
    this.bindLeafletEvents(this._leafletEvents)
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

  _leafletEvents: {[key: string]: Function};
  leafletElement: Object;

  extractLeafletEvents (props: Object): Object {
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

  getOptions (props: Object = {}): Object {
    const pane = props.pane || this.context.pane
    return pane ? {...props, pane} : props
  }
}
