import { renderHook } from '@testing-library/react'

import { useAttribution } from '../src'

describe('attribution', () => {
  test('useAttribution() adds and removes the attribution', () => {
    const attributionControl = {
      addAttribution: jest.fn(),
      removeAttribution: jest.fn(),
    }
    const map = { attributionControl }

    const { rerender } = renderHook((p) => useAttribution(map, p.attribution), {
      initialProps: {},
    })

    rerender({ attribution: 'foo' })
    expect(attributionControl.addAttribution).toHaveBeenCalledTimes(1)
    expect(attributionControl.removeAttribution).toHaveBeenCalledTimes(0)

    rerender({ attribution: 'foo' })
    expect(attributionControl.addAttribution).toHaveBeenCalledTimes(1)
    expect(attributionControl.removeAttribution).toHaveBeenCalledTimes(0)

    rerender({ attribution: 'bar' })
    expect(attributionControl.addAttribution).toHaveBeenCalledTimes(2)
    expect(attributionControl.addAttribution).toHaveBeenCalledWith('bar')
    expect(attributionControl.removeAttribution).toHaveBeenCalledTimes(1)
    expect(attributionControl.removeAttribution).toHaveBeenCalledWith('foo')

    rerender({ attribution: null })
    expect(attributionControl.removeAttribution).toHaveBeenCalledTimes(2)
    expect(attributionControl.removeAttribution).toHaveBeenLastCalledWith('bar')
  })
})
