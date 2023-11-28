import{S as x,h as g,P as M,W as _,f as S,a as C,b as d,p as P,V as a,aW as y,bD as R,N as T}from"./three.module-EC2ItXet.js";import{a as U}from"./index-AcvGrBFK.js";import{O as b}from"./OrbitControls-UvYfdcau.js";import{g as W}from"./index-nk37oyWQ.js";import{d as k}from"./index-W38Qjy34.js";import{d as E,s as G,l as B,p as V,o as z,c as F}from"./index-qUhmW9vi.js";const O=`
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

`,K=E({__name:"26.流体光墙",setup(D){const t={width:window.innerWidth,height:window.innerHeight},o=new x;o.background=new g("#070630");const i=new M(45,t.width/t.height,.1,1e3);i.position.set(30,30,30);const e=new _({antialias:!0});e.setSize(t.width,t.height),e.setPixelRatio(window.devicePixelRatio);const c=G();B(()=>{var s;(s=c.value)==null||s.appendChild(e.domElement)});const l=new b(i,e.domElement),p=new S(100,100),h=new C({color:10066329,side:2}),m=new d(p,h);m.rotation.x=-Math.PI/2,o.add(m);const w=new P([new a(10,0,10),new a(10,0,-10),new a(-10,0,-10),new a(-10,0,10)],!0),n=new y;n.moveTo(0,0),n.lineTo(-10,0),n.closePath();const u={steps:100,extrudePath:w},v=new R(n,u),r=new T({uniforms:{time:{value:0}},vertexShader:O,fragmentShader:j}),f=new d(v,r);return r.opacity=.7,o.add(f),W.to(r.uniforms.time,{value:11,duration:3,ease:"none",repeat:-1}),U(()=>{e.render(o,i),l.update()}),V(()=>{k(o,e)}),(s,H)=>(z(),F("div",{ref_key:"containerRef",ref:c},null,512))}});export{K as default};
