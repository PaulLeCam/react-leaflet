/* @flow */

import { popup } from 'leaflet'
import { Children, PropTypes } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import latlngType from './types/latlng'
import mapType from './types/map'
import MapComponent from './MapComponent'

export default class Popup extends MapComponent {
  static propTypes = {
    children: PropTypes.node,
    position: latlngType,
  };

  static contextTypes = {
    map: mapType,
    popupContainer: PropTypes.object,
  };

  componentWillMount () {
    super.componentWillMount()
    const { children: _children, ...props } = this.props

    this.leafletElement = popup(props, this.context.popupContainer)
    this.leafletElement.on('open', this.renderPopupContent.bind(this))
    this.leafletElement.on('close', this.removePopupContent.bind(this))
  }

  componentDidMount () {
    const { position } = this.props
    const { map, popupContainer } = this.context
    const el = this.leafletElement

    if (popupContainer) {
      // Attach to container component
      popupContainer.bindPopup(el)
    } else {
      // Attach to a Map
      if (position) {
        el.setLatLng(position)
      }
      el.openOn(map)
    }
  }

  componentDidUpdate (prevProps: Object) {
    const { position } = this.props

    if (position !== prevProps.position) {
      this.leafletElement.setLatLng(position)
    }

    if (this.leafletElement._isOpen) {
      this.renderPopupContent()
    }
  }

  componentWillUnmount () {
    super.componentWillUnmount()
    this.removePopupContent()
    this.context.map.removeLayer(this.leafletElement)
  }

  renderPopupContent () {
    if (this.props.children) {
      render(
        Children.only(this.props.children),
        this.leafletElement._contentNode
      )

      this.leafletElement._updateLayout()
      this.leafletElement._updatePosition()
      this.leafletElement._adjustPan()
    } else {
      this.removePopupContent()
    }
  }

  removePopupContent () {
    if (this.leafletElement._contentNode) {
      unmountComponentAtNode(this.leafletElement._contentNode)
    }
  }

  render () {
    return null
  }
}
