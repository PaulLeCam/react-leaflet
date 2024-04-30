import { renderHook } from '@testing-library/react'

import { usePathOptions } from '../src'

describe('path', () => {
  test('usePathOptions() updates path style', () => {
    const setStyle = jest.fn()
    const element = { instance: { setStyle } }

    const firstOptions = { stroke: 1 }
    const { rerender } = renderHook((p) => usePathOptions(element, p), {
      initialProps: { pathOptions: firstOptions },
    })
    expect(setStyle).toHaveBeenCalledTimes(1)

    rerender({ pathOptions: firstOptions })
    expect(setStyle).toHaveBeenCalledTimes(1)

    const secondOptions = { stroke: 2 }
    rerender({ pathOptions: secondOptions })
    expect(setStyle).toHaveBeenCalledTimes(2)
    expect(setStyle).toHaveBeenCalledWith(secondOptions)

    rerender({ pathOptions: null })
    expect(setStyle).toHaveBeenCalledTimes(3)
    expect(setStyle.mock.calls[2][0]).toEqual({})
  })
})
