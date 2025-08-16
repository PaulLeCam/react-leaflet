import { jest } from '@jest/globals'
import { renderHook } from '@testing-library/react'
import { Layer } from 'leaflet'

import { useEventHandlers } from '../src'

describe('events', () => {
  test('useEventHandlers() attaches the event handlers', () => {
    const layer = new Layer()
    const handlers = {
      click: jest.fn(),
      dblclick: jest.fn(),
    }
    renderHook(() => useEventHandlers({ instance: layer }, handlers))

    layer.fire('click')
    layer.fire('click')
    layer.fire('dblclick')

    expect(handlers.click).toHaveBeenCalledTimes(2)
    expect(handlers.dblclick).toHaveBeenCalledTimes(1)
  })

  test('useEventHandlers() updates the event handlers', () => {
    const layer = new Layer()
    const element = { instance: layer }

    const clickHandler = jest.fn()
    const dblclickHandler1 = jest.fn()
    const dblclickHandler2 = jest.fn()

    const { rerender } = renderHook(
      ({ handlers }) => useEventHandlers(element, handlers),
      {
        initialProps: {
          handlers: { click: clickHandler, dblclick: dblclickHandler1 },
        },
      },
    )
    layer.fire('click')
    layer.fire('dblclick')

    rerender({ handlers: { click: clickHandler, dblclick: dblclickHandler2 } })
    layer.fire('click')
    layer.fire('dblclick')

    expect(clickHandler).toHaveBeenCalledTimes(2)
    expect(dblclickHandler1).toHaveBeenCalledTimes(1)
    expect(dblclickHandler2).toHaveBeenCalledTimes(1)
  })
})
