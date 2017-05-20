// @flow

import { popup as createPopup } from 'leaflet'
import PropTypes from 'prop-types'
import { Children } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import latlngType from './propTypes/latlng'
import mapType from './propTypes/map'

import MapComponent from './MapComponent'

export default class Popup extends MapComponent {
  static propTypes = {
    children: PropTypes.node,
    position: latlngType,
  }

  static contextTypes = {
    map: mapType,
    popupContainer: PropTypes.object,
    pane: PropTypes.string,
  }

  createLeafletElement(props: Object): Object {
    const { children: _children, ...options } = props
    return createPopup(this.getOptions(options), this.context.popupContainer)
  }

  updateLeafletElement(fromProps: Object, toProps: Object) {
    if (toProps.position !== fromProps.position) {
      this.leafletElement.setLatLng(toProps.position)
    }
  }

  componentWillMount() {
    super.componentWillMount()
    this.leafletElement = this.createLeafletElement(this.props)

    this.context.map.on({
      popupopen: this.onPopupOpen,
      popupclose: this.onPopupClose,
    })
  }

  componentDidMount() {
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

  componentDidUpdate(prevProps: Object) {
    this.updateLeafletElement(prevProps, this.props)

    if (this.leafletElement.isOpen()) {
      this.renderPopupContent()
    }
  }

  componentWillUnmount() {
    this.removePopupContent()

    this.context.map.off({
      popupopen: this.onPopupOpen,
      popupclose: this.onPopupClose,
    })
    this.context.map.removeLayer(this.leafletElement)

    super.componentWillUnmount()
  }

  onPopupOpen = ({ popup }: Object): void => {
    if (popup === this.leafletElement) {
      this.renderPopupContent()
    }
  }

  onPopupClose = ({ popup }: Object): void => {
    if (popup === this.leafletElement) {
      this.removePopupContent()
    }
  }

  renderPopupContent = (): void => {
    if (this.props.children) {
      render(
        Children.only(this.props.children),
        this.leafletElement._contentNode,
      )
      this.leafletElement.update()
    } else {
      this.removePopupContent()
    }
  }

  removePopupContent = (): void => {
    if (this.leafletElement._contentNode) {
      unmountComponentAtNode(this.leafletElement._contentNode)
    }
  }

  render(): null {
    return null
  }
}
