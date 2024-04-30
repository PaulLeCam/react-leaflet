import { renderHook } from '@testing-library/react-hooks'

import { usePathOptions } from '../src'

describe('path', () => {
  test('usePathOptions() updates path style', () => {
    const setStyle = jest.fn()
    const element = { instance: { setStyle } }

    const firstOptions = { stroke: 1 }
    const { rerender } = renderHook((p) => usePathOptions(element, p), {
      initialProps: { pathOptions: firstOptions },
    })
    expect(setStyle).toBeCalledTimes(1)

    rerender({ pathOptions: firstOptions })
    expect(setStyle).toBeCalledTimes(1)

    const secondOptions = { stroke: 2 }
    rerender({ pathOptions: secondOptions })
    expect(setStyle).toBeCalledTimes(2)
    expect(setStyle).toBeCalledWith(secondOptions)

    rerender({ pathOptions: null })
    expect(setStyle).toBeCalledTimes(3)
    expect(setStyle.mock.calls[2][0]).toEqual({})
  })
})
