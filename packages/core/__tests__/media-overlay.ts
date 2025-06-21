import { jest } from '@jest/globals'
import { LatLngBounds } from 'leaflet'

import { updateMediaOverlay } from '../src'

describe('media-overlay', () => {
  test('updateMediaOverlay() updates the bounds', () => {
    const bounds = new LatLngBounds([10, 10], [20, 20])
    const overlay = {
      setBounds: jest.fn(),
    }

    // No change when bounds are the same
    updateMediaOverlay(overlay, { bounds }, { bounds })
    expect(overlay.setBounds).toHaveBeenCalledTimes(0)

    // No change when bounds are not an instance of LatLngBounds
    updateMediaOverlay(overlay, { bounds: [] }, { bounds })
    expect(overlay.setBounds).toHaveBeenCalledTimes(0)

    const newBounds = new LatLngBounds([11, 11], [20, 20])
    updateMediaOverlay(overlay, { bounds: newBounds }, { bounds })
    expect(overlay.setBounds).toHaveBeenCalledTimes(1)
    expect(overlay.setBounds).toHaveBeenCalledWith(newBounds)
  })

  test('updateMediaOverlay() updates the opacity', () => {
    const opacity = 0.5
    const overlay = {
      setOpacity: jest.fn(),
    }

    // No change when opacity is the same
    updateMediaOverlay(overlay, { opacity }, { opacity })
    expect(overlay.setOpacity).toHaveBeenCalledTimes(0)

    // No change when opacity is nullish
    updateMediaOverlay(overlay, { opacity: undefined }, { opacity })
    expect(overlay.setOpacity).toHaveBeenCalledTimes(0)

    updateMediaOverlay(overlay, { opacity: 1 }, { opacity })
    expect(overlay.setOpacity).toHaveBeenCalledTimes(1)
    expect(overlay.setOpacity).toHaveBeenCalledWith(1)
  })

  test('updateMediaOverlay() updates the zIndex', () => {
    const zIndex = 10
    const overlay = {
      setZIndex: jest.fn(),
    }

    // No change when zIndex is the same
    updateMediaOverlay(overlay, { zIndex }, { zIndex })
    expect(overlay.setZIndex).toHaveBeenCalledTimes(0)

    // No change when zIndex is nullish
    updateMediaOverlay(overlay, { zIndex: null }, { zIndex })
    expect(overlay.setZIndex).toHaveBeenCalledTimes(0)

    updateMediaOverlay(overlay, { zIndex: 20 }, { zIndex })
    expect(overlay.setZIndex).toHaveBeenCalledTimes(1)
    expect(overlay.setZIndex).toHaveBeenCalledWith(20)
  })
})
