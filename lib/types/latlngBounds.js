var Type, latlng, react;

react = require("react");

Type = react.PropTypes;

latlng = require("./latlng");

module.exports = Type.arrayOf(latlng);
