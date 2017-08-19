// @flow

import { Tooltip as LeafletTooltip } from 'leaflet'
import PropTypes from 'prop-types'
import { Children, type Element } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import MapComponent from './MapComponent'
import layer from './propTypes/layer'
import map from './propTypes/map'

type LeafletElement = LeafletTooltip
type Props = {
  children: Element<any>,
  onClose?: () => void,
  onOpen?: () => void,
  pane?: string,
}

export default class Tooltip extends MapComponent<LeafletElement, Props> {
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

  componentDidUpdate() {
    if (this.leafletElement.isOpen()) {
      this.renderTooltipContent()
    }
  }

  componentWillUnmount() {
    this.context.popupContainer.off({
      tooltipopen: this.onTooltipOpen,
      tooltipclose: this.onTooltipClose,
    })
    this.context.map.removeLayer(this.leafletElement)
    super.componentWillUnmount()
  }

  onTooltipOpen = ({ tooltip }: { tooltip: LeafletElement }) => {
    if (tooltip === this.leafletElement) {
      this.renderTooltipContent()
      if (this.props.onOpen) {
        this.props.onOpen()
      }
    }
  }

  onTooltipClose = ({ tooltip }: { tooltip: LeafletElement }) => {
    if (tooltip === this.leafletElement) {
      this.removeTooltipContent()
      if (this.props.onClose) {
        this.props.onClose()
      }
    }
  }

  renderTooltipContent = () => {
    if (this.props.children == null) {
      this.removeTooltipContent()
    } else {
      render(
        Children.only(this.props.children),
        this.leafletElement._contentNode,
      )
      this.leafletElement.update()
    }
  }

  removeTooltipContent = () => {
    if (this.leafletElement._contentNode) {
      unmountComponentAtNode(this.leafletElement._contentNode)
    }
  }

  render() {
    return null
  }
}
