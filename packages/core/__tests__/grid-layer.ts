import { updateGridLayer } from '../src'

describe('grid-layer', () => {
  test('updateGridLayer() updates the opacity', () => {
    const opacity = 0.5
    const layer = {
      setOpacity: jest.fn(),
    }

    // No change when opacity is the same
    updateGridLayer(layer, { opacity }, { opacity })
    expect(layer.setOpacity).toHaveBeenCalledTimes(0)

    // No change when opacity is nullish
    updateGridLayer(layer, { opacity: undefined }, { opacity })
    expect(layer.setOpacity).toHaveBeenCalledTimes(0)

    updateGridLayer(layer, { opacity: 1 }, { opacity })
    expect(layer.setOpacity).toHaveBeenCalledTimes(1)
    expect(layer.setOpacity).toHaveBeenCalledWith(1)
  })

  test('updateGridLayer() updates the zIndex', () => {
    const zIndex = 10
    const layer = {
      setZIndex: jest.fn(),
    }

    // No change when zIndex is the same
    updateGridLayer(layer, { zIndex }, { zIndex })
    expect(layer.setZIndex).toHaveBeenCalledTimes(0)

    // No change when zIndex is nullish
    updateGridLayer(layer, { zIndex: null }, { zIndex })
    expect(layer.setZIndex).toHaveBeenCalledTimes(0)

    updateGridLayer(layer, { zIndex: 20 }, { zIndex })
    expect(layer.setZIndex).toHaveBeenCalledTimes(1)
    expect(layer.setZIndex).toHaveBeenCalledWith(20)
  })
})
