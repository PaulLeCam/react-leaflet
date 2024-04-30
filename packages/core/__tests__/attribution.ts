import { renderHook } from '@testing-library/react-hooks'

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
    expect(attributionControl.addAttribution).toBeCalledTimes(1)
    expect(attributionControl.removeAttribution).toBeCalledTimes(0)

    rerender({ attribution: 'foo' })
    expect(attributionControl.addAttribution).toBeCalledTimes(1)
    expect(attributionControl.removeAttribution).toBeCalledTimes(0)

    rerender({ attribution: 'bar' })
    expect(attributionControl.addAttribution).toBeCalledTimes(2)
    expect(attributionControl.addAttribution).toBeCalledWith('bar')
    expect(attributionControl.removeAttribution).toBeCalledTimes(1)
    expect(attributionControl.removeAttribution).toBeCalledWith('foo')

    rerender({ attribution: null })
    expect(attributionControl.removeAttribution).toBeCalledTimes(2)
    expect(attributionControl.removeAttribution).toHaveBeenLastCalledWith('bar')
  })
})
