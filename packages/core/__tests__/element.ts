import { renderHook } from '@testing-library/react'

import { createElementHook } from '../src'

describe('element', () => {
  test('calls the element creation function', () => {
    const context = { map: undefined }
    const props = { test: true }
    const createElementMock = jest.fn()

    const useElement = createElementHook(createElementMock)
    renderHook(() => useElement(props, context))

    expect(createElementMock).toHaveBeenCalledTimes(1)
    expect(createElementMock).toHaveBeenCalledWith(props, context)
  })

  test('calls the element update function', () => {
    const context = { map: undefined }
    const instance = {}
    const createElementMock = jest.fn(() => ({ instance, context }))
    const updateElementMock = jest.fn()
    const useElement = createElementHook(createElementMock, updateElementMock)

    const { rerender } = renderHook((p) => useElement(p, context), {
      initialProps: { test: true },
    })
    expect(createElementMock).toHaveBeenCalledTimes(1)
    expect(updateElementMock).toHaveBeenCalledTimes(0)

    rerender({ test: false })
    expect(updateElementMock).toHaveBeenCalledTimes(1)
    expect(updateElementMock).toHaveBeenCalledWith(
      instance,
      { test: false },
      { test: true },
    )

    rerender({ test: false })
    expect(updateElementMock).toHaveBeenCalledTimes(2)
    expect(updateElementMock).toHaveBeenCalledWith(
      instance,
      { test: false },
      { test: false },
    )
  })
})
