import{S as w,P as C,W as g,b as u,f as x,a as b,D as _,B as y,N as M,h}from"./three.module-0f5ed231.js";import{O as S}from"./OrbitControls-477b977e.js";import{a as P}from"./index-d36258bf.js";import{d as R}from"./index-1a26f821.js";import{d as B,l as E,s as G,p as k,o as H,c as L}from"./index-aabec682.js";const s=20,J=B({__name:"1.柱体渐变",setup(W){const r={width:window.innerWidth,height:window.innerHeight},a=new w,l=new C(45,r.width/r.height,.1,1e3);l.position.set(0,30,60);const t=new g({antialias:!0});t.setSize(r.width,r.height),t.setPixelRatio(window.devicePixelRatio),E(()=>{var o;(o=m.value)==null||o.appendChild(t.domElement)});const m=G(),f=new S(l,t.domElement),{random:n}=Math;function p(){const o=new y(1,Math.max(n()*15,4),1,10),e=`
  varying vec3 vColor;
  uniform vec3 upColor;
  uniform vec3 downColor;
  uniform float time;
  uniform float speed;
  uniform float height;
  void main() {
    float percent = (position.y + height / 2.0) / height;
    vColor = mix(downColor, upColor, percent);
    vColor.r *= abs(cos(time));

    vec3 transformed = position;
    transformed.y *= min(sin(time), 1.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
`,i=`
  varying vec3 vColor;
  void main() {
    gl_FragColor = vec4(vColor, 1.0);
  }
`,v=new M({vertexShader:e,fragmentShader:i,uniforms:{upColor:{value:new h("teal")},downColor:{value:new h("yellow")},time:{value:0},speed:{value:0},height:{value:0}}});return new u(o,v)}const c=[];for(let o=0;o<100;o++){const e=p(),i=e.geometry.parameters.height;e.position.set(n()*s-s/2,i/2,n()*s-s/2),e.material.uniforms.upColor.value.setHSL(n(),1,.5),e.material.uniforms.downColor.value.setHSL(n(),1,.5),e.material.uniforms.speed.value=n()*4,e.material.uniforms.height.value=i,c.push(e),a.add(e)}const d=new u(new x(100,100),new b({color:10066329,side:_}));return d.rotation.x=-Math.PI/2,a.add(d),P(()=>{t.render(a,l),f.update(),c.forEach(o=>{o.material.uniforms.time.value+=.01})}),k(()=>{R(a,t)}),(o,e)=>(H(),L("div",{ref_key:"containerRef",ref:m},null,512))}});export{J as default};
