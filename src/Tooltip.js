/* @flow */

import { tooltip as createTooltip } from 'leaflet'
import { Children, PropTypes } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import mapType from './types/map'

import MapComponent from './MapComponent'

export default class Tooltip extends MapComponent {
  static propTypes = {
    children: PropTypes.node,
  };

  static contextTypes = {
    map: mapType,
    popupContainer: PropTypes.object,
    pane: PropTypes.string,
  };

  componentWillMount () {
    super.componentWillMount()
    const { children: _children, ...props } = this.props

    this.leafletElement = createTooltip(this.getOptions(props), this.context.popupContainer)

    this.context.popupContainer.on({
      tooltipopen: this.onTooltipOpen,
      tooltipclose: this.onTooltipClose,
    })
  }

  componentDidMount () {
    this.context.popupContainer.bindTooltip(this.leafletElement)
  }

  componentDidUpdate () {
    if (this.leafletElement.isOpen()) {
      this.renderTooltipContent()
    }
  }

  componentWillUnmount () {
    this.context.popupContainer.off({
      tooltipopen: this.onTooltipOpen,
      tooltipclose: this.onTooltipClose,
    })
    this.context.map.removeLayer(this.leafletElement)
    super.componentWillUnmount()
  }

  onTooltipOpen = ({ tooltip }: Object) => {
    if (tooltip === this.leafletElement) {
      this.renderTooltipContent()
    }
  }

  onTooltipClose = ({ tooltip }: Object) => {
    if (tooltip === this.leafletElement) {
      this.removeTooltipContent()
    }
  }

  renderTooltipContent = () => {
    if (this.props.children) {
      render(
        Children.only(this.props.children),
        this.leafletElement._contentNode
      )
      this.leafletElement.update()
    } else {
      this.removeTooltipContent()
    }
  }

  removeTooltipContent = () => {
    if (this.leafletElement._contentNode) {
      unmountComponentAtNode(this.leafletElement._contentNode)
    }
  }

  render () {
    return null
  }
}
