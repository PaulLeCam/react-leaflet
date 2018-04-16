// @flow

import type { Layer } from 'leaflet'
import React, { Fragment } from 'react'

import { LeafletProvider } from './context'
import MapComponent from './MapComponent'
import type { LeafletContext, MapLayerProps } from './types'

export default class MapLayer<
  LeafletElement: Layer,
  Props: MapLayerProps,
> extends MapComponent<LeafletElement, Props> {
  contextValue: ?LeafletContext

  constructor(props: Props) {
    super(props)
    this.leafletElement = this.createLeafletElement(props)
  }

  get layerContainer(): Layer {
    return this.props.leaflet.layerContainer || this.props.leaflet.map
  }

  // eslint-disable-next-line no-unused-vars
  createLeafletElement(props: Props): LeafletElement {
    throw new Error('createLeafletElement() must be implemented')
  }

  // eslint-disable-next-line no-unused-vars
  updateLeafletElement(fromProps: Props, toProps: Props) {}

  componentDidMount() {
    super.componentDidMount()
    this.layerContainer.addLayer(this.leafletElement)
  }

  componentDidUpdate(prevProps: Props) {
    super.componentDidUpdate(prevProps)
    this.updateLeafletElement(prevProps, this.props)
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.layerContainer.removeLayer(this.leafletElement)
  }

  render() {
    const { children } = this.props
    if (children == null) {
      return null
    }
    return this.contextValue == null ? (
      <Fragment>{children}</Fragment>
    ) : (
      <LeafletProvider value={this.contextValue}>{children}</LeafletProvider>
    )
  }
}
