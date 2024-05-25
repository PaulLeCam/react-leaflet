"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[4489],{2189:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>s,contentTitle:()=>l,default:()=>u,frontMatter:()=>i,metadata:()=>c,toc:()=>p});var o=t(5723),r=t(3327);const i={title:"Tooltips"},l=void 0,c={id:"example-tooltips",title:"Tooltips",description:"",source:"@site/versioned_docs/version-3.x/example-tooltips.md",sourceDirName:".",slug:"/example-tooltips",permalink:"/docs/v3/example-tooltips",draft:!1,unlisted:!1,tags:[],version:"3.x",frontMatter:{title:"Tooltips"},sidebar:"docs",previous:{title:"Other layers",permalink:"/docs/v3/example-other-layers"},next:{title:"Layers control",permalink:"/docs/v3/example-layers-control"}},s={},p=[];function a(n){const e={code:"code",pre:"pre",...(0,r.R)(),...n.components};return(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-tsx",children:"import { useMemo, useState } from 'react'\nimport { MapContainer, TileLayer } from 'react-leaflet'\n\nconst center = [51.505, -0.09]\n\nconst multiPolygon = [\n  [\n    [51.51, -0.12],\n    [51.51, -0.13],\n    [51.53, -0.13],\n  ],\n  [\n    [51.51, -0.05],\n    [51.51, -0.07],\n    [51.53, -0.07],\n  ],\n]\n\nconst rectangle = [\n  [51.49, -0.08],\n  [51.5, -0.06],\n]\n\nfunction TooltipCircle() {\n  const [clickedCount, setClickedCount] = useState(0)\n  const eventHandlers = useMemo(\n    () => ({\n      click() {\n        setClickedCount((count) => count + 1)\n      },\n    }),\n    [],\n  )\n\n  const clickedText =\n    clickedCount === 0\n      ? 'Click this Circle to change the Tooltip text'\n      : `Circle click: ${clickedCount}`\n\n  return (\n    <Circle\n      center={center}\n      eventHandlers={eventHandlers}\n      pathOptions={{ fillColor: 'blue' }}\n      radius={200}>\n      <Tooltip>{clickedText}</Tooltip>\n    </Circle>\n  )\n}\n\nfunction TooltipsExample() {\n  return (\n    <MapContainer center={center} zoom={13}>\n      <TileLayer\n        attribution='&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\n        url=\"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png\"\n      />\n      <TooltipCircle />\n      <CircleMarker\n        center={[51.51, -0.12]}\n        pathOptions={{ color: 'red' }}\n        radius={20}>\n        <Tooltip>Tooltip for CircleMarker</Tooltip>\n      </CircleMarker>\n      <Marker position={[51.51, -0.09]}>\n        <Popup>Popup for Marker</Popup>\n        <Tooltip>Tooltip for Marker</Tooltip>\n      </Marker>\n      <Polygon pathOptions={{ color: 'purple' }} positions={multiPolygon}>\n        <Tooltip sticky>sticky Tooltip for Polygon</Tooltip>\n      </Polygon>\n      <Rectangle bounds={rectangle} pathOptions={{ color: 'black' }}>\n        <Tooltip direction=\"bottom\" offset={[0, 20]} opacity={1} permanent>\n          permanent Tooltip for Rectangle\n        </Tooltip>\n      </Rectangle>\n    </MapContainer>\n  )\n}\n"})})}function u(n={}){const{wrapper:e}={...(0,r.R)(),...n.components};return e?(0,o.jsx)(e,{...n,children:(0,o.jsx)(a,{...n})}):a(n)}},3327:(n,e,t)=>{t.d(e,{R:()=>l,x:()=>c});var o=t(2155);const r={},i=o.createContext(r);function l(n){const e=o.useContext(i);return o.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:l(n.components),o.createElement(i.Provider,{value:e},n.children)}}}]);