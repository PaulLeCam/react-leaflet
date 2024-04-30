import { render } from '@testing-library/react'
import React from 'react'

import {
  createControlComponent,
  createLayerComponent,
  createOverlayComponent,
  createPathComponent,
  createTileLayerComponent,
} from '../src'

import { createWrapper } from './context'

describe('generic', () => {
  function createContext() {
    return { map: { addLayer: jest.fn(), removeLayer: jest.fn() } }
  }

  test('createControlComponent()', () => {
    const context = createContext()
    const control = { addTo: jest.fn(), remove: jest.fn() }
    const createControl = jest.fn(() => control)
    const Component = createControlComponent(createControl)
    render(<Component />, { wrapper: createWrapper(context) })
    expect(createControl).toHaveBeenCalled()
  })

  test('createLayerComponent()', () => {
    const context = createContext()
    const createElement = jest.fn(() => ({ instance: {}, context }))
    const Component = createLayerComponent(createElement)
    render(<Component />, { wrapper: createWrapper(context) })
    expect(createElement).toHaveBeenCalled()
  })

  test('createOverlayComponent()', () => {
    const context = createContext()
    const createElement = jest.fn(() => ({ instance: {}, context }))
    const Component = createOverlayComponent(createElement, jest.fn())
    render(<Component />, { wrapper: createWrapper(context) })
    expect(createElement).toHaveBeenCalled()
  })

  test('createPathComponent()', () => {
    const context = createContext()
    const createElement = jest.fn(() => ({ instance: {}, context }))
    const Component = createPathComponent(createElement)
    render(<Component />, { wrapper: createWrapper(context) })
    expect(createElement).toHaveBeenCalled()
  })

  test('createTileLayerComponent()', () => {
    const context = createContext()
    const createElement = jest.fn(() => ({ instance: {}, context }))
    const Component = createTileLayerComponent(createElement)
    render(<Component />, { wrapper: createWrapper(context) })
    expect(createElement).toHaveBeenCalled()
  })
})
