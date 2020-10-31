import { Circle, LatLngExpression } from 'leaflet'

import { updateCircle } from '../src'

describe('circle', () => {
  const center1: LatLngExpression = { lat: 10, lng: 10 }
  const center2: LatLngExpression = { lat: 20, lng: 20 }
  const radius1 = 10
  const radius2 = 20

  test('updateCircle() updates the center', () => {
    const layer = new Circle(center1)
    updateCircle(layer, { center: center2 }, { center: center1 })
    expect(layer.getLatLng()).toEqual(center2)
  })

  test('updateCircle() updates the radius', () => {
    const options = { center: center1, radius: radius1 }
    const layer = new Circle(center1, options)
    updateCircle(layer, { center: center1, radius: radius2 }, options)
    expect(layer.getRadius()).toBe(radius2)
  })

  test('updateCircle() makes no changes if not necessary', () => {
    const options = { center: center1, radius: radius1 }
    const layer = new Circle(center1, options)
    updateCircle(layer, options, options)
    expect(layer.getLatLng()).toEqual(center1)
    expect(layer.getRadius()).toBe(radius1)
  })
})
