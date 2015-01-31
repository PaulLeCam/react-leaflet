jest.dontMock("../element");

import Leaflet from "leaflet";
import React from "react";

import elementMixin from "../element";

describe("elementMixin", () => {
  let Component = React.createClass({
    mixins: [elementMixin],
    componentWillMount() {
      this._leafletElement = Leaflet.map("test");
    },
    render() {
      return null;
    }
  });

  it("exposes a `getLeafletElement()` method", () => {
    document.body.innerHTML = '<div id="test"></div>';

    let component = <Component />;
    let instance = React.render(component, document.getElementById("test"));

    expect(instance.getLeafletElement()._container).toBeDefined();
  });

  it("binds the event", () => {
    document.body.innerHTML = '<div id="test"></div>';

    let callback = jest.genMockFn();
    let component = <Component onLeafletClick={callback} />;
    let instance = React.render(component, document.getElementById("test"));

    instance.fireEvent("click");
    expect(callback.mock.calls.length).toBe(1);
  });

  it("binds events as Leaflet events", () => {
    document.body.innerHTML = '<div id="test"></div>';

    let callback = jest.genMockFn();
    let component = <Component onClick={callback} />;
    let instance = React.render(component, document.getElementById("test"));

    instance.fireEvent("click");
    expect(callback.mock.calls.length).toBe(1);
  });

  it("unbinds the event", () => {
    document.body.innerHTML = '<div id="test"></div>';

    let callback = jest.genMockFn();
    let TestComponent = React.createClass({
      getInitialState() {
        return {bindEvent: true};
      },
      dontBind() {
        this.setState({bindEvent: false});
      },
      fire() {
        this.refs.c.fireEvent("click");
      },
      render() {
        return this.state.bindEvent
          ? <Component ref="c" onLeafletClick={callback} />
          : <Component ref="c" />;
      }
    });
    let component = <TestComponent />;
    let instance = React.render(component, document.getElementById("test"));

    instance.fire();
    expect(callback.mock.calls.length).toBe(1);

    instance.dontBind();
    instance.fire();
    expect(callback.mock.calls.length).toBe(1);
  });

  it("replaces the event", () => {
    document.body.innerHTML = '<div id="test"></div>';

    let callback1 = jest.genMockFn();
    let callback2 = jest.genMockFn();
    let TestComponent = React.createClass({
      getInitialState() {
        return {cb: callback1};
      },
      replaceCallback() {
        this.setState({cb: callback2});
      },
      fire() {
        this.refs.c.fireEvent("click");
      },
      render() {
        return <Component ref="c" onLeafletClick={this.state.cb} />;
      }
    });
    let component = <TestComponent />;
    let instance = React.render(component, document.getElementById("test"));

    instance.fire();
    expect(callback1.mock.calls.length).toBe(1);
    expect(callback2.mock.calls.length).toBe(0);

    instance.replaceCallback();
    instance.fire();
    expect(callback1.mock.calls.length).toBe(1);
    expect(callback2.mock.calls.length).toBe(1);
  });
});
