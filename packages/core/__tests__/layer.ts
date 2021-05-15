import { renderHook } from '@testing-library/react-hooks'

import { useLayerLifecycle } from '../src'

describe('layer', () => {
  test('useLayerLifecycle() adds and removes the layer to the map', () => {
    const map = { addLayer: jest.fn(), removeLayer: jest.fn() }
    const context = { map }

    const element = jest.fn()
    const { unmount } = renderHook(() => useLayerLifecycle(element, context))
    expect(map.addLayer).toBeCalledTimes(1)
    expect(map.addLayer).toBeCalledWith(element.instance)

    unmount()
    expect(map.removeLayer).toBeCalledTimes(1)
    expect(map.removeLayer).toBeCalledWith(element.instance)
  })

  test('useLayerLifecycle() adds the layer to the layerContainer when set and removes from the map', () => {
    const map = { addLayer: jest.fn(), removeLayer: jest.fn() }
    const layerContainer = { addLayer: jest.fn(), removeLayer: jest.fn() }
    const context = { layerContainer, map }

    const element = { instance: jest.fn() }
    const { unmount } = renderHook(() => useLayerLifecycle(element, context))
    expect(layerContainer.addLayer).toBeCalledTimes(1)
    expect(layerContainer.addLayer).toBeCalledWith(element.instance)

    unmount()
    expect(layerContainer.removeLayer).toBeCalledTimes(0)

    expect(map.addLayer).toBeCalledTimes(0)
    expect(map.removeLayer).toBeCalledTimes(1)
    expect(map.removeLayer).toBeCalledWith(element.instance)
  })
})
