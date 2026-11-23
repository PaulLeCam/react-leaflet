import { jest } from '@jest/globals'
import { renderHook } from '@testing-library/react'

import { type PathProps, usePathOptions } from '../src'

describe('path', () => {
  test('usePathOptions() updates path style', () => {
    const setStyle = jest.fn()
    const element = { instance: { setStyle } }

    const firstOptions = { color: 'red' }
    const { rerender } = renderHook(
      (props: PathProps) => usePathOptions(element, props),
      { initialProps: {} },
    )
    expect(setStyle).not.toHaveBeenCalled()

    rerender({ pathOptions: firstOptions })
    expect(setStyle).toHaveBeenCalledTimes(1)

    rerender({ pathOptions: firstOptions })
    expect(setStyle).toHaveBeenCalledTimes(1)

    const secondOptions = { color: 'blue' }
    rerender({ pathOptions: secondOptions })
    expect(setStyle).toHaveBeenCalledTimes(2)
    expect(setStyle).toHaveBeenCalledWith(secondOptions)

    rerender({})
    expect(setStyle).toHaveBeenCalledTimes(3)
    expect(setStyle.mock.calls[2][0]).toEqual({})

    rerender({})
    expect(setStyle).toHaveBeenCalledTimes(3)
  })
})
