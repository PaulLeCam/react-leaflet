// @flow

import { clone, forEach, keys, reduce } from 'lodash'
import type { Evented } from 'leaflet'
import { Component } from 'react'

import type { MapComponentProps } from './types'

export const EVENTS_RE = /^on(.+)$/i

type EventHandler = (event: Event) => void
type EventsObject = { [key: string]: EventHandler }

export default class MapComponent<
  LeafletElement: Evented,
  Props: MapComponentProps,
> extends Component<Props> {
  _leafletEvents: EventsObject
  leafletElement: LeafletElement

  constructor(props: Props, context: Object) {
    super(props, context)
    this._leafletEvents = {}
  }

  componentWillMount() {
    this._leafletEvents = this.extractLeafletEvents(this.props)
  }

  componentDidMount() {
    this.bindLeafletEvents(this._leafletEvents)
  }

  componentWillReceiveProps(nextProps: Props) {
    const next = this.extractLeafletEvents(nextProps)
    this._leafletEvents = this.bindLeafletEvents(next, this._leafletEvents)
  }

  componentWillUnmount() {
    const el = this.leafletElement
    if (!el) return

    forEach(this._leafletEvents, (cb, ev) => {
      el.off(ev, cb)
    })
  }

  extractLeafletEvents(props: Props): EventsObject {
    return reduce(
      keys(props),
      (res, prop) => {
        if (EVENTS_RE.test(prop)) {
          const key = prop.replace(EVENTS_RE, (match, p) => p.toLowerCase())
          if (props[prop] != null) {
            res[key] = props[prop]
          }
        }
        return res
      },
      {},
    )
  }

  bindLeafletEvents(
    next: EventsObject = {},
    prev: EventsObject = {},
  ): EventsObject {
    const el = this.leafletElement
    if (el == null || el.on == null) return {}

    const diff = clone(prev)
    forEach(prev, (cb, ev) => {
      if (!next[ev] || cb !== next[ev]) {
        delete diff[ev]
        el.off(ev, cb)
      }
    })

    forEach(next, (cb, ev) => {
      if (!prev[ev] || cb !== prev[ev]) {
        diff[ev] = cb
        el.on(ev, cb)
      }
    })

    return diff
  }

  fireLeafletEvent(type: string, data: ?any) {
    const el = this.leafletElement
    if (el) el.fire(type, data)
  }

  getOptions(props: Props): Props {
    const pane = props.pane == null ? this.context.pane : props.pane
    return pane ? { ...props, pane } : props
  }
}
