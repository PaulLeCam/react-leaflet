import { act, render, screen } from '@testing-library/react'
import React, { StrictMode, useEffect, useRef } from 'react'

import {
  createContainerComponent,
  createDivOverlayComponent,
  createDivOverlayHook,
  createElementHook,
  createLeafComponent,
  useLeafletContext,
} from '../src'

import { createWrapper } from './context'

describe('components', () => {
  describe('createLeafComponent()', () => {
    test('provides the instance as ref object', () => {
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

      render(
        <StrictMode>
          <TestWrapper />
        </StrictMode>,
      )
      expect(refInstance).toBe(instance)
    })

    test('provides the instance as ref callback', (done) => {
      const instance = jest.fn()
      const useElement = createElementHook(() => ({ instance, context: {} }))
      const Component = createLeafComponent(useElement)

      function ref(refInstance) {
        if (refInstance !== null) {
          expect(refInstance).toBe(instance)
          done()
        }
      }

      render(<Component ref={ref} />)
    })
  })

  describe('createContainerComponent()', () => {
    test('provides the instance as ref object', () => {
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

    test('provides the instance as ref callback', (done) => {
      const instance = jest.fn()
      const useElement = createElementHook(() => ({ instance, context: {} }))
      const Component = createContainerComponent(useElement)

      function ref(refInstance) {
        if (refInstance !== null) {
          expect(refInstance).toBe(instance)
          done()
        }
      }

      render(<Component ref={ref} />)
    })

    test('renders the children', () => {
      const useElement = createElementHook(() => ({
        instance: {},
        context: {},
      }))
      const Component = createContainerComponent(useElement)

      let rendered = false
      function Child() {
        useEffect(() => {
          rendered = true
        }, [])
        return null
      }

      render(
        <StrictMode>
          <Component>
            <Child />
          </Component>
        </StrictMode>,
      )
      expect(rendered).toBe(true)
    })

    test('provides the context', () => {
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
        <StrictMode>
          <Component>
            <Child />
          </Component>
        </StrictMode>,
      )
      expect(childContext).toBe(containerContext)
    })
  })

  describe('createDivOverlayComponent()', () => {
    test('provides the instance as ref object', () => {
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

      render(
        <StrictMode>
          <TestWrapper />
        </StrictMode>,
      )
      expect(refInstance).toBe(instance)
    })

    test('provides the instance as ref callback', (done) => {
      const instance = jest.fn()
      const useElement = createElementHook(() => ({ instance, context: {} }))
      const Component = createDivOverlayComponent(useElement)

      function ref(refInstance) {
        if (refInstance !== null) {
          expect(refInstance).toBe(instance)
          done()
        }
      }

      render(<Component ref={ref} />)
    })

    test('renders its children in the container', () => {
      const useElement = createElementHook(() => ({
        instance: { _contentNode: document.body },
        context: {},
      }))
      const useOverlay = createDivOverlayHook(useElement, jest.fn())
      const Component = createDivOverlayComponent(useOverlay)
      render(
        <StrictMode>
          <Component>
            <span>Test</span>
          </Component>
        </StrictMode>,
        { wrapper: createWrapper({}) },
      )
      screen.getByText('Test')
    })

    test('updates the overlay when needed', () => {
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
      render(
        <StrictMode>
          <Component />
        </StrictMode>,
        { wrapper: createWrapper({}) },
      )

      expect(update).not.toHaveBeenCalled()
      act(() => {
        setOpen(true)
      })
      expect(update).toHaveBeenCalled()
    })
  })
})
