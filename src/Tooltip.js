// @flow

import { Tooltip as LeafletTooltip } from 'leaflet'

import { withLeaflet } from './context'
import DivOverlay from './DivOverlay'
import type { DivOverlayProps } from './types'

type LeafletElement = LeafletTooltip
type Props = DivOverlayProps

class Tooltip extends DivOverlay<LeafletElement, Props> {
  static defaultProps = {
    pane: 'tooltipPane',
  }

  createLeafletElement(props: Props): LeafletElement {
    return new LeafletTooltip(
      this.getOptions(props),
      props.leaflet.popupContainer,
    )
  }

  componentDidMount() {
    const { popupContainer } = this.props.leaflet
    if (popupContainer == null) return

    popupContainer.on({
      tooltipopen: this.onTooltipOpen,
      tooltipclose: this.onTooltipClose,
    })
    popupContainer.bindTooltip(this.leafletElement)
  }

  componentWillUnmount() {
    const { popupContainer } = this.props.leaflet
    if (popupContainer == null) return

    popupContainer.off({
      tooltipopen: this.onTooltipOpen,
      tooltipclose: this.onTooltipClose,
    })
    if (popupContainer._map != null) {
      popupContainer.unbindTooltip(this.leafletElement)
    }
  }

  onTooltipOpen = ({ tooltip }: { tooltip: LeafletElement }) => {
    if (tooltip === this.leafletElement) {
      this.onOpen()
    }
  }

  onTooltipClose = ({ tooltip }: { tooltip: LeafletElement }) => {
    if (tooltip === this.leafletElement) {
      this.onClose()
    }
  }
}

export default withLeaflet(Tooltip)
