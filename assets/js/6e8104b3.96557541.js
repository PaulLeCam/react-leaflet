"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([["404"],{4441:function(e,t,n){n.r(t),n.d(t,{metadata:()=>r,contentTitle:()=>l,default:()=>u,assets:()=>i,toc:()=>c,frontMatter:()=>s});var r=JSON.parse('{"id":"example-svg-overlay","title":"SVG Overlay","description":"","source":"@site/versioned_docs/version-3.x/example-svg-overlay.md","sourceDirName":".","slug":"/example-svg-overlay","permalink":"/docs/v3/example-svg-overlay","draft":false,"unlisted":false,"tags":[],"version":"3.x","frontMatter":{"title":"SVG Overlay"},"sidebar":"docs","previous":{"title":"Vector layers","permalink":"/docs/v3/example-vector-layers"},"next":{"title":"Other layers","permalink":"/docs/v3/example-other-layers"}}'),o=n("1549"),a=n("2376");let s={title:"SVG Overlay"},l=void 0,i={},c=[];function p(e){let t={code:"code",pre:"pre",...(0,a.a)(),...e.components};return(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-tsx",children:'import { MapContainer, SVGOverlay, TileLayer } from \'react-leaflet\'\n\nconst position = [51.505, -0.09]\nconst bounds = [\n  [51.49, -0.08],\n  [51.5, -0.06],\n]\n\nfunction SVGOverlayExample() {\n  return (\n    <MapContainer center={position} zoom={13}>\n      <TileLayer\n        attribution=\'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors\'\n        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"\n      />\n      <SVGOverlay attributes={{ stroke: \'red\' }} bounds={bounds}>\n        <rect x="0" y="0" width="100%" height="100%" fill="blue" />\n        <circle r="5" cx="10" cy="10" fill="red" />\n        <text x="50%" y="50%" stroke="white">\n          text\n        </text>\n      </SVGOverlay>\n    </MapContainer>\n  )\n}\n'})})}function u(e={}){let{wrapper:t}={...(0,a.a)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(p,{...e})}):p(e)}},2376:function(e,t,n){n.d(t,{Z:function(){return l},a:function(){return s}});var r=n(4194);let o={},a=r.createContext(o);function s(e){let t=r.useContext(a);return r.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),r.createElement(a.Provider,{value:t},e.children)}}}]);