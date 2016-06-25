/* global describe, expect, it, jest */

import Leaflet from 'leaflet';
import React, { Component } from 'react';
import { renderIntoDocument } from 'react-addons-test-utils';

import MapComponent from '../src/MapComponent';

jest.unmock('../src/MapComponent');

describe('MapComponent', () => {
  class TestComponent extends MapComponent {
    componentWillMount() {
      super.componentWillMount();
      this.leafletElement = Leaflet.map('test');
    }
    render() {
      return null;
    }
  }

  it('exposes a `leafletElement` getter', () => {
    const component = renderIntoDocument(<TestComponent />);
    expect(component.leafletElement._container).toBeDefined();
  });

  it('binds the event', () => {
    const callback = jest.genMockFn();
    const component = renderIntoDocument(<TestComponent onClick={callback} />);
    component.fireLeafletEvent('click');
    expect(callback.mock.calls.length).toBe(1);
  });

  it('unbinds the event', () => {
    const callback = jest.genMockFn();

    class EventComponent extends Component {
      constructor() {
        super();
        this.state = {bindEvent: true};
      }

      dontBind() {
        this.setState({bindEvent: false});
      }

      fire() {
        this.refs.c.fireLeafletEvent('click');
      }

      render() {
        return this.state.bindEvent
          ? <TestComponent onClick={callback} ref='c' />
          : <TestComponent ref='c' />;
      }
    }

    const component = renderIntoDocument(<EventComponent />);

    component.fire();
    expect(callback.mock.calls.length).toBe(1);

    component.dontBind();
    component.fire();
    expect(callback.mock.calls.length).toBe(1);
  });

  it('replaces the event', () => {
    const callback1 = jest.genMockFn();
    const callback2 = jest.genMockFn();

    class EventComponent extends Component {
      constructor() {
        super();
        this.state = {cb: callback1};
      }

      replaceCallback() {
        this.setState({cb: callback2});
      }

      fire() {
        this.refs.c.fireLeafletEvent('click');
      }

      render() {
        return <TestComponent onClick={this.state.cb} ref='c' />;
      }
    }

    const component = renderIntoDocument(<EventComponent />);

    component.fire();
    expect(callback1.mock.calls.length).toBe(1);
    expect(callback2.mock.calls.length).toBe(0);

    component.replaceCallback();
    component.fire();
    expect(callback1.mock.calls.length).toBe(1);
    expect(callback2.mock.calls.length).toBe(1);
  });
});
