jest.dontMock("../MapComponent");

import Leaflet from "leaflet";
import React from "react";

import MapComponent from "../MapComponent";

describe("MapComponent", () => {
  class Component extends MapComponent {
    componentWillMount() {
      super.componentWillMount();
      this.leafletElement = Leaflet.map("test");
    }
    render() {
      return null;
    }
  }

  it("exposes a `leafletElement` method", () => {
    document.body.innerHTML = '<div id="test"></div>';

    const component = <Component />;
    const instance = React.render(component, document.getElementById("test"));

    expect(instance.leafletElement._container).toBeDefined();
  });

  it("binds the event", () => {
    document.body.innerHTML = '<div id="test"></div>';

    const callback = jest.genMockFn();
    const component = <Component onLeafletClick={callback} />;
    const instance = React.render(component, document.getElementById("test"));

    instance.fireLeafletEvent("click");
    expect(callback.mock.calls.length).toBe(1);
  });

  it("binds events as Leaflet events", () => {
    document.body.innerHTML = '<div id="test"></div>';

    const callback = jest.genMockFn();
    const component = <Component onClick={callback} />;
    const instance = React.render(component, document.getElementById("test"));

    instance.fireLeafletEvent("click");
    expect(callback.mock.calls.length).toBe(1);
  });

  it("unbinds the event", () => {
    document.body.innerHTML = '<div id="test"></div>';

    const callback = jest.genMockFn();
    const TestComponent = React.createClass({
      getInitialState() {
        return {bindEvent: true};
      },
      dontBind() {
        this.setState({bindEvent: false});
      },
      fire() {
        this.refs.c.fireLeafletEvent("click");
      },
      render() {
        return this.state.bindEvent
          ? <Component ref="c" onClick={callback} />
          : <Component ref="c" />;
      }
    });
    const component = <TestComponent />;
    const instance = React.render(component, document.getElementById("test"));

    instance.fire();
    expect(callback.mock.calls.length).toBe(1);

    instance.dontBind();
    instance.fire();
    expect(callback.mock.calls.length).toBe(1);
  });

  it("replaces the event", () => {
    document.body.innerHTML = '<div id="test"></div>';

    const callback1 = jest.genMockFn();
    const callback2 = jest.genMockFn();
    const TestComponent = React.createClass({
      getInitialState() {
        return {cb: callback1};
      },
      replaceCallback() {
        this.setState({cb: callback2});
      },
      fire() {
        this.refs.c.fireLeafletEvent("click");
      },
      render() {
        return <Component ref="c" onClick={this.state.cb} />;
      }
    });
    const component = <TestComponent />;
    const instance = React.render(component, document.getElementById("test"));

    instance.fire();
    expect(callback1.mock.calls.length).toBe(1);
    expect(callback2.mock.calls.length).toBe(0);

    instance.replaceCallback();
    instance.fire();
    expect(callback1.mock.calls.length).toBe(1);
    expect(callback2.mock.calls.length).toBe(1);
  });
});
