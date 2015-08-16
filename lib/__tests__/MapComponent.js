'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _leaflet = require('leaflet');

var _leaflet2 = _interopRequireDefault(_leaflet);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

jest.dontMock('../MapComponent');

var MapComponent = require('../MapComponent');

describe('MapComponent', function () {
  var Component = (function (_MapComponent) {
    _inherits(Component, _MapComponent);

    function Component() {
      _classCallCheck(this, Component);

      _get(Object.getPrototypeOf(Component.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Component, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        _get(Object.getPrototypeOf(Component.prototype), 'componentWillMount', this).call(this);
        this.leafletElement = _leaflet2['default'].map('test');
      }
    }, {
      key: 'render',
      value: function render() {
        return null;
      }
    }]);

    return Component;
  })(MapComponent);

  it('exposes a `leafletElement` getter', function () {
    document.body.innerHTML = '<div id="test"></div>';

    var component = _react2['default'].createElement(Component, null);
    var instance = _react2['default'].render(component, document.getElementById('test'));

    expect(instance.leafletElement._container).toBeDefined();
  });

  it('binds the event', function () {
    document.body.innerHTML = '<div id="test"></div>';

    var callback = jest.genMockFn();
    var component = _react2['default'].createElement(Component, { onLeafletClick: callback });
    var instance = _react2['default'].render(component, document.getElementById('test'));

    instance.fireLeafletEvent('click');
    expect(callback.mock.calls.length).toBe(1);
  });

  it('binds events as Leaflet events', function () {
    document.body.innerHTML = '<div id="test"></div>';

    var callback = jest.genMockFn();
    var component = _react2['default'].createElement(Component, { onClick: callback });
    var instance = _react2['default'].render(component, document.getElementById('test'));

    instance.fireLeafletEvent('click');
    expect(callback.mock.calls.length).toBe(1);
  });

  it('unbinds the event', function () {
    document.body.innerHTML = '<div id="test"></div>';

    var callback = jest.genMockFn();
    var TestComponent = _react2['default'].createClass({
      displayName: 'TestComponent',

      getInitialState: function getInitialState() {
        return { bindEvent: true };
      },
      dontBind: function dontBind() {
        this.setState({ bindEvent: false });
      },
      fire: function fire() {
        this.refs.c.fireLeafletEvent('click');
      },
      render: function render() {
        return this.state.bindEvent ? _react2['default'].createElement(Component, { ref: 'c', onClick: callback }) : _react2['default'].createElement(Component, { ref: 'c' });
      }
    });
    var component = _react2['default'].createElement(TestComponent, null);
    var instance = _react2['default'].render(component, document.getElementById('test'));

    instance.fire();
    expect(callback.mock.calls.length).toBe(1);

    instance.dontBind();
    instance.fire();
    expect(callback.mock.calls.length).toBe(1);
  });

  it('replaces the event', function () {
    document.body.innerHTML = '<div id="test"></div>';

    var callback1 = jest.genMockFn();
    var callback2 = jest.genMockFn();
    var TestComponent = _react2['default'].createClass({
      displayName: 'TestComponent',

      getInitialState: function getInitialState() {
        return { cb: callback1 };
      },
      replaceCallback: function replaceCallback() {
        this.setState({ cb: callback2 });
      },
      fire: function fire() {
        this.refs.c.fireLeafletEvent('click');
      },
      render: function render() {
        return _react2['default'].createElement(Component, { ref: 'c', onClick: this.state.cb });
      }
    });
    var component = _react2['default'].createElement(TestComponent, null);
    var instance = _react2['default'].render(component, document.getElementById('test'));

    instance.fire();
    expect(callback1.mock.calls.length).toBe(1);
    expect(callback2.mock.calls.length).toBe(0);

    instance.replaceCallback();
    instance.fire();
    expect(callback1.mock.calls.length).toBe(1);
    expect(callback2.mock.calls.length).toBe(1);
  });
});