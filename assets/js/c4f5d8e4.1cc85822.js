"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([["6130"],{3966:function(e,t,n){n.r(t),n.d(t,{default:()=>m});var r=n("1549"),s=n("9982"),a=n("2855"),o=n("1658"),i=n("6430"),l=n("5712"),c=n("288"),p=n("976");n("4194");let u={heroBanner:"heroBanner_UJJx",buttons:"buttons_pzbO",features:"features_keug",featureImage:"featureImage_yA8i",example:"example_HLHF"};function h(e){let{text:t}=e,{isDarkTheme:n}=(0,a.I)();return(0,r.jsx)("h1",{className:"hero__title",children:(0,r.jsx)("img",{src:(0,o.ZP)(`img/${n?"logo-title-alt":"logo-title"}.svg`),alt:t,width:"480"})})}function m(){let{siteConfig:e={}}=(0,i.Z)();return(0,r.jsxs)(c.Z,{title:e.tagline,description:"React components for Leaflet maps",children:[(0,r.jsx)("header",{className:(0,p.Z)("hero",u.heroBanner),children:(0,r.jsxs)("div",{className:"container",children:[(0,r.jsx)(h,{text:e.title}),(0,r.jsx)("p",{className:"hero__subtitle",children:e.tagline}),(0,r.jsx)("div",{className:u.buttons,children:(0,r.jsx)(s.Z,{className:(0,p.Z)("button button--outline button--primary button--lg",u.getStarted),to:(0,o.ZP)("docs/start-introduction"),children:"Get Started"})})]})}),(0,r.jsx)("main",{className:u.example,children:(0,r.jsx)(l.Z,{live:!0,noInline:!0,className:"tsx",children:`const position = [51.505, -0.09]
        
render(
  <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
)`})})]})}},6522:function(e,t,n){n.d(t,{Z:function(){return i}});var r=n(710),s=n(3481),a=n(4194),o=n(9186);let i={L:s,React:a,...r,...a,...o}}}]);