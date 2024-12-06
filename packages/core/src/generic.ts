import type {
  Control,
  ControlOptions,
  FeatureGroup,
  Layer,
  Path,
} from 'leaflet'
import type { PropsWithoutRef } from 'react'

import {
  type PropsWithChildren,
  createContainerComponent,
  createDivOverlayComponent,
  createLeafComponent,
} from './component.js'
import type { LeafletContextInterface } from './context.js'
import { createControlHook } from './control.js'
import {
  type DivOverlay,
  type DivOverlayLifecycleHook,
  createDivOverlayHook,
} from './div-overlay.js'
import {
  type LeafletElement,
  createElementHook,
  createElementObject,
} from './element.js'
import { type LayerProps, createLayerHook } from './layer.js'
import { type PathProps, createPathHook } from './path.js'

interface LayerWithChildrenProps extends LayerProps, PropsWithChildren {}
interface PathWithChildrenProps extends PathProps, PropsWithChildren {}

export function createControlComponent<
  E extends Control,
  P extends ControlOptions,
>(createInstance: (props: PropsWithoutRef<P>) => E) {
  function createElement(
    props: PropsWithoutRef<P>,
    context: LeafletContextInterface,
  ): LeafletElement<E> {
    return createElementObject(createInstance(props), context)
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
    props: PropsWithoutRef<P>,
    context: LeafletContextInterface,
  ) => LeafletElement<E>,
  updateElement?: (
    instance: E,
    props: PropsWithoutRef<P>,
    prevProps: PropsWithoutRef<P>,
  ) => void,
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
    props: PropsWithoutRef<P>,
    context: LeafletContextInterface,
  ) => LeafletElement<E>,
  useLifecycle: DivOverlayLifecycleHook<E, PropsWithoutRef<P>>,
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
    props: PropsWithoutRef<P>,
    context: LeafletContextInterface,
  ) => LeafletElement<E>,
  updateElement?: (
    instance: E,
    props: PropsWithoutRef<P>,
    prevProps: PropsWithoutRef<P>,
  ) => void,
) {
  const useElement = createElementHook(createElement, updateElement)
  const usePath = createPathHook(useElement)
  return createContainerComponent(usePath)
}

export function createTileLayerComponent<E extends Layer, P extends LayerProps>(
  createElement: (
    props: PropsWithoutRef<P>,
    context: LeafletContextInterface,
  ) => LeafletElement<E>,
  updateElement?: (
    instance: E,
    props: PropsWithoutRef<P>,
    prevProps: PropsWithoutRef<P>,
  ) => void,
) {
  const useElement = createElementHook(createElement, updateElement)
  const useLayer = createLayerHook(useElement)
  return createLeafComponent(useLayer)
}
