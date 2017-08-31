// @flow

import type { Layer } from 'leaflet'
import PropTypes from 'prop-types'
import React, { Children } from 'react'

import MapComponent from './MapComponent'
import children from './propTypes/children'
import layerContainer from './propTypes/layerContainer'
import map from './propTypes/map'
import type { MapLayerProps } from './types'

export default class MapLayer<
  LeafletElement: Layer,
  Props: MapLayerProps,
> extends MapComponent<LeafletElement, Props> {
  static propTypes = {
    children: children,
  }

  static contextTypes = {
    layerContainer: layerContainer,
    map: map,
    pane: PropTypes.string,
  }

  get layerContainer(): Layer {
    return this.context.layerContainer || this.context.map
  }

  // eslint-disable-next-line no-unused-vars
  createLeafletElement(props: Props): LeafletElement {
    throw new Error('createLeafletElement() must be implemented')
  }

  // eslint-disable-next-line no-unused-vars
  updateLeafletElement(fromProps: Props, toProps: Props) {}

  componentWillMount() {
    super.componentWillMount()
    this.leafletElement = this.createLeafletElement(this.props)
  }

  componentDidMount() {
    super.componentDidMount()
    this.layerContainer.addLayer(this.leafletElement)
  }

  componentDidUpdate(prevProps: Props) {
    this.updateLeafletElement(prevProps, this.props)
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.layerContainer.removeLayer(this.leafletElement)
  }

  render() {
    const { children } = this.props
    if (Children.count(children) > 1) {
      return <div style={{ display: 'none' }}>{children}</div>
    }
    return children == null ? null : children
  }
}
