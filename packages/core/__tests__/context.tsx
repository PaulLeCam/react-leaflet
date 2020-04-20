import { renderHook } from '@testing-library/react-hooks'
import React, { ReactNode } from 'react'

import { LeafletProvider, useLeafletContext } from '../src'

describe('context', () => {
  test('useLeafletContext() throws an error when there is no provider', () => {
    expect(() => {
      const { result } = renderHook(() => useLeafletContext())
      return result.current
    }).toThrow(
      'No context provided: useLeafletContext() can only be used in a descendant of <MapContainer>',
    )
  })

  test('useLeafletContext() provides the context', () => {
    const context = { map: true }
    const wrapper = ({ children }: { children: ReactNode }) => (
      <LeafletProvider value={context}>{children}</LeafletProvider>
    )
    const { result } = renderHook(() => useLeafletContext(), { wrapper })
    expect(result.current).toBe(context)
  })
})
