// @flow

import { Control } from 'leaflet'
import { Component, type Element } from 'react'

import controlPosition from './propTypes/controlPosition'
import map from './propTypes/map'
import type { ControlPosition } from './types'

export default class MapControl<
  LeafletElement: Control,
  Props: { position?: ControlPosition },
> extends Component<Props> {
  static propTypes = {
    position: controlPosition,
  }

  static contextTypes = {
    map: map,
  }

  leafletElement: LeafletElement

  // eslint-disable-next-line no-unused-vars
  createLeafletElement(props: Props): LeafletElement {
    throw new Error('createLeafletElement() must be implemented')
  }

  updateLeafletElement(fromProps: Props, toProps: Props): void {
    if (toProps.position !== fromProps.position) {
      this.leafletElement.setPosition(toProps.position)
    }
  }

  componentWillMount() {
    this.leafletElement = this.createLeafletElement(this.props)
  }

  componentDidMount() {
    this.leafletElement.addTo(this.context.map)
  }

  componentDidUpdate(prevProps: Props) {
    this.updateLeafletElement(prevProps, this.props)
  }

  componentWillUnmount() {
    this.leafletElement.remove()
  }

  render(): ?Element<any> {
    return null
  }
}
