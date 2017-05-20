// @flow

import { tooltip as createTooltip } from 'leaflet'
import PropTypes from 'prop-types'
import { Children } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import mapType from './propTypes/map'

import MapComponent from './MapComponent'

export default class Tooltip extends MapComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  static contextTypes = {
    map: mapType,
    popupContainer: PropTypes.object,
    pane: PropTypes.string,
  }

  createLeafletElement(props: Object): Object {
    const { children: _children, ...options } = props
    return createTooltip(this.getOptions(options), this.context.popupContainer)
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

  onTooltipOpen = ({ tooltip }: Object): void => {
    if (tooltip === this.leafletElement) {
      this.renderTooltipContent()
    }
  }

  onTooltipClose = ({ tooltip }: Object): void => {
    if (tooltip === this.leafletElement) {
      this.removeTooltipContent()
    }
  }

  renderTooltipContent = (): void => {
    if (this.props.children) {
      render(
        Children.only(this.props.children),
        this.leafletElement._contentNode,
      )
      this.leafletElement.update()
    } else {
      this.removeTooltipContent()
    }
  }

  removeTooltipContent = (): void => {
    if (this.leafletElement._contentNode) {
      unmountComponentAtNode(this.leafletElement._contentNode)
    }
  }

  render(): null {
    return null
  }
}
