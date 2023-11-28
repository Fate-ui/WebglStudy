import{S as x,h as y,P as S,W as U,f as T,B as _,c as C,aK as M,aL as G,aM as P,aN as R,aO as E,N as v,D as l,b as m,E as F}from"./three.module-QHcyoKWZ.js";import{a as b}from"./index-zO-Sle_b.js";import{O as k}from"./OrbitControls-8TWoeIgH.js";import{d as V,s as B,l as j,o as O,c as W}from"./index-EijTbRPw.js";const z=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

`,D=`
varying vec2 vUv;
uniform float uTime;
void main() {
  vec3 color1 = vec3(1.0, 1.0, 0.0);
  vec3 color2 = vec3(0.0, 1.0, 1.0);
  float value = step(0.5, fract((vUv.x - uTime / 3.0) * 3.0));
  vec3 color = mix(color1, color2, value);
  gl_FragColor = vec4(color, 1.0);
}
`,d=-13,u=3,L=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,N=`
  varying vec2 vUv;
  uniform float uTime;
  void main() {
    vec3 color1 = vec3(vUv, 1.0);
    vec3 color2 = vec3(1.0, 1.0, 1.0);
    float dist = distance(fract(vUv * 5.0), vec2(0.5, 0.5));
    // 半径大小随时间周期变化
   float radius =  0.5 * (sin(uTime + vUv.x + vUv.y) * 0.5 + 0.5);
    vec3 color = mix(color1, color2, step(radius, dist));
    gl_FragColor = vec4(color, 1.0);
  }
`,H=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,K=`
  varying vec2 vUv;
  uniform float uTime;
  void main() {
    vec3 color1 = vec3(0.5, fract(vUv.x + uTime), vUv.y);
    vec3 color2 = vec3(1.0, 1.0, 1.0);
    float mixer = abs(step(0.5, fract(vUv.x * 5.0)) - step(0.5, fract(vUv.y * 5.0)));
    vec3 color = mix(color1, color2, mixer);
    gl_FragColor = vec4(color, 1.0);
  }
`,Q=V({__name:"8.glsl语法",setup(X){const a={width:window.innerWidth,height:window.innerHeight},i=new x;i.background=new y("teal");const n=new S(45,a.width/a.height,.1,1e3);n.position.set(3,3,15);const t=new U({antialias:!0});t.setSize(a.width,a.height),t.setPixelRatio(window.devicePixelRatio);const f=B();j(()=>{f.value.appendChild(t.domElement)});const s=[new T(1,1,1),new _(1,1,1),new C(.5,32,32),new M(.5,.7,4,8),new G(.5,32),new P(.5,1,32),new R(.5,.5,1,32),new E(.5,1,32)],p=new v({vertexShader:z,fragmentShader:D,side:l,uniforms:{uTime:{value:0}}});for(const[o,r]of s.entries()){const e=new m(r,p);e.position.x=d+o*u,e.position.y=3,i.add(e)}const g=new v({vertexShader:L,fragmentShader:N,side:l,uniforms:{uTime:{value:0}}});for(const[o,r]of s.entries()){const e=new m(r,g);e.position.x=d+o*u,e.position.y=0,i.add(e)}const h=new v({vertexShader:H,fragmentShader:K,uniforms:{uTime:{value:0}},side:l});for(const[o,r]of s.entries()){const e=new m(r,h);e.position.x=d+o*u,e.position.y=-3,i.add(e)}const w=new k(n,t.domElement),c=new F;return b(()=>{t.render(i,n),w.update(),p.uniforms.uTime.value=c.getElapsedTime(),g.uniforms.uTime.value=c.getElapsedTime(),h.uniforms.uTime.value=c.getElapsedTime()}),(o,r)=>(O(),W("div",{ref_key:"containerRef",ref:f},null,512))}});export{Q as default};
