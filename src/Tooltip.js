// @flow

import { Tooltip as LeafletTooltip } from 'leaflet'
import PropTypes from 'prop-types'

import DivOverlay from './DivOverlay'
import layer from './propTypes/layer'
import map from './propTypes/map'
import type { DivOverlayProps } from './types'

type LeafletElement = LeafletTooltip
type Props = DivOverlayProps

export default class Tooltip extends DivOverlay<LeafletElement, Props> {
  static propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
  }

  static contextTypes = {
    map: map,
    popupContainer: layer,
    pane: PropTypes.string,
  }

  static defaultProps = {
    pane: 'tooltipPane',
  }

  createLeafletElement(props: Props): LeafletElement {
    return new LeafletTooltip(
      this.getOptions(props),
      this.context.popupContainer,
    )
  }

  componentWillMount() {
    super.componentWillMount()
    this.leafletElement = this.createLeafletElement(this.props)

    this.context.popupContainer.on({
      tooltipopen: this.onTooltipOpen,
      tooltipclose: this.onTooltipClose,
    })
  }

  componentDidMount() {
    this.context.popupContainer.bindTooltip(this.leafletElement)
  }

  componentWillUnmount() {
    const { popupContainer } = this.context

    this.removeContent()

    popupContainer.off({
      tooltipopen: this.onTooltipOpen,
      tooltipclose: this.onTooltipClose,
    })
    if (popupContainer._map != null) {
      popupContainer.unbindTooltip(this.leafletElement)
    }

    super.componentWillUnmount()
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
