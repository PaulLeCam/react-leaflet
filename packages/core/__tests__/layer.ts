import { renderHook } from '@testing-library/react-hooks'

import { useAttribution, useLayerLifecycle } from '../src'

describe('layer', () => {
  test('useAttribution() adds and removes the attribution', () => {
    const attributionControl = {
      addAttribution: jest.fn(),
      removeAttribution: jest.fn(),
    }
    const map = { attributionControl }

    const { rerender } = renderHook((p) => useAttribution(map, p.attribution), {
      initialProps: { attribution: 'foo' },
    })

    rerender({ attribution: 'foo' })
    expect(attributionControl.addAttribution).toBeCalledTimes(0)
    expect(attributionControl.removeAttribution).toBeCalledTimes(0)

    rerender({ attribution: 'bar' })
    expect(attributionControl.addAttribution).toBeCalledTimes(1)
    expect(attributionControl.addAttribution).toBeCalledWith('bar')
    expect(attributionControl.removeAttribution).toBeCalledTimes(1)
    expect(attributionControl.removeAttribution).toBeCalledWith('foo')

    rerender({ attribution: null })
    expect(attributionControl.removeAttribution).toBeCalledTimes(2)
    expect(attributionControl.removeAttribution).toHaveBeenLastCalledWith('bar')
  })

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

  test('useLayerLifecycle() adds and removes the layer to the layerContainer when set', () => {
    const map = { addLayer: jest.fn(), removeLayer: jest.fn() }
    const layerContainer = { addLayer: jest.fn(), removeLayer: jest.fn() }
    const context = { layerContainer, map }

    const element = { instance: jest.fn() }
    const { unmount } = renderHook(() => useLayerLifecycle(element, context))
    expect(layerContainer.addLayer).toBeCalledTimes(1)
    expect(layerContainer.addLayer).toBeCalledWith(element.instance)

    unmount()
    expect(layerContainer.removeLayer).toBeCalledTimes(1)
    expect(layerContainer.removeLayer).toBeCalledWith(element.instance)

    expect(map.addLayer).toBeCalledTimes(0)
    expect(map.removeLayer).toBeCalledTimes(0)
  })
})
