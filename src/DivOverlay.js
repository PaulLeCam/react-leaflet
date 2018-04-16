// @flow

import React, { Fragment } from 'react'
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
  constructor(props: Props) {
    super(props)
    this.leafletElement = this.createLeafletElement(props)
  }

  // eslint-disable-next-line no-unused-vars
  createLeafletElement(props: Props) {
    throw new Error('createLeafletElement() must be implemented')
  }

  // eslint-disable-next-line no-unused-vars
  updateLeafletElement(prevProps: Props, props: Props) {}

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
        <Fragment>{this.props.children}</Fragment>,
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
