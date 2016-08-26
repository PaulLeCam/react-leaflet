/* @flow */
/* eslint-disable react/no-did-mount-set-state */

import Leaflet from 'leaflet'
import type { LatLng, LatLngBounds } from 'leaflet'
import { isUndefined, omit } from 'lodash'
import React, { PropTypes } from 'react'

import boundsType from './types/bounds'
import childrenType from './types/children'
import latlngType from './types/latlng'

import MapComponent from './MapComponent'

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
  };

  static defaultProps = {
    animate: false,
    useFlyTo: false,
  };

  static childContextTypes = {
    map: PropTypes.instanceOf(Leaflet.Map),
  };

  container: HTMLDivElement

  state: {
    map?: Leaflet.Map,
  }

  getChildContext () {
    return {
      map: this.leafletElement,
    }
  }

  componentDidMount () {
    const props = omit(this.props, ['children', 'className', 'id', 'style'])
    this.leafletElement = Leaflet.map(this.container, props)
    super.componentDidMount()
    this.setState({map: this.leafletElement})
    if (!isUndefined(props.bounds)) {
      this.leafletElement.fitBounds(props.bounds, props.boundsOptions)
    }
  }

  componentDidUpdate (prevProps: Object) {
    const { animate, bounds, boundsOptions, center, maxBounds, useFlyTo, zoom } = this.props

    if (center && this.shouldUpdateCenter(center, prevProps.center)) {
      if (useFlyTo) {
        this.leafletElement.flyTo(center, zoom, {animate})
      } else {
        this.leafletElement.setView(center, zoom, {animate})
      }
    } else if (zoom && zoom !== prevProps.zoom) {
      this.leafletElement.setZoom(zoom)
    }

    if (maxBounds && this.shouldUpdateBounds(maxBounds, prevProps.maxBounds)) {
      this.leafletElement.setMaxBounds(maxBounds)
    }

    if (bounds && (
      this.shouldUpdateBounds(bounds, prevProps.bounds) ||
      boundsOptions !== prevProps.boundsOptions
    )) {
      if (useFlyTo) {
        this.leafletElement.flyToBounds(bounds, boundsOptions)
      } else {
        this.leafletElement.fitBounds(bounds, boundsOptions)
      }
    }
  }

  componentWillUnmount () {
    super.componentWillUnmount()
    this.leafletElement.remove()
  }

  bindContainer = (container: HTMLDivElement) => {
    this.container = container
  }

  shouldUpdateCenter (next: LatLngType, prev: LatLngType) {
    if (!prev) return true
    next = normalizeCenter(next)
    prev = normalizeCenter(prev)
    return next[0] !== prev[0] || next[1] !== prev[1]
  }

  shouldUpdateBounds (next: LatLngBoundsType, prev: LatLngBoundsType) {
    if (!prev) return true
    next = Leaflet.latLngBounds(next)
    prev = Leaflet.latLngBounds(prev)
    return !next.equals(prev)
  }

  render () {
    const map = this.leafletElement
    const children = map ? React.Children.map(this.props.children, child => {
      return child ? React.cloneElement(child, {map, layerContainer: map}) : null
    }) : null

    return (
      <div
        className={this.props.className}
        id={this.props.id}
        ref={this.bindContainer}
        style={this.props.style}>
        {children}
      </div>
    )
  }
}
