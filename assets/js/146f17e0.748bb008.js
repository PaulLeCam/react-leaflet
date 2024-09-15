"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[3535],{1910:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>i,metadata:()=>u,toc:()=>d});var n=a(5723),r=a(1525),l=a(9473),s=a(7221);const i={title:"Installation"},o=void 0,u={id:"start-installation",title:"Installation",description:"React prerequisites",source:"@site/versioned_docs/version-3.x/start-installation.mdx",sourceDirName:".",slug:"/start-installation",permalink:"/docs/v3/start-installation",draft:!1,unlisted:!1,tags:[],version:"3.x",frontMatter:{title:"Installation"},sidebar:"docs",previous:{title:"Introduction",permalink:"/docs/v3/start-introduction"},next:{title:"Setup",permalink:"/docs/v3/start-setup"}},c={},d=[{value:"React prerequisites",id:"react-prerequisites",level:2},{value:"Leaflet prerequisites",id:"leaflet-prerequisites",level:2},{value:"Adding React Leaflet",id:"adding-react-leaflet",level:2},{value:"Using TypeScript",id:"using-typescript",level:2}];function p(e){const t={a:"a",admonition:"admonition",code:"code",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,r.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h2,{id:"react-prerequisites",children:"React prerequisites"}),"\n",(0,n.jsxs)(t.p,{children:["This documentation assumes you are already familiar with ",(0,n.jsx)(t.a,{href:"https://react.dev/",children:"React"})," and have a project setup. If it is not the case, you should read ",(0,n.jsx)(t.a,{href:"https://react.dev/learn",children:"React's Quick Start documentation"})," first."]}),"\n",(0,n.jsx)(t.h2,{id:"leaflet-prerequisites",children:"Leaflet prerequisites"}),"\n",(0,n.jsxs)(t.p,{children:["This documentation assumes you are already familiar with ",(0,n.jsx)(t.a,{href:"https://leafletjs.com/",children:"Leaflet"}),". React Leaflet ",(0,n.jsx)(t.strong,{children:"does not replace Leaflet"}),", it only provides bindings between React and Leaflet."]}),"\n",(0,n.jsxs)(t.p,{children:["This documentation ",(0,n.jsx)(t.strong,{children:"is not a replacement"})," for ",(0,n.jsx)(t.a,{href:"https://leafletjs.com/reference.html",children:"Leaflet's documentation"}),", it only focuses on aspects specific to React Leaflet."]}),"\n",(0,n.jsx)(t.admonition,{title:"Read this before going further",type:"caution",children:(0,n.jsxs)(t.p,{children:["Before using React Leaflet, you must setup your project following ",(0,n.jsx)(t.a,{href:"https://leafletjs.com/examples/quick-start/",children:"Leaflet's Quick Start Guide"}),"."]})}),"\n",(0,n.jsx)(t.h2,{id:"adding-react-leaflet",children:"Adding React Leaflet"}),"\n",(0,n.jsx)(t.p,{children:"React, React DOM and Leaflet are required peer dependencies. You must add them to your project if they are not already installed:"}),"\n",(0,n.jsxs)(l.A,{defaultValue:"npm",groupId:"package-manager",values:[{label:"npm",value:"npm"},{label:"yarn",value:"yarn"}],children:[(0,n.jsx)(s.A,{value:"npm",children:(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"npm install react@17 react-dom@17 leaflet\n"})})}),(0,n.jsx)(s.A,{value:"yarn",children:(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"yarn add react@17 react-dom@17 leaflet\n"})})})]}),"\n",(0,n.jsxs)(t.p,{children:["Note that React Leaflet v3 only supports React v17, ",(0,n.jsx)(t.strong,{children:"v18 is not supported"}),"."]}),"\n",(0,n.jsx)(t.p,{children:"Then you can install React Leaflet:"}),"\n",(0,n.jsxs)(l.A,{defaultValue:"npm",groupId:"package-manager",values:[{label:"npm",value:"npm"},{label:"yarn",value:"yarn"}],children:[(0,n.jsx)(s.A,{value:"npm",children:(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"npm install react-leaflet\n"})})}),(0,n.jsx)(s.A,{value:"yarn",children:(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"yarn add react-leaflet\n"})})})]}),"\n",(0,n.jsx)(t.p,{children:"Finally, you can import the necessary components. For example:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'\n"})}),"\n",(0,n.jsx)(t.h2,{id:"using-typescript",children:"Using TypeScript"}),"\n",(0,n.jsx)(t.p,{children:"React Leaflet provides TypeScript definitions in the installed packages, but needs Leaflet's definitions to be present. If you have not installed them yet, you will need to add them:"}),"\n",(0,n.jsxs)(l.A,{defaultValue:"npm",groupId:"package-manager",values:[{label:"npm",value:"npm"},{label:"yarn",value:"yarn"}],children:[(0,n.jsx)(s.A,{value:"npm",children:(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"npm install -D @types/leaflet\n"})})}),(0,n.jsx)(s.A,{value:"yarn",children:(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"yarn add -D @types/leaflet\n"})})})]})]})}function h(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(p,{...e})}):p(e)}},7221:(e,t,a)=>{a.d(t,{A:()=>s});a(2155);var n=a(851);const r={tabItem:"tabItem_T_ay"};var l=a(5723);function s(e){let{children:t,hidden:a,className:s}=e;return(0,l.jsx)("div",{role:"tabpanel",className:(0,n.A)(r.tabItem,s),hidden:a,children:t})}},9473:(e,t,a)=>{a.d(t,{A:()=>w});var n=a(2155),r=a(851),l=a(4150),s=a(2934),i=a(8978),o=a(1723),u=a(7400),c=a(9462);function d(e){return n.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,n.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:t,children:a}=e;return(0,n.useMemo)((()=>{const e=t??function(e){return d(e).map((e=>{let{props:{value:t,label:a,attributes:n,default:r}}=e;return{value:t,label:a,attributes:n,default:r}}))}(a);return function(e){const t=(0,u.XI)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,a])}function h(e){let{value:t,tabValues:a}=e;return a.some((e=>e.value===t))}function f(e){let{queryString:t=!1,groupId:a}=e;const r=(0,s.W6)(),l=function(e){let{queryString:t=!1,groupId:a}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!a)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return a??null}({queryString:t,groupId:a});return[(0,o.aZ)(l),(0,n.useCallback)((e=>{if(!l)return;const t=new URLSearchParams(r.location.search);t.set(l,e),r.replace({...r.location,search:t.toString()})}),[l,r])]}function m(e){const{defaultValue:t,queryString:a=!1,groupId:r}=e,l=p(e),[s,o]=(0,n.useState)((()=>function(e){let{defaultValue:t,tabValues:a}=e;if(0===a.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!h({value:t,tabValues:a}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${a.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const n=a.find((e=>e.default))??a[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:t,tabValues:l}))),[u,d]=f({queryString:a,groupId:r}),[m,v]=function(e){let{groupId:t}=e;const a=function(e){return e?`docusaurus.tab.${e}`:null}(t),[r,l]=(0,c.Dv)(a);return[r,(0,n.useCallback)((e=>{a&&l.set(e)}),[a,l])]}({groupId:r}),b=(()=>{const e=u??m;return h({value:e,tabValues:l})?e:null})();(0,i.A)((()=>{b&&o(b)}),[b]);return{selectedValue:s,selectValue:(0,n.useCallback)((e=>{if(!h({value:e,tabValues:l}))throw new Error(`Can't select invalid tab value=${e}`);o(e),d(e),v(e)}),[d,v,l]),tabValues:l}}var v=a(1722);const b={tabList:"tabList_KJdB",tabItem:"tabItem_uTQN"};var g=a(5723);function x(e){let{className:t,block:a,selectedValue:n,selectValue:s,tabValues:i}=e;const o=[],{blockElementScrollPositionUntilNextRender:u}=(0,l.a_)(),c=e=>{const t=e.currentTarget,a=o.indexOf(t),r=i[a].value;r!==n&&(u(t),s(r))},d=e=>{let t=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const a=o.indexOf(e.currentTarget)+1;t=o[a]??o[0];break}case"ArrowLeft":{const a=o.indexOf(e.currentTarget)-1;t=o[a]??o[o.length-1];break}}t?.focus()};return(0,g.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.A)("tabs",{"tabs--block":a},t),children:i.map((e=>{let{value:t,label:a,attributes:l}=e;return(0,g.jsx)("li",{role:"tab",tabIndex:n===t?0:-1,"aria-selected":n===t,ref:e=>o.push(e),onKeyDown:d,onClick:c,...l,className:(0,r.A)("tabs__item",b.tabItem,l?.className,{"tabs__item--active":n===t}),children:a??t},t)}))})}function y(e){let{lazy:t,children:a,selectedValue:l}=e;const s=(Array.isArray(a)?a:[a]).filter(Boolean);if(t){const e=s.find((e=>e.props.value===l));return e?(0,n.cloneElement)(e,{className:(0,r.A)("margin-top--md",e.props.className)}):null}return(0,g.jsx)("div",{className:"margin-top--md",children:s.map(((e,t)=>(0,n.cloneElement)(e,{key:t,hidden:e.props.value!==l})))})}function j(e){const t=m(e);return(0,g.jsxs)("div",{className:(0,r.A)("tabs-container",b.tabList),children:[(0,g.jsx)(x,{...t,...e}),(0,g.jsx)(y,{...t,...e})]})}function w(e){const t=(0,v.A)();return(0,g.jsx)(j,{...e,children:d(e.children)},String(t))}},1525:(e,t,a)=>{a.d(t,{R:()=>s,x:()=>i});var n=a(2155);const r={},l=n.createContext(r);function s(e){const t=n.useContext(l);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),n.createElement(l.Provider,{value:t},e.children)}}}]);