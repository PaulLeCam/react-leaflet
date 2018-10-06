// @flow

import { Control } from 'leaflet'
import { Component } from 'react'

import type { MapControlProps } from './types'

export default class MapControl<
  LeafletElement: Control,
  Props: MapControlProps,
> extends Component<Props> {
  leafletElement: LeafletElement

  constructor(props: Props) {
    super(props)
    this.leafletElement = this.createLeafletElement(this.props)
  }

  createLeafletElement(_props: Props): LeafletElement {
    throw new Error('createLeafletElement() must be implemented')
  }

  updateLeafletElement(fromProps: Props, toProps: Props): void {
    if (toProps.position !== fromProps.position) {
      this.leafletElement.setPosition(toProps.position)
    }
  }

  componentDidMount() {
    this.leafletElement.addTo(this.props.leaflet.map)
  }

  componentDidUpdate(prevProps: Props) {
    this.updateLeafletElement(prevProps, this.props)
  }

  componentWillUnmount() {
    this.leafletElement.remove()
  }

  render(): * {
    return null
  }
}
