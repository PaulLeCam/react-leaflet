"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[7975],{7485:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>u,contentTitle:()=>o,default:()=>h,frontMatter:()=>i,metadata:()=>c,toc:()=>d});var n=a(5723),r=a(1525),s=a(9473),l=a(7221);const i={title:"Installation"},o=void 0,c={id:"start-installation",title:"Installation",description:"React prerequisites",source:"@site/docs/start-installation.mdx",sourceDirName:".",slug:"/start-installation",permalink:"/docs/next/start-installation",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"Installation"},sidebar:"docs",previous:{title:"Introduction",permalink:"/docs/next/start-introduction"},next:{title:"Setup",permalink:"/docs/next/start-setup"}},u={},d=[{value:"React prerequisites",id:"react-prerequisites",level:2},{value:"Leaflet prerequisites",id:"leaflet-prerequisites",level:2},{value:"Adding React Leaflet",id:"adding-react-leaflet",level:2},{value:"Using ESM imports",id:"using-esm-imports",level:3},{value:"Using a package registry",id:"using-a-package-registry",level:3},{value:"TypeScript support",id:"typescript-support",level:2},{value:"Dependencies",id:"dependencies",level:3},{value:"Imports",id:"imports",level:3}];function p(e){const t={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",...(0,r.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h2,{id:"react-prerequisites",children:"React prerequisites"}),"\n",(0,n.jsxs)(t.p,{children:["This documentation assumes you are already familiar with ",(0,n.jsx)(t.a,{href:"https://react.dev/",children:"React"})," and have a project setup. If it is not the case, you should read ",(0,n.jsx)(t.a,{href:"https://react.dev/learn",children:"React's Quick Start documentation"})," first."]}),"\n",(0,n.jsx)(t.h2,{id:"leaflet-prerequisites",children:"Leaflet prerequisites"}),"\n",(0,n.jsxs)(t.p,{children:["This documentation assumes you are already familiar with ",(0,n.jsx)(t.a,{href:"https://leafletjs.com/",children:"Leaflet"}),". React Leaflet ",(0,n.jsx)(t.strong,{children:"does not replace Leaflet"}),", it only provides bindings between React and Leaflet."]}),"\n",(0,n.jsxs)(t.p,{children:["This documentation ",(0,n.jsx)(t.strong,{children:"is not a replacement"})," for ",(0,n.jsx)(t.a,{href:"https://leafletjs.com/reference.html",children:"Leaflet's documentation"}),", it only focuses on aspects specific to React Leaflet."]}),"\n",(0,n.jsx)(t.admonition,{title:"Read this before going further",type:"caution",children:(0,n.jsxs)(t.p,{children:["Before using React Leaflet, you must setup your project following ",(0,n.jsx)(t.a,{href:"https://leafletjs.com/examples/quick-start/",children:"Leaflet's Quick Start Guide"}),"."]})}),"\n",(0,n.jsx)(t.h2,{id:"adding-react-leaflet",children:"Adding React Leaflet"}),"\n",(0,n.jsx)(t.h3,{id:"using-esm-imports",children:"Using ESM imports"}),"\n",(0,n.jsxs)(t.p,{children:["React Leaflet exports ",(0,n.jsx)(t.a,{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules",children:"ES Modules"})," that can be imported by URL, notably from CDNs such as ",(0,n.jsx)(t.a,{href:"https://esm.sh/",children:"esm.sh"}),":"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"import { MapContainer } from 'https://cdn.esm.sh/react-leaflet/MapContainer'\nimport { TileLayer } from 'https://cdn.esm.sh/react-leaflet/TileLayer'\nimport { useMap } from 'https://cdn.esm.sh/react-leaflet/hooks'\n"})}),"\n",(0,n.jsx)(t.p,{children:"Or importing the full library at once:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"import {\n  MapContainer,\n  TileLayer,\n  useMap,\n} from 'https://cdn.esm.sh/react-leaflet'\n"})}),"\n",(0,n.jsx)(t.h3,{id:"using-a-package-registry",children:"Using a package registry"}),"\n",(0,n.jsxs)(t.p,{children:["A package registry such as ",(0,n.jsx)(t.a,{href:"https://www.npmjs.com/",children:"npm"})," can be used to install React Leaflet and its dependencies."]}),"\n",(0,n.jsx)(t.p,{children:"React, React DOM and Leaflet are required peer dependencies. You must add them to your project if they are not already installed:"}),"\n",(0,n.jsxs)(s.A,{defaultValue:"npm",groupId:"package-manager",values:[{label:"npm",value:"npm"},{label:"pnpm",value:"pnpm"}],children:[(0,n.jsx)(l.A,{value:"npm",children:(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"npm install react@rc react-dom@rc leaflet\n"})})}),(0,n.jsx)(l.A,{value:"pnpm",children:(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"pnpm add react@rc react-dom@rc leaflet\n"})})})]}),"\n",(0,n.jsx)(t.p,{children:"Then you can install React Leaflet:"}),"\n",(0,n.jsxs)(s.A,{defaultValue:"npm",groupId:"package-manager",values:[{label:"npm",value:"npm"},{label:"pnpm",value:"pnpm"}],children:[(0,n.jsx)(l.A,{value:"npm",children:(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"npm install react-leaflet@next\n"})})}),(0,n.jsx)(l.A,{value:"pnpm",children:(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"pnpm add react-leaflet@next\n"})})})]}),"\n",(0,n.jsxs)(t.p,{children:["Modules can then be imported using bare specifiers when supported by a bundler such as ",(0,n.jsx)(t.a,{href:"https://webpack.js.org/",children:"webpack"}),"."]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"import { MapContainer } from 'react-leaflet/MapContainer'\nimport { TileLayer } from 'react-leaflet/TileLayer'\nimport { useMap } from 'react-leaflet/hooks'\n"})}),"\n",(0,n.jsx)(t.p,{children:"Alternatively, all the components and hooks can be imported from the module entry-point:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"import { MapContainer, TileLayer, useMap } from 'react-leaflet'\n"})}),"\n",(0,n.jsx)(t.h2,{id:"typescript-support",children:"TypeScript support"}),"\n",(0,n.jsx)(t.h3,{id:"dependencies",children:"Dependencies"}),"\n",(0,n.jsx)(t.p,{children:"React Leaflet provides TypeScript definitions in the installed packages, but needs Leaflet's definitions to be present. If you have not installed them yet, you will need to add them:"}),"\n",(0,n.jsxs)(s.A,{defaultValue:"npm",groupId:"package-manager",values:[{label:"npm",value:"npm"},{label:"pnpm",value:"pnpm"}],children:[(0,n.jsx)(l.A,{value:"npm",children:(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"npm install -D @types/leaflet\n"})})}),(0,n.jsx)(l.A,{value:"pnpm",children:(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"pnpm add -D @types/leaflet\n"})})})]}),"\n",(0,n.jsx)(t.h3,{id:"imports",children:"Imports"}),"\n",(0,n.jsx)(t.p,{children:"TypeScript definitions are only exported from the package entry-point, so you should import from it directly when using TypeScript:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-ts",children:"// \u26a0\ufe0f No types available here\nimport { MapContainer } from 'react-leaflet/MapContainer'\n\n// \u2705 Types are available here\nimport { MapContainer } from 'react-leaflet'\n"})})]})}function h(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(p,{...e})}):p(e)}},7221:(e,t,a)=>{a.d(t,{A:()=>l});a(2155);var n=a(851);const r={tabItem:"tabItem_T_ay"};var s=a(5723);function l(e){let{children:t,hidden:a,className:l}=e;return(0,s.jsx)("div",{role:"tabpanel",className:(0,n.A)(r.tabItem,l),hidden:a,children:t})}},9473:(e,t,a)=>{a.d(t,{A:()=>k});var n=a(2155),r=a(851),s=a(4150),l=a(2934),i=a(8978),o=a(1723),c=a(7400),u=a(9462);function d(e){return n.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,n.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:t,children:a}=e;return(0,n.useMemo)((()=>{const e=t??function(e){return d(e).map((e=>{let{props:{value:t,label:a,attributes:n,default:r}}=e;return{value:t,label:a,attributes:n,default:r}}))}(a);return function(e){const t=(0,c.XI)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,a])}function h(e){let{value:t,tabValues:a}=e;return a.some((e=>e.value===t))}function m(e){let{queryString:t=!1,groupId:a}=e;const r=(0,l.W6)(),s=function(e){let{queryString:t=!1,groupId:a}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!a)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return a??null}({queryString:t,groupId:a});return[(0,o.aZ)(s),(0,n.useCallback)((e=>{if(!s)return;const t=new URLSearchParams(r.location.search);t.set(s,e),r.replace({...r.location,search:t.toString()})}),[s,r])]}function f(e){const{defaultValue:t,queryString:a=!1,groupId:r}=e,s=p(e),[l,o]=(0,n.useState)((()=>function(e){let{defaultValue:t,tabValues:a}=e;if(0===a.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!h({value:t,tabValues:a}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${a.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const n=a.find((e=>e.default))??a[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:t,tabValues:s}))),[c,d]=m({queryString:a,groupId:r}),[f,g]=function(e){let{groupId:t}=e;const a=function(e){return e?`docusaurus.tab.${e}`:null}(t),[r,s]=(0,u.Dv)(a);return[r,(0,n.useCallback)((e=>{a&&s.set(e)}),[a,s])]}({groupId:r}),b=(()=>{const e=c??f;return h({value:e,tabValues:s})?e:null})();(0,i.A)((()=>{b&&o(b)}),[b]);return{selectedValue:l,selectValue:(0,n.useCallback)((e=>{if(!h({value:e,tabValues:s}))throw new Error(`Can't select invalid tab value=${e}`);o(e),d(e),g(e)}),[d,g,s]),tabValues:s}}var g=a(1722);const b={tabList:"tabList_KJdB",tabItem:"tabItem_uTQN"};var x=a(5723);function v(e){let{className:t,block:a,selectedValue:n,selectValue:l,tabValues:i}=e;const o=[],{blockElementScrollPositionUntilNextRender:c}=(0,s.a_)(),u=e=>{const t=e.currentTarget,a=o.indexOf(t),r=i[a].value;r!==n&&(c(t),l(r))},d=e=>{let t=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const a=o.indexOf(e.currentTarget)+1;t=o[a]??o[0];break}case"ArrowLeft":{const a=o.indexOf(e.currentTarget)-1;t=o[a]??o[o.length-1];break}}t?.focus()};return(0,x.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.A)("tabs",{"tabs--block":a},t),children:i.map((e=>{let{value:t,label:a,attributes:s}=e;return(0,x.jsx)("li",{role:"tab",tabIndex:n===t?0:-1,"aria-selected":n===t,ref:e=>o.push(e),onKeyDown:d,onClick:u,...s,className:(0,r.A)("tabs__item",b.tabItem,s?.className,{"tabs__item--active":n===t}),children:a??t},t)}))})}function j(e){let{lazy:t,children:a,selectedValue:s}=e;const l=(Array.isArray(a)?a:[a]).filter(Boolean);if(t){const e=l.find((e=>e.props.value===s));return e?(0,n.cloneElement)(e,{className:(0,r.A)("margin-top--md",e.props.className)}):null}return(0,x.jsx)("div",{className:"margin-top--md",children:l.map(((e,t)=>(0,n.cloneElement)(e,{key:t,hidden:e.props.value!==s})))})}function y(e){const t=f(e);return(0,x.jsxs)("div",{className:(0,r.A)("tabs-container",b.tabList),children:[(0,x.jsx)(v,{...t,...e}),(0,x.jsx)(j,{...t,...e})]})}function k(e){const t=(0,g.A)();return(0,x.jsx)(y,{...e,children:d(e.children)},String(t))}},1525:(e,t,a)=>{a.d(t,{R:()=>l,x:()=>i});var n=a(2155);const r={},s=n.createContext(r);function l(e){const t=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),n.createElement(s.Provider,{value:t},e.children)}}}]);