"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([["4823"],{7738:function(e,t,n){n.r(t),n.d(t,{default:()=>m});var r=n(1085),s=n(1093),a=n(2416),o=n(914),i=n(6913),l=n(2212),c=n(3294),p=n(4357);n(4041);let u={heroBanner:"heroBanner_UJJx",buttons:"buttons_pzbO",features:"features_keug",featureImage:"featureImage_yA8i",example:"example_HLHF"};function h({text:e}){let{isDarkTheme:t}=(0,a.G)();return(0,r.jsx)("h1",{className:"hero__title",children:(0,r.jsx)("img",{src:(0,o.Ay)(`img/${t?"logo-title-alt":"logo-title"}.svg`),alt:e,width:"480"})})}function m(){let{siteConfig:e={}}=(0,i.A)();return(0,r.jsxs)(c.A,{title:e.tagline,description:"React components for Leaflet maps",children:[(0,r.jsx)("header",{className:(0,p.A)("hero",u.heroBanner),children:(0,r.jsxs)("div",{className:"container",children:[(0,r.jsx)(h,{text:e.title}),(0,r.jsx)("p",{className:"hero__subtitle",children:e.tagline}),(0,r.jsx)("div",{className:u.buttons,children:(0,r.jsx)(s.A,{className:(0,p.A)("button button--outline button--primary button--lg",u.getStarted),to:(0,o.Ay)("docs/start-introduction"),children:"Get Started"})})]})}),(0,r.jsx)("main",{className:u.example,children:(0,r.jsx)(l.A,{live:!0,noInline:!0,className:"tsx",children:`const position = [51.505, -0.09]
        
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
)`})})]})}},3721:function(e,t,n){n.d(t,{A:()=>i});var r=n(9030),s=n(6902),a=n(4041),o=n(9283);let i={L:s,React:a,...r,...a,...o}}}]);