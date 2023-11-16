import{S as x,h as g,P as M,W as _,f as S,a as y,b as d,p as C,V as a,aQ as P,by as R,N as T}from"./three.module-4d045381.js";import{a as U}from"./index-9ea2bc7a.js";import{O as b}from"./OrbitControls-67f14f60.js";import{g as k}from"./index-4db78ffb.js";import{d as E}from"./index-1a26f821.js";import{d as G,s as W,l as B,p as V,o as z,c as F}from"./index-4e7c88af.js";const O=`
    varying vec2 Uv;
    void main() {
      Uv=uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
`,j=`
    precision mediump float;
    uniform float time;
    varying vec2 Uv;

    void main() {
      float ToTopMix = -(Uv.x - time) * (Uv.x - time) + 0.2;
      gl_FragColor = mix(vec4(0.0,1.0,0.5, 1.0), vec4(1.0, 1.0, 1.0, 1.0), ToTopMix * 6.0);
    }

`,D=G({__name:"26.流体光墙",setup(H){const t={width:window.innerWidth,height:window.innerHeight},o=new x;o.background=new g("#070630");const i=new M(45,t.width/t.height,.1,1e3);i.position.set(30,30,30);const e=new _({antialias:!0});e.setSize(t.width,t.height),e.setPixelRatio(window.devicePixelRatio);const c=W();B(()=>{var s;(s=c.value)==null||s.appendChild(e.domElement)});const l=new b(i,e.domElement),p=new S(100,100),h=new y({color:10066329,side:2}),m=new d(p,h);m.rotation.x=-Math.PI/2,o.add(m);const w=new C([new a(10,0,10),new a(10,0,-10),new a(-10,0,-10),new a(-10,0,10)],!0),n=new P;n.moveTo(0,0),n.lineTo(-10,0),n.closePath();const u={steps:100,extrudePath:w},v=new R(n,u),r=new T({uniforms:{time:{value:0}},vertexShader:O,fragmentShader:j}),f=new d(v,r);return r.opacity=.7,o.add(f),k.to(r.uniforms.time,{value:11,duration:3,ease:"none",repeat:-1}),U(()=>{e.render(o,i),l.update()}),V(()=>{E(o,e)}),(s,I)=>(z(),F("div",{ref_key:"containerRef",ref:c},null,512))}});export{D as default};
