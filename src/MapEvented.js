// @flow

import type { Evented } from 'leaflet'
import { Component } from 'react'

export const EVENTS_RE = /^on(.+)$/i

type EventHandler = (event: Event) => void
type EventsObject = { [key: string]: EventHandler }

export default class MapEvented<
  LeafletElement: Evented,
  Props: Object,
> extends Component<Props> {
  _leafletEvents: EventsObject
  leafletElement: LeafletElement

  constructor(props: Props) {
    super(props)
    this._leafletEvents = this.extractLeafletEvents(props)
  }

  componentDidMount() {
    this.bindLeafletEvents(this._leafletEvents)
  }

  componentDidUpdate(_prevProps: Props) {
    this._leafletEvents = this.bindLeafletEvents(
      this.extractLeafletEvents(this.props),
      this._leafletEvents,
    )
  }

  componentWillUnmount() {
    const el = this.leafletElement
    if (!el) return

    Object.keys(this._leafletEvents).forEach((ev) => {
      el.off(ev, this._leafletEvents[ev])
    })
  }

  extractLeafletEvents(props: Props): EventsObject {
    return Object.keys(props).reduce((res, prop) => {
      if (EVENTS_RE.test(prop)) {
        if (props[prop] != null) {
          const key = prop.replace(EVENTS_RE, (match, p) => p.toLowerCase())
          res[key] = props[prop]
        }
      }
      return res
    }, {})
  }

  bindLeafletEvents(
    next: EventsObject = {},
    prev: EventsObject = {},
  ): EventsObject {
    const el = this.leafletElement
    if (el == null || el.on == null) return {}

    const diff = { ...prev }
    Object.keys(prev).forEach((ev) => {
      if (next[ev] == null || prev[ev] !== next[ev]) {
        delete diff[ev]
        el.off(ev, prev[ev])
      }
    })

    Object.keys(next).forEach((ev) => {
      if (prev[ev] == null || next[ev] !== prev[ev]) {
        diff[ev] = next[ev]
        el.on(ev, next[ev])
      }
    })

    return diff
  }

  fireLeafletEvent(type: string, data: ?any) {
    const el = this.leafletElement
    if (el) el.fire(type, data)
  }
}
