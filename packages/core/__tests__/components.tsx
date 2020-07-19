import { render } from '@testing-library/react'
import React, { useEffect, useRef } from 'react'

import {
  createElementHook,
  createContainerComponent,
  createDivOverlayComponent,
  createLeafComponent,
} from '../src'

describe('components', () => {
  test('createLeafComponent() provides the instance as ref', () => {
    const instance = jest.fn()
    const useElement = createElementHook(() => ({ instance, context: {} }))
    const Component = createLeafComponent(useElement)

    let refInstance
    function TestWrapper() {
      const ref = useRef()
      useEffect(() => {
        refInstance = ref.current
      }, [])
      return <Component ref={ref} />
    }

    render(<TestWrapper />)
    expect(refInstance).toBe(instance)
  })

  test('createContainerComponent() provides the instance as ref', () => {
    const instance = jest.fn()
    const useElement = createElementHook(() => ({ instance, context: {} }))
    const Component = createContainerComponent(useElement)

    let refInstance
    function TestWrapper() {
      const ref = useRef()
      useEffect(() => {
        refInstance = ref.current
      }, [])
      return <Component ref={ref} />
    }

    render(<TestWrapper />)
    expect(refInstance).toBe(instance)
  })

  test.todo('createContainerComponent() renders the children')

  test.todo('createContainerComponent() provides the context')

  test('createDivOverlayComponent() provides the instance as ref', () => {
    const instance = jest.fn()
    const useElement = createElementHook(() => ({ instance, context: {} }))
    const Component = createDivOverlayComponent(useElement)

    let refInstance
    function TestWrapper() {
      const ref = useRef()
      useEffect(() => {
        refInstance = ref.current
      }, [])
      return <Component ref={ref} />
    }

    render(<TestWrapper />)
    expect(refInstance).toBe(instance)
  })

  test.todo('createDivOverlayComponent() renders its children in the container')

  test.todo('createDivOverlayComponent() updates the overlay when needed')
})
