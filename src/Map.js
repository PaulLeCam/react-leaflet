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
import viewportType from './propTypes/viewport'

import MapComponent from './MapComponent'

const OTHER_PROPS = [
  'children',
  'className',
  'id',
  'style',
  'useFlyTo',
  'whenReady',
]

type LatLngType = LatLng | Array<number> | Object
type LatLngBoundsType = LatLngBounds | Array<LatLngType>
type Viewport = {
  center: ?[number, number],
  zoom: ?number,
}

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
    viewport: viewportType,
    whenReady: PropTypes.func,
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
  viewport: Viewport = {
    center: undefined,
    zoom: undefined,
  }

  _updating: boolean = false

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
    const { viewport, ...options } = props
    if (viewport) {
      if (viewport.center) {
        options.center = viewport.center
      }
      if (viewport.zoom) {
        options.zoom = viewport.zoom
      }
    }
    return Leaflet.map(this.container, options)
  }

  updateLeafletElement(fromProps: Object, toProps: Object) {
    this._updating = true

    const {
      animate,
      bounds,
      boundsOptions,
      center,
      className,
      maxBounds,
      useFlyTo,
      viewport,
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

    if (viewport && viewport !== fromProps.viewport) {
      const c = viewport.center ? viewport.center : center
      const z = viewport.zoom ? viewport.zoom : zoom
      if (useFlyTo) {
        this.leafletElement.flyTo(c, z, { animate })
      } else {
        this.leafletElement.setView(c, z, { animate })
      }
    } else if (center && this.shouldUpdateCenter(center, fromProps.center)) {
      if (useFlyTo) {
        this.leafletElement.flyTo(center, zoom, { animate })
      } else {
        this.leafletElement.setView(center, zoom, { animate })
      }
    } else if (zoom && zoom !== fromProps.zoom) {
      if (fromProps.zoom) {
        this.leafletElement.setZoom(zoom)
      } else {
        this.leafletElement.setView(center, zoom)
      }
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

    this._updating = false
  }

  onViewportChange = () => {
    const center = this.leafletElement.getCenter()
    this.viewport = {
      center: center ? [center.lat, center.lng] : undefined,
      zoom: this.leafletElement.getZoom(),
    }
    if (this.props.onViewportChange && !this._updating) {
      this.props.onViewportChange(this.viewport)
    }
  }

  onViewportChanged = () => {
    if (this.props.onViewportChanged && !this._updating) {
      this.props.onViewportChanged(this.viewport)
    }
  }

  componentDidMount() {
    const props = omit(this.props, OTHER_PROPS)
    this.leafletElement = this.createLeafletElement(props)

    this.leafletElement.on('move', this.onViewportChange)
    this.leafletElement.on('moveend', this.onViewportChanged)

    if (!isUndefined(props.bounds)) {
      this.leafletElement.fitBounds(props.bounds, props.boundsOptions)
    }

    if (this.props.whenReady) {
      this.leafletElement.whenReady(this.props.whenReady)
    }

    super.componentDidMount()
    this.forceUpdate() // Re-render now that leafletElement is created
  }

  componentDidUpdate(prevProps: Object) {
    this.updateLeafletElement(prevProps, this.props)
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.leafletElement.off('move', this.onViewportChange)
    this.leafletElement.off('moveend', this.onViewportChanged)
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
