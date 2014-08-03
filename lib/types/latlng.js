var Type, react;

react = require("react");

Type = react.PropTypes;

module.exports = Type.oneOfType([
  Type.arrayOf(Type.number), Type.shape({
    lat: Type.number,
    lng: Type.number
  }), Type.shape({
    lat: Type.number,
    lon: Type.number
  })
]);
