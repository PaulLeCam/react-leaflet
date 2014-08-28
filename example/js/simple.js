(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./example/simple.coffee":[function(require,module,exports){
var Map, Marker, Popup, SimpleExample, TileLayer, em, p, react, strong, _ref, _ref1;

react = require("react");

_ref = react.DOM, p = _ref.p, strong = _ref.strong, em = _ref.em;

_ref1 = require("react-leaflet"), Map = _ref1.Map, TileLayer = _ref1.TileLayer, Marker = _ref1.Marker, Popup = _ref1.Popup;

SimpleExample = react.createClass({
  displayName: "SimpleExample",
  render: function() {
    return Map({
      center: [51.505, -0.09],
      zoom: 13
    }, TileLayer({
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }), Marker({
      position: [51.505, -0.09]
    }, Popup(null, p(null, strong(null, "Hello"), em(null, " World")))));
  }
});

react.renderComponent(SimpleExample(), document.getElementById("content"));



},{"react":"react","react-leaflet":"react-leaflet"}]},{},["./example/simple.coffee"]);
