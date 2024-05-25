"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[5134],{3209:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>s,contentTitle:()=>r,default:()=>m,frontMatter:()=>o,metadata:()=>c,toc:()=>l});var a=t(5723),i=t(3327);const o={title:"Animated panning"},r=void 0,c={id:"example-animated-panning",title:"Animated panning",description:"Click the map to move to the location",source:"@site/docs/example-animated-panning.md",sourceDirName:".",slug:"/example-animated-panning",permalink:"/docs/next/example-animated-panning",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"Animated panning"},sidebar:"docs",previous:{title:"View bounds",permalink:"/docs/next/example-view-bounds"},next:{title:"React control",permalink:"/docs/next/example-react-control"}},s={},l=[];function p(n){const e={admonition:"admonition",code:"code",p:"p",pre:"pre",...(0,i.R)(),...n.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(e.admonition,{title:"Usage",type:"info",children:(0,a.jsx)(e.p,{children:"Click the map to move to the location"})}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-tsx",metastring:"live noInline",live:!0,children:'function SetViewOnClick({ animateRef }) {\n  const map = useMapEvent(\'click\', (e) => {\n    map.setView(e.latlng, map.getZoom(), {\n      animate: animateRef.current || false,\n    })\n  })\n\n  return null\n}\n\nfunction AnimateExample() {\n  const animateRef = useRef(false)\n\n  return (\n    <>\n      <p>\n        <label>\n          <input\n            type="checkbox"\n            onChange={() => {\n              animateRef.current = !animateRef.current\n            }}\n          />\n          Animate panning\n        </label>\n      </p>\n      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>\n        <TileLayer\n          attribution=\'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors\'\n          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"\n        />\n        <SetViewOnClick animateRef={animateRef} />\n      </MapContainer>\n    </>\n  )\n}\n\nrender(<AnimateExample />)\n'})})]})}function m(n={}){const{wrapper:e}={...(0,i.R)(),...n.components};return e?(0,a.jsx)(e,{...n,children:(0,a.jsx)(p,{...n})}):p(n)}},3327:(n,e,t)=>{t.d(e,{R:()=>r,x:()=>c});var a=t(2155);const i={},o=a.createContext(i);function r(n){const e=a.useContext(o);return a.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:r(n.components),a.createElement(o.Provider,{value:e},n.children)}}}]);