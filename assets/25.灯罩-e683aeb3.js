var L=(n,e,t)=>{if(!e.has(n))throw TypeError("Cannot "+t)};var h=(n,e,t)=>{if(e.has(n))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(n):e.set(n,t)};var m=(n,e,t)=>(L(n,e,"access private method"),t);import{S as b,h as _,P as U,W as B,f as E,am as W,b as v,r as I,c as z,a as F,bx as O,N as j,k as D}from"./three.module-0f5ed231.js";import{a as H}from"./index-d36258bf.js";import{O as J}from"./OrbitControls-477b977e.js";import{d as N}from"./index-1a26f821.js";import{d as T,s as V,l as q,p as A,o as K,c as Q}from"./index-aabec682.js";const ne=T({__name:"25.灯罩",setup(n){var r,x,c,P,d,C;const e={width:window.innerWidth,height:window.innerHeight},t=new b;t.background=new _("#070630");const p=new U(45,e.width/e.height,.1,1e3);p.position.set(30,30,30);const o=new B({antialias:!0});o.setSize(e.width,e.height),o.setPixelRatio(window.devicePixelRatio);const u=V();q(()=>{var l;(l=u.value)==null||l.appendChild(o.domElement)});const S=new J(p,o.domElement);class w extends I{constructor(){super();h(this,r);h(this,c);h(this,d);m(this,r,x).call(this),m(this,c,P).call(this)}}r=new WeakSet,x=function(){const i=new z(1,32,16,0,Math.PI*2,0,Math.PI/2),a=new F({color:16777215}),s=new v(i,a);s.position.set(0,3,0),m(this,d,C).call(this,s),this.add(s)},c=new WeakSet,P=function(){const i=new O(1,5,3,32),a=new j({transparent:!0,uniforms:{color:{value:new _("#CB00E3")}},vertexShader:`
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
  `}),s=new v(i,a);s.position.set(0,1.7,0),this.add(s)},d=new WeakSet,C=function(i){const a=new D(16777215,1,100);a.power=1e3,i.add(a)};const f=new w;f.position.set(0,10,0),t.add(f);const g=new w;g.position.set(10,10,0),t.add(g);const y=new w;y.position.set(0,10,10),t.add(y);const k=new E(100,100),G=new W({color:10066329,side:2}),M=new v(k,G);return M.rotation.x=-Math.PI/2,t.add(M),H(()=>{o.render(t,p),S.update()}),A(()=>{N(t,o)}),(l,R)=>(K(),Q("div",{ref_key:"containerRef",ref:u},null,512))}});export{ne as default};
