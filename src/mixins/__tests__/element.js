jest.dontMock("../element");

describe("elementMixin", function() {
  var Leaflet = require("leaflet");
  var React = require("react");

  var elementMixin = require("../element");
  var Component = React.createClass({
    mixins: [elementMixin],
    componentWillMount() {
      this._leafletElement = Leaflet.map("test");
    },
    render() {
      return null;
    }
  });

  it("exposes a `getLeafletElement()` method", function() {
    document.body.innerHTML = '<div id="test"></div>';

    var component = <Component />;
    var instance = React.render(component, document.getElementById("test"));

    expect(instance.getLeafletElement()._container).toBeDefined();
  });

  it("binds the event", function() {
    document.body.innerHTML = '<div id="test"></div>';

    var callback = jest.genMockFn();
    var component = <Component onLeafletClick={callback} />;
    var instance = React.render(component, document.getElementById("test"));

    instance.fireEvent("click");
    expect(callback.mock.calls.length).toBe(1);
  });

  it("unbinds the event", function() {
    document.body.innerHTML = '<div id="test"></div>';

    var callback = jest.genMockFn();
    var TestComponent = React.createClass({
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
    var component = <TestComponent />;
    var instance = React.render(component, document.getElementById("test"));

    instance.fire();
    expect(callback.mock.calls.length).toBe(1);

    instance.dontBind();
    instance.fire();
    expect(callback.mock.calls.length).toBe(1);
  });

  it("replaces the event", function() {
    document.body.innerHTML = '<div id="test"></div>';

    var callback1 = jest.genMockFn();
    var callback2 = jest.genMockFn();
    var TestComponent = React.createClass({
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
    var component = <TestComponent />;
    var instance = React.render(component, document.getElementById("test"));

    instance.fire();
    expect(callback1.mock.calls.length).toBe(1);
    expect(callback2.mock.calls.length).toBe(0);

    instance.replaceCallback();
    instance.fire();
    expect(callback1.mock.calls.length).toBe(1);
    expect(callback2.mock.calls.length).toBe(1);
  });
});
