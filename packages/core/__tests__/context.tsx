import { renderHook } from '@testing-library/react'
import type { Map } from 'leaflet'
import { type ReactNode, StrictMode } from 'react'
import * as React from 'react'

import {
  CONTEXT_VERSION,
  createLeafletContext,
  LeafletContext,
  useLeafletContext,
} from '../src'

export function createWrapper(context) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <StrictMode>
        <LeafletContext value={context}>{children}</LeafletContext>
      </StrictMode>
    )
  }
}

describe('context', () => {
  test('createLeafletContext() creates the context object', () => {
    const map = {} as unknown as Map
    expect(createLeafletContext(map)).toEqual({
      __version: CONTEXT_VERSION,
      map,
    })
  })

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
    const wrapper = createWrapper(context)
    const { result } = renderHook(() => useLeafletContext(), { wrapper })
    expect(result.current).toBe(context)
  })
})
