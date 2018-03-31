// @flow

import PropTypes from 'prop-types'
import { Children } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import MapComponent from './MapComponent'
import updateClassName from './utils/updateClassName'
import type { DivOverlayProps } from './types'

type DivOverlayTypes = {
  _container: HTMLDivElement,
  _contentNode: HTMLDivElement,
  isOpen: () => boolean,
  update: () => void,
}

export default class DivOverlay<
  LeafletElement,
  Props: DivOverlayProps,
> extends MapComponent<LeafletElement & DivOverlayTypes, Props> {
  static propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
  }

  updateLeafletElement(prevProps: Props, props: Props) {} // eslint-disable-line

  componentDidUpdate(prevProps: Props) {
    updateClassName(
      this.leafletElement._container,
      prevProps.className,
      this.props.className,
    )

    this.updateLeafletElement(prevProps, this.props)

    if (this.leafletElement.isOpen()) {
      this.renderContent()
    }
  }

  onClose = () => {
    this.removeContent()
    if (this.props.onClose) {
      this.props.onClose()
    }
  }

  onOpen = () => {
    this.renderContent()
    if (this.props.onOpen) {
      this.props.onOpen()
    }
  }

  onRender() {}

  renderContent = () => {
    if (this.props.children == null) {
      this.removeContent()
    } else {
      render(
        Children.only(this.props.children),
        this.leafletElement._contentNode,
        () => {
          this.leafletElement.update()
          this.onRender()
        },
      )
    }
  }

  removeContent = () => {
    if (this.leafletElement._contentNode) {
      unmountComponentAtNode(this.leafletElement._contentNode)
    }
  }

  render() {
    return null
  }
}
