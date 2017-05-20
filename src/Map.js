// @flow

import Leaflet from 'leaflet'
import type { LatLng, LatLngBounds } from 'leaflet'
import { isUndefined, omit } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import boundsType from './propTypes/bounds'
import childrenType from './propTypes/children'
import latlngType from './propTypes/latlng'
import layerContainerType from './propTypes/layerContainer'
import mapType from './propTypes/map'

import MapComponent from './MapComponent'

const OTHER_PROPS = ['children', 'className', 'id', 'style', 'useFlyTo']

type LatLngType = LatLng | Array<number> | Object
type LatLngBoundsType = LatLngBounds | Array<LatLngType>

const normalizeCenter = (pos: LatLngType): Array<number> => {
  return Array.isArray(pos) ? pos : [pos.lat, pos.lon ? pos.lon : pos.lng]
}

export default class Map extends MapComponent {
  static propTypes = {
    animate: PropTypes.bool,
    bounds: boundsType,
    boundsOptions: PropTypes.object,
    center: latlngType,
    children: childrenType,
    className: PropTypes.string,
    id: PropTypes.string,
    maxBounds: boundsType,
    maxZoom: PropTypes.number,
    minZoom: PropTypes.number,
    style: PropTypes.object,
    useFlyTo: PropTypes.bool,
    zoom: PropTypes.number,
  }

  static defaultProps = {
    animate: false,
    useFlyTo: false,
  }

  static childContextTypes = {
    layerContainer: layerContainerType,
    map: mapType,
  }

  className: ?string
  container: HTMLDivElement

  constructor(props: Object, context: Object) {
    super(props, context)
    this.className = props.className
  }

  getChildContext(): { map: Object } {
    return {
      layerContainer: this.leafletElement,
      map: this.leafletElement,
    }
  }

  createLeafletElement(props: Object): Object {
    return Leaflet.map(this.container, props)
  }

  updateLeafletElement(fromProps: Object, toProps: Object) {
    const {
      animate,
      bounds,
      boundsOptions,
      center,
      className,
      maxBounds,
      useFlyTo,
      zoom,
    } = toProps

    if (className !== fromProps.className) {
      if (fromProps.className) {
        Leaflet.DomUtil.removeClass(this.container, fromProps.className)
      }
      if (className) {
        Leaflet.DomUtil.addClass(this.container, className)
      }
    }

    if (center && this.shouldUpdateCenter(center, fromProps.center)) {
      if (useFlyTo) {
        this.leafletElement.flyTo(center, zoom, { animate })
      } else {
        this.leafletElement.setView(center, zoom, { animate })
      }
    } else if (zoom && zoom !== fromProps.zoom) {
      this.leafletElement.setZoom(zoom)
    }

    if (maxBounds && this.shouldUpdateBounds(maxBounds, fromProps.maxBounds)) {
      this.leafletElement.setMaxBounds(maxBounds)
    }

    if (
      bounds &&
      (this.shouldUpdateBounds(bounds, fromProps.bounds) ||
        boundsOptions !== fromProps.boundsOptions)
    ) {
      if (useFlyTo) {
        this.leafletElement.flyToBounds(bounds, boundsOptions)
      } else {
        this.leafletElement.fitBounds(bounds, boundsOptions)
      }
    }
  }

  componentDidMount() {
    const props = omit(this.props, OTHER_PROPS)
    this.leafletElement = this.createLeafletElement(props)
    if (!isUndefined(props.bounds)) {
      this.leafletElement.fitBounds(props.bounds, props.boundsOptions)
    }
    super.componentDidMount()
    this.forceUpdate() // Re-render now that leafletElement is created
  }

  componentDidUpdate(prevProps: Object) {
    this.updateLeafletElement(prevProps, this.props)
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.leafletElement.remove()
  }

  bindContainer = (container: HTMLDivElement): void => {
    this.container = container
  }

  shouldUpdateCenter(next: LatLngType, prev: LatLngType): boolean {
    if (!prev) return true
    next = normalizeCenter(next)
    prev = normalizeCenter(prev)
    return next[0] !== prev[0] || next[1] !== prev[1]
  }

  shouldUpdateBounds(next: LatLngBoundsType, prev: LatLngBoundsType): boolean {
    if (!prev) return true
    next = Leaflet.latLngBounds(next)
    prev = Leaflet.latLngBounds(prev)
    return !next.equals(prev)
  }

  render(): React.Element<*> {
    const map = this.leafletElement
    const children = map ? this.props.children : null

    return (
      <div
        className={this.className}
        id={this.props.id}
        ref={this.bindContainer}
        style={this.props.style}>
        {children}
      </div>
    )
  }
}
