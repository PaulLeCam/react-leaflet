import { act, render, screen } from '@testing-library/react'
import React, { useEffect, useRef } from 'react'

import {
  createElementHook,
  createContainerComponent,
  createDivOverlayComponent,
  createDivOverlayHook,
  createLeafComponent,
  useLeafletContext,
} from '../src'

import { createWrapper } from './context'

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

  test('createContainerComponent() renders the children', () => {
    const useElement = createElementHook(() => ({ instance: {}, context: {} }))
    const Component = createContainerComponent(useElement)

    let rendered = false
    function Child() {
      useEffect(() => {
        rendered = true
      }, [])
      return null
    }

    render(
      <Component>
        <Child />
      </Component>,
    )
    expect(rendered).toBe(true)
  })

  test('createContainerComponent() provides the context', () => {
    const containerContext = {}
    const useElement = createElementHook(() => ({
      instance: {},
      context: containerContext,
    }))
    const Component = createContainerComponent(useElement)

    let childContext
    function Child() {
      const context = useLeafletContext()
      useEffect(() => {
        childContext = context
      })
      return null
    }

    render(
      <Component>
        <Child />
      </Component>,
    )
    expect(childContext).toBe(containerContext)
  })

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

  test('createDivOverlayComponent() renders its children in the container', () => {
    const useElement = createElementHook(() => ({
      instance: { _contentNode: document.body },
      context: {},
    }))
    const useOverlay = createDivOverlayHook(useElement, jest.fn())
    const Component = createDivOverlayComponent(useOverlay)
    render(
      <Component>
        <span>Test</span>
      </Component>,
      { wrapper: createWrapper({}) },
    )
    screen.getByText('Test')
  })

  test('createDivOverlayComponent() updates the overlay when needed', () => {
    const update = jest.fn()
    const useElement = createElementHook(() => ({
      instance: { _contentNode: document.body, update },
      context: {},
    }))

    let setOpen
    const useLifecycle = (element, context, props, setOpenFunc) => {
      setOpen = setOpenFunc
    }

    const useOverlay = createDivOverlayHook(useElement, useLifecycle)
    const Component = createDivOverlayComponent(useOverlay)
    render(<Component />, { wrapper: createWrapper({}) })

    expect(update).not.toHaveBeenCalled()
    act(() => {
      setOpen(true)
    })
    expect(update).toHaveBeenCalled()
  })
})
