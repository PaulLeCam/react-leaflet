// @flow

import { Layer, SVGOverlay as LeafletSVGOverlay } from 'leaflet'
import { createPortal } from 'react-dom'

import type { SVGOverlayProps } from './types'
import { withLeaflet } from './context'
import MapComponent from './MapComponent'

type LeafletElement = LeafletSVGOverlay
type Props = SVGOverlayProps

class SVGOverlay extends MapComponent<LeafletElement, Props> {
  leafletElement: LeafletElement
  container: ?Element

  constructor(props: Props) {
    super(props)
    this.leafletElement = this.createLeafletElement(props)
  }

  get layerContainer(): Layer {
    return this.props.leaflet.layerContainer || this.props.leaflet.map
  }

  createLeafletElement(props: Props): LeafletElement {
    this.container = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg',
    )
    return new LeafletSVGOverlay(
      this.container,
      props.bounds,
      this.getOptions(props),
    )
  }

  updateLeafletElement(fromProps: Props, toProps: Props) {
    if (toProps.bounds !== fromProps.bounds) {
      this.leafletElement.setBounds(toProps.bounds)
    }
    if (toProps.opacity !== fromProps.opacity) {
      this.leafletElement.setOpacity(toProps.opacity)
    }
    if (toProps.zIndex !== fromProps.zIndex) {
      this.leafletElement.setZIndex(toProps.zIndex)
    }
  }

  componentDidMount() {
    super.componentDidMount()
    this.layerContainer.addLayer(this.leafletElement)
  }

  componentDidUpdate(prevProps: Props) {
    super.componentDidUpdate(prevProps)

    if (this.props.attribution !== prevProps.attribution) {
      const { map } = this.props.leaflet
      if (map != null && map.attributionControl != null) {
        map.attributionControl.removeAttribution(prevProps.attribution)
        map.attributionControl.addAttribution(this.props.attribution)
      }
    }

    this.updateLeafletElement(prevProps, this.props)
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.layerContainer.removeLayer(this.leafletElement)
    this.container = null
  }

  render() {
    const { children } = this.props
    if (children == null || this.container == null) {
      return null
    }

    return createPortal(children, this.container)
  }
}

export default withLeaflet<Props, SVGOverlay>(SVGOverlay)
