import type {
  Control,
  ControlOptions,
  FeatureGroup,
  Layer,
  Path,
} from 'leaflet'

import {
  type PropsWithChildren,
  createContainerComponent,
  createDivOverlayComponent,
  createLeafComponent,
} from './component.js'
import type { LeafletContextInterface } from './context.js'
import { createControlHook } from './control.js'
import { type LeafletElement, createElementHook } from './element.js'
import { type LayerProps, createLayerHook } from './layer.js'
import {
  type DivOverlay,
  type DivOverlayLifecycleHook,
  createDivOverlayHook,
} from './div-overlay.js'
import { type PathProps, createPathHook } from './path.js'

interface LayerWithChildrenProps extends LayerProps, PropsWithChildren {}
interface PathWithChildrenProps extends PathProps, PropsWithChildren {}

export function createControlComponent<
  E extends Control,
  P extends ControlOptions,
>(createInstance: (props: P) => E) {
  function createElement(
    props: P,
    context: LeafletContextInterface,
  ): LeafletElement<E> {
    return { instance: createInstance(props), context }
  }
  const useElement = createElementHook(createElement)
  const useControl = createControlHook(useElement)
  return createLeafComponent(useControl)
}

export function createLayerComponent<
  E extends Layer,
  P extends LayerWithChildrenProps,
>(
  createElement: (
    props: P,
    context: LeafletContextInterface,
  ) => LeafletElement<E>,
  updateElement?: (instance: E, props: P, prevProps: P) => void,
) {
  const useElement = createElementHook(createElement, updateElement)
  const useLayer = createLayerHook(useElement)
  return createContainerComponent(useLayer)
}

export function createOverlayComponent<
  E extends DivOverlay,
  P extends LayerWithChildrenProps,
>(
  createElement: (
    props: P,
    context: LeafletContextInterface,
  ) => LeafletElement<E>,
  useLifecycle: DivOverlayLifecycleHook<E, P>,
) {
  const useElement = createElementHook(createElement)
  const useOverlay = createDivOverlayHook(useElement, useLifecycle)
  return createDivOverlayComponent(useOverlay)
}

export function createPathComponent<
  E extends FeatureGroup | Path,
  P extends PathWithChildrenProps,
>(
  createElement: (
    props: P,
    context: LeafletContextInterface,
  ) => LeafletElement<E>,
  updateElement?: (instance: E, props: P, prevProps: P) => void,
) {
  const useElement = createElementHook(createElement, updateElement)
  const usePath = createPathHook(useElement)
  return createContainerComponent(usePath)
}

export function createTileLayerComponent<E extends Layer, P extends LayerProps>(
  createElement: (
    props: P,
    context: LeafletContextInterface,
  ) => LeafletElement<E>,
  updateElement?: (instance: E, props: P, prevProps: P) => void,
) {
  const useElement = createElementHook(createElement, updateElement)
  const useLayer = createLayerHook(useElement)
  return createLeafComponent(useLayer)
}
