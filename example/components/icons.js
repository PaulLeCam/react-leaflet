import L from 'leaflet'

export const pointerIcon = new L.Icon({
  iconUrl: require('../assets/pointerIcon.svg'),
  iconRetinaUrl: require('../assets/pointerIcon.svg'),
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [25, 55],
  shadowUrl: '../assets/marker-shadow.png',
  shadowSize: [68, 95],
  shadowAnchor: [20, 92],
})

export const suitcasePoint = new L.Icon({
  iconUrl: require('../assets/suitcaseIcon.svg'),
  iconRetinaUrl: require('../assets/suitcaseIcon.svg'),
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
  iconSize: [40, 40],
  shadowUrl: '../assets/marker-shadow.png',
  shadowSize: [29, 40],
  shadowAnchor: [7, 40],
})
