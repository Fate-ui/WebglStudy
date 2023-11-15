var L=(n,e,t)=>{if(!e.has(n))throw TypeError("Cannot "+t)};var h=(n,e,t)=>{if(e.has(n))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(n):e.set(n,t)};var p=(n,e,t)=>(L(n,e,"access private method"),t);import{S as b,h as _,P as B,W as E,f as U,a9 as W,b as v,r as I,c as z,a as F,bx as O,$ as j,k as D}from"./three.module-974779d4.js";import{a as H}from"./index-66785ad4.js";import{O as V}from"./OrbitControls-411cb46f.js";import{d as $,s as q,l as A,o as J,c as K}from"./index-0b642964.js";const Z=$({__name:"25.灯罩",setup(n){var r,x,c,P,d,C;const e={width:window.innerWidth,height:window.innerHeight},t=new b;t.background=new _("#070630");const m=new B(45,e.width/e.height,.1,1e3);m.position.set(30,30,30);const i=new E({antialias:!0});i.setSize(e.width,e.height),i.setPixelRatio(window.devicePixelRatio);const u=q();A(()=>{var l;(l=u.value)==null||l.appendChild(i.domElement)});const S=new V(m,i.domElement);class w extends I{constructor(){super();h(this,r);h(this,c);h(this,d);p(this,r,x).call(this),p(this,c,P).call(this)}}r=new WeakSet,x=function(){const s=new z(1,32,16,0,Math.PI*2,0,Math.PI/2),o=new F({color:16777215}),a=new v(s,o);a.position.set(0,3,0),p(this,d,C).call(this,a),this.add(a)},c=new WeakSet,P=function(){const s=new O(1,5,3,32),o=new j({transparent:!0,uniforms:{color:{value:new _("#CB00E3")}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform vec3 color;
    varying vec2 vUv;
    void main() {
      gl_FragColor = vec4(color, vUv.y);
    }
  `}),a=new v(s,o);a.position.set(0,1.7,0),this.add(a)},d=new WeakSet,C=function(s){const o=new D(16777215,1,100);o.power=1e3,s.add(o)};const g=new w;g.position.set(0,10,0),t.add(g);const f=new w;f.position.set(10,10,0),t.add(f);const y=new w;y.position.set(0,10,10),t.add(y);const k=new U(100,100),G=new W({color:10066329,side:2}),M=new v(k,G);return M.rotation.x=-Math.PI/2,t.add(M),H(()=>{i.render(t,m),S.update()}),(l,R)=>(J(),K("div",{ref_key:"containerRef",ref:u},null,512))}});export{Z as default};
