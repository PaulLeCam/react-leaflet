/* global describe, expect, it, jest */

import Leaflet from 'leaflet'
import React, { createRef, Component } from 'react'
import { renderIntoDocument } from 'react-dom/test-utils'

import MapComponent from '../src/MapComponent'

describe('MapComponent', () => {
  class TestComponent extends MapComponent {
    constructor(props) {
      super(props)
      this.leafletElement = Leaflet.map('test')
    }

    render() {
      return null
    }
  }

  it('exposes a `leafletElement` getter', () => {
    const component = renderIntoDocument(<TestComponent />)
    expect(component.leafletElement._container).toBeDefined()
  })

  it('binds the event', () => {
    const callback = jest.fn()
    const component = renderIntoDocument(<TestComponent onClick={callback} />)
    component.fireLeafletEvent('click')
    expect(callback.mock.calls.length).toBe(1)
  })

  it('unbinds the event', () => {
    const callback = jest.fn()

    class EventComponent extends Component {
      constructor(props) {
        super(props)
        this.state = { bindEvent: true }
        this.ref = createRef()
      }

      dontBind() {
        this.setState({ bindEvent: false })
      }

      fire() {
        this.ref.current.fireLeafletEvent('click')
      }

      render() {
        return this.state.bindEvent ? (
          <TestComponent onClick={callback} ref={this.ref} />
        ) : (
          <TestComponent ref={this.ref} />
        )
      }
    }

    const component = renderIntoDocument(<EventComponent />)

    component.fire()
    expect(callback.mock.calls.length).toBe(1)

    component.dontBind()
    component.fire()
    expect(callback.mock.calls.length).toBe(1)
  })

  it('replaces the event', () => {
    const callback1 = jest.fn()
    const callback2 = jest.fn()

    class EventComponent extends Component {
      constructor(props) {
        super(props)
        this.state = { cb: callback1 }
        this.ref = createRef()
      }

      replaceCallback() {
        this.setState({ cb: callback2 })
      }

      fire() {
        this.ref.current.fireLeafletEvent('click')
      }

      render() {
        return <TestComponent onClick={this.state.cb} ref={this.ref} />
      }
    }

    const component = renderIntoDocument(<EventComponent />)

    component.fire()
    expect(callback1.mock.calls.length).toBe(1)
    expect(callback2.mock.calls.length).toBe(0)

    component.replaceCallback()
    component.fire()
    expect(callback1.mock.calls.length).toBe(1)
    expect(callback2.mock.calls.length).toBe(1)
  })
})
