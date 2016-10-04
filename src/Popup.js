/* @flow */

import { popup as createPopup } from 'leaflet'
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
    pane: PropTypes.string,
  };

  componentWillMount () {
    super.componentWillMount()
    const { children: _children, ...props } = this.props

    this.leafletElement = createPopup(this.getOptions(props), this.context.popupContainer)

    this.context.map.on({
      popupopen: this.onPopupOpen,
      popupclose: this.onPopupClose,
    })
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

    if (this.leafletElement.isOpen()) {
      this.renderPopupContent()
    }
  }

  componentWillUnmount () {
    this.context.map.off({
      popupopen: this.onPopupOpen,
      popupclose: this.onPopupClose,
    })
    this.context.map.removeLayer(this.leafletElement)
    super.componentWillUnmount()
  }

  onPopupOpen = ({ popup }: Object) => {
    if (popup === this.leafletElement) {
      this.renderPopupContent()
    }
  }

  onPopupClose = ({ popup }: Object) => {
    if (popup === this.leafletElement) {
      this.removePopupContent()
    }
  }

  renderPopupContent = () => {
    if (this.props.children) {
      render(
        Children.only(this.props.children),
        this.leafletElement._contentNode
      )
      this.leafletElement.update()
    } else {
      this.removePopupContent()
    }
  }

  removePopupContent = () => {
    if (this.leafletElement._contentNode) {
      unmountComponentAtNode(this.leafletElement._contentNode)
    }
  }

  render () {
    return null
  }
}
