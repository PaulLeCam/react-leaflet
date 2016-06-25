/* @flow */

import { Icon, marker } from 'leaflet'
import { PropTypes } from 'react'

import latlngType from './types/latlng'
import MapLayer from './MapLayer'

export default class Marker extends MapLayer {
  static propTypes = {
    icon: PropTypes.instanceOf(Icon),
    opacity: PropTypes.number,
    position: latlngType.isRequired,
    zIndexOffset: PropTypes.number,
  };

  static childContextTypes = {
    popupContainer: PropTypes.object,
  };

  getChildContext () {
    return {
      popupContainer: this.leafletElement,
    }
  }

  componentWillMount () {
    super.componentWillMount()
    const { position, ...props } = this.props
    this.leafletElement = marker(position, props)
  }

  componentDidUpdate (prevProps: Object) {
    if (this.props.position !== prevProps.position) {
      this.leafletElement.setLatLng(this.props.position)
    }
    if (this.props.icon !== prevProps.icon) {
      this.leafletElement.setIcon(this.props.icon)
    }
    if (this.props.zIndexOffset !== prevProps.zIndexOffset) {
      this.leafletElement.setZIndexOffset(this.props.zIndexOffset)
    }
    if (this.props.opacity !== prevProps.opacity) {
      this.leafletElement.setOpacity(this.props.opacity)
    }
    if (this.props.draggable !== prevProps.draggable) {
      if (this.props.draggable) {
        this.leafletElement.dragging.enable()
      } else {
        this.leafletElement.dragging.disable()
      }
    }
  }

  render () {
    return this.props.children || null
  }
}
