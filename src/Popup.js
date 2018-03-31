// @flow

import { Popup as LeafletPopup } from 'leaflet'
import PropTypes from 'prop-types'

import DivOverlay from './DivOverlay'
import latlng from './propTypes/latlng'
import layer from './propTypes/layer'
import map from './propTypes/map'
import type { LatLng, DivOverlayProps } from './types'

type LeafletElement = LeafletPopup
type Props = {
  autoPan?: boolean,
  position?: LatLng,
} & DivOverlayProps

export default class Popup extends DivOverlay<LeafletElement, Props> {
  static propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    position: latlng,
  }

  static contextTypes = {
    map: map,
    popupContainer: layer,
    pane: PropTypes.string,
  }

  static defaultProps = {
    pane: 'popupPane',
  }

  getOptions(props: Props): Props {
    return {
      ...super.getOptions(props),
      autoPan: false,
    }
  }

  createLeafletElement(props: Props): LeafletElement {
    return new LeafletPopup(this.getOptions(props), this.context.popupContainer)
  }

  updateLeafletElement(fromProps: Props, toProps: Props) {
    if (toProps.position !== fromProps.position) {
      this.leafletElement.setLatLng(toProps.position)
    }
  }

  componentWillMount() {
    super.componentWillMount()
    this.leafletElement = this.createLeafletElement(this.props)
    this.leafletElement.options.autoPan = this.props.autoPan !== false

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

  componentWillUnmount() {
    this.removeContent()

    this.context.map.off({
      popupopen: this.onPopupOpen,
      popupclose: this.onPopupClose,
    })
    this.context.map.removeLayer(this.leafletElement)

    super.componentWillUnmount()
  }

  onPopupOpen = ({ popup }: { popup: LeafletElement }) => {
    if (popup === this.leafletElement) {
      this.onOpen()
    }
  }

  onPopupClose = ({ popup }: { popup: LeafletElement }) => {
    if (popup === this.leafletElement) {
      this.onClose()
    }
  }

  onRender = () => {
    if (this.props.autoPan !== false && this.leafletElement.isOpen()) {
      if (this.leafletElement._map && this.leafletElement._map._panAnim) {
        this.leafletElement._map._panAnim = undefined
      }
      this.leafletElement._adjustPan()
    }
  }
}
