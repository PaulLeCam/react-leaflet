import { Control, ControlOptions, FeatureGroup, Layer, Path } from 'leaflet'

import {
  PropsWithChildren,
  createContainerComponent,
  createDivOverlayComponent,
  createLeafComponent,
} from './component'
import { LeafletContextInterface } from './context'
import { createControlHook } from './control'
import { LeafletElement, createElementHook } from './element'
import { LayerProps, createLayerHook } from './layer'
import {
  DivOverlay,
  DivOverlayLifecycleHook,
  createDivOverlayHook,
} from './div-overlay'
import { PathProps, createPathHook } from './path'

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
