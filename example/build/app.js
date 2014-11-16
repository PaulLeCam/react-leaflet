(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./example/app.js":[function(require,module,exports){
var React = require("react");
var SimpleExample = require("./simple");

var examples = (
  React.createElement("div", null, 
    React.createElement("h1", null, "React-Leaflet examples"), 
    React.createElement("h2", null, "Simple"), 
    React.createElement(SimpleExample, null)
  )
);

React.render(examples, document.getElementById("app"));

},{"./simple":"/Users/paul/Dev/PaulLeCam/react-leaflet/example/simple.js","react":"react"}],"/Users/paul/Dev/PaulLeCam/react-leaflet/example/simple.js":[function(require,module,exports){
var React = require("react");
var $__0=     require("react-leaflet"),Map=$__0.Map,TileLayer=$__0.TileLayer,Marker=$__0.Marker,Popup=$__0.Popup;

module.exports = React.createClass({
  displayName: "SimpleExample",

  getInitialState:function() {
    return {
      lat: 51.505,
      lng: -0.09,
      zoom: 13
    };
  },

  render:function() {
    var position = [this.state.lat, this.state.lng];
    return (
      React.createElement(Map, {center: position, zoom: this.state.zoom}, 
        React.createElement(TileLayer, {
          url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png", 
          attribution: "© <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors"}
        ), 
        React.createElement(Marker, {position: position}, 
          React.createElement(Popup, null, "A pretty CSS3 popup. ", React.createElement("br", null), " Easily customizable.")
        )
      )
    );
  }
});

},{"react":"react","react-leaflet":"react-leaflet"}]},{},["./example/app.js"]);
