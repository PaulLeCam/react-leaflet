// @flow

import PropTypes from 'prop-types'
import React from 'react'

import childrenType from './propTypes/children'
import layerContainerType from './propTypes/layerContainer'
import mapType from './propTypes/map'

import MapComponent from './MapComponent'

export default class MapLayer extends MapComponent {
  static propTypes = {
    children: childrenType,
  }

  static contextTypes = {
    layerContainer: layerContainerType,
    map: mapType,
    pane: PropTypes.string,
  }

  get layerContainer(): Object {
    return this.context.layerContainer || this.context.map
  }

  // eslint-disable-next-line no-unused-vars
  createLeafletElement(props: Object): Object {
    throw new Error('createLeafletElement() must be implemented')
  }

  // eslint-disable-next-line no-unused-vars
  updateLeafletElement(fromProps: Object, toProps: Object) {}

  componentWillMount() {
    super.componentWillMount()
    this.leafletElement = this.createLeafletElement(this.props)
  }

  componentDidMount() {
    super.componentDidMount()
    this.layerContainer.addLayer(this.leafletElement)
  }

  componentDidUpdate(prevProps: Object) {
    this.updateLeafletElement(prevProps, this.props)
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.layerContainer.removeLayer(this.leafletElement)
  }

  render(): React.Element<*> | null {
    return Array.isArray(this.props.children)
      ? <div style={{ display: 'none' }}>{this.props.children}</div>
      : this.props.children || null
  }
}
