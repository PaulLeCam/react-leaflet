"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[9744],{5213:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>h,frontMatter:()=>o,metadata:()=>a,toc:()=>l});var s=n(5723),r=n(1525);const o={title:"Introduction"},i=void 0,a={id:"start-introduction",title:"Introduction",description:"Core concepts",source:"@site/versioned_docs/version-4.x/start-introduction.md",sourceDirName:".",slug:"/start-introduction",permalink:"/docs/start-introduction",draft:!1,unlisted:!1,tags:[],version:"4.x",frontMatter:{title:"Introduction"},sidebar:"docs",next:{title:"Installation",permalink:"/docs/start-installation"}},c={},l=[{value:"Core concepts",id:"core-concepts",level:2},{value:"DOM rendering",id:"dom-rendering",level:3},{value:"Component properties",id:"component-properties",level:3},{value:"Leaflet elements references",id:"leaflet-elements-references",level:3},{value:"React context",id:"react-context",level:3},{value:"Lifecycle process",id:"lifecycle-process",level:2},{value:"Limitations",id:"limitations",level:2}];function d(e){const t={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{id:"core-concepts",children:"Core concepts"}),"\n",(0,s.jsxs)(t.p,{children:["React Leaflet provides bindings between React and Leaflet. It ",(0,s.jsx)(t.strong,{children:"does not replace Leaflet"}),", but leverages it to abstract Leaflet layers as React components. As such, it can behave differently from how other React components work, notably:"]}),"\n",(0,s.jsx)(t.h3,{id:"dom-rendering",children:"DOM rendering"}),"\n",(0,s.jsxs)(t.p,{children:["React ",(0,s.jsx)(t.strong,{children:"does not"})," render Leaflet layers to the DOM, this rendering is done by Leaflet itself.\nReact only renders a ",(0,s.jsx)(t.code,{children:"<div>"})," element when rendering the ",(0,s.jsxs)(t.a,{href:"/docs/api-map#mapcontainer",children:[(0,s.jsx)(t.code,{children:"MapContainer"})," component"]})," and the contents of ",(0,s.jsx)(t.a,{href:"/docs/api-components#ui-layers",children:"UI layers components"}),"."]}),"\n",(0,s.jsx)(t.h3,{id:"component-properties",children:"Component properties"}),"\n",(0,s.jsxs)(t.p,{children:["The properties passed to the components are used to create the relevant Leaflet instance when the component is rendered the first time and should be treated as ",(0,s.jsx)(t.strong,{children:"immutable by default"}),"."]}),"\n",(0,s.jsxs)(t.p,{children:["During the first render, all these properties should be supported as they are by Leaflet, ",(0,s.jsx)(t.strong,{children:"however they will not be updated in the UI when they change"})," unless they are explicitly documented as being ",(0,s.jsx)(t.strong,{children:"mutable"}),"."]}),"\n",(0,s.jsx)(t.p,{children:"Mutable properties changes are compared by reference (unless stated otherwise) and are applied calling the relevant method on the Leaflet element instance."}),"\n",(0,s.jsx)(t.h3,{id:"leaflet-elements-references",children:"Leaflet elements references"}),"\n",(0,s.jsxs)(t.p,{children:["Unless stated otherwise, all components exported by React Leaflet support ",(0,s.jsx)(t.a,{href:"https://react.dev/learn/referencing-values-with-refs",children:"refs"})," exposing the created Leaflet element instance or DOM element (for panes)."]}),"\n",(0,s.jsx)(t.p,{children:"This allows applications to access Leaflet's imperative APIs when required, but may create inconsistencies with props being set and should be used carefully."}),"\n",(0,s.jsx)(t.h3,{id:"react-context",children:"React context"}),"\n",(0,s.jsxs)(t.p,{children:["React Leaflet uses ",(0,s.jsx)(t.a,{href:"https://react.dev/reference/react/createContext",children:"React's context API"})," to make some Leaflet elements instances available to children elements that need it."]}),"\n",(0,s.jsxs)(t.p,{children:["Each Leaflet map instance has its own React context, created by the ",(0,s.jsxs)(t.a,{href:"/docs/api-map#mapcontainer",children:[(0,s.jsx)(t.code,{children:"MapContainer"})," component"]}),". Other components and hooks provided by React Leaflet can only be used as descendants of a ",(0,s.jsx)(t.code,{children:"MapContainer"}),"."]}),"\n",(0,s.jsx)(t.h2,{id:"lifecycle-process",children:"Lifecycle process"}),"\n",(0,s.jsxs)(t.ol,{children:["\n",(0,s.jsxs)(t.li,{children:["The ",(0,s.jsx)(t.code,{children:"MapContainer"})," renders a container ",(0,s.jsx)(t.code,{children:"<div>"})," element for the map. If the ",(0,s.jsx)(t.code,{children:"placeholder"})," prop is set, it will be rendered inside the container ",(0,s.jsx)(t.code,{children:"<div>"}),"."]}),"\n",(0,s.jsxs)(t.li,{children:["The ",(0,s.jsx)(t.code,{children:"MapContainer"})," instantiates a Leaflet Map for the created ",(0,s.jsx)(t.code,{children:"<div>"})," with the component properties and creates the React context containing the map instance."]}),"\n",(0,s.jsxs)(t.li,{children:["The ",(0,s.jsx)(t.code,{children:"MapContainer"})," renders its children components."]}),"\n",(0,s.jsx)(t.li,{children:"Each child component instantiates the matching Leaflet instance for the element using the component properties and context, and adds it to the map."}),"\n",(0,s.jsx)(t.li,{children:"When a child component is rendered again, changes to its supported mutable props are applied to the map."}),"\n",(0,s.jsx)(t.li,{children:"When a component is removed from the render tree, it removes its layer from the map as needed."}),"\n"]}),"\n",(0,s.jsx)(t.h2,{id:"limitations",children:"Limitations"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"Leaflet makes direct calls to the DOM when it is loaded, therefore React Leaflet is not compatible with server-side rendering."}),"\n",(0,s.jsxs)(t.li,{children:["The components exposed are abstractions for Leaflet layers, not DOM elements. Some of them have properties that can be updated directly by calling the setters exposed by Leaflet while others should be completely replaced, by setting an unique value on their ",(0,s.jsx)(t.code,{children:"key"})," property so they are properly handled by React's algorithm."]}),"\n"]})]})}function h(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},1525:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>a});var s=n(2155);const r={},o=s.createContext(r);function i(e){const t=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),s.createElement(o.Provider,{value:t},e.children)}}}]);