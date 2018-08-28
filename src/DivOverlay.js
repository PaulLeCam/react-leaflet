// @flow

import { createPortal } from 'react-dom'

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

  createLeafletElement(_props: Props) {
    throw new Error('createLeafletElement() must be implemented')
  }

  updateLeafletElement(_prevProps: Props, _props: Props) {}

  componentDidUpdate(prevProps: Props) {
    updateClassName(
      this.leafletElement._container,
      prevProps.className,
      this.props.className,
    )

    this.updateLeafletElement(prevProps, this.props)

    if (this.leafletElement.isOpen()) {
      this.leafletElement.update()
      this.onRender()
    }
  }

  onClose = () => {
    if (this.props.onClose) {
      this.props.onClose()
    }
  }

  onOpen = () => {
    this.forceUpdate() // Re-render now that leafletElement is created
    if (this.props.onOpen) {
      this.props.onOpen()
    }
  }

  onRender() {}

  render() {
    if (this.leafletElement._contentNode) {
      return createPortal(this.props.children, this.leafletElement._contentNode)
    }
    return null
  }
}
