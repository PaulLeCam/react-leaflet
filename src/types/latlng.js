import React from "react";
let Type = React.PropTypes;

export default Type.oneOfType([
  // [Number, Number]
  Type.arrayOf(Type.number),
  // {lat: Number, lng: Number}
  Type.shape({
    lat: Type.number,
    lng: Type.number
  }),
  // {lat: Number, lon: Number}
  Type.shape({
    lat: Type.number,
    lon: Type.number
  })
]);
