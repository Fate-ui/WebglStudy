import{S as M,h as T,P as _,W as C,f as E,B as F,c as G,aK as P,aL as V,aM as R,aN as z,aO as b,N as c,D as v,b as l,K as w,E as k}from"./three.module-QHcyoKWZ.js";import{u as j,a as B}from"./index-du8DvFNP.js";import{O as L}from"./OrbitControls-8TWoeIgH.js";import{d as O,s as W,l as D,o as K,c as N}from"./index-bx_dK3Ep.js";const X=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

`,H=`
varying vec2 vUv;
uniform float uTime;
void main() {
  vec3 color1 = vec3(1.0, 1.0, 0.0);
  vec3 color2 = vec3(0.0, 1.0, 1.0);
  float value = step(0.5, fract((vUv.x - uTime / 3.0) * 3.0));
  vec3 color = mix(color1, color2, value);
  gl_FragColor = vec4(color, 1.0);
}
`,m=-13,d=3,Y=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,q=`
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
`,A=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,I=`
  varying vec2 vUv;
  uniform float uTime;
  void main() {
    vec3 color1 = vec3(0.5, fract(vUv.x + uTime), vUv.y);
    vec3 color2 = vec3(1.0, 1.0, 1.0);
    float mixer = abs(step(0.5, fract(vUv.x * 5.0)) - step(0.5, fract(vUv.y * 5.0)));
    vec3 color = mix(color1, color2, mixer);
    gl_FragColor = vec4(color, 1.0);
  }
`,J=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,Q=`
varying vec2 vUv;
uniform float uTime;
uniform vec2 uMouse;

float rect(vec2 size) {
  size = vec2(0.5) - size * 0.5;
  vec2 shaper = vec2(step(size, vUv));
  shaper *= vec2(step(size, 1.0 - vUv));
  return shaper.x * shaper.y;
}

void main() {
  vec3 color1 = vec3(0.0, 1.0, 1.0);
  vec3 color2 = vec3(1.0, 1.0, 0.0);

  vec3 color = mix(color1, color2, rect(vec2(0.9, 0.5)));
  color += mix(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, 0.0), distance(uMouse, vUv));
  gl_FragColor = vec4(color, 1.0);
}
`,ie=O({__name:"8.glsl语法",setup(Z){const i={width:window.innerWidth,height:window.innerHeight},t=new M;t.background=new T("teal");const u=new _(45,i.width/i.height,.1,1e3);u.position.set(3,3,15);const n=new C({antialias:!0});n.setSize(i.width,i.height),n.setPixelRatio(window.devicePixelRatio);const f=W();D(()=>{f.value.appendChild(n.domElement)});const a=[new E(1,1,1),new F(1,1,1),new G(.5,32,32),new P(.5,.7,4,8),new V(.5,32),new R(.5,1,32),new z(.5,.5,1,32),new b(.5,1,32)],g=new c({vertexShader:X,fragmentShader:H,side:v,uniforms:{uTime:{value:0}}});for(const[o,r]of a.entries()){const e=new l(r,g);e.position.x=m+o*d,e.position.y=3,t.add(e)}const h=new c({vertexShader:Y,fragmentShader:q,side:v,uniforms:{uTime:{value:0}}});for(const[o,r]of a.entries()){const e=new l(r,h);e.position.x=m+o*d,e.position.y=0,t.add(e)}const x=new c({vertexShader:A,fragmentShader:I,uniforms:{uTime:{value:0}},side:v});for(const[o,r]of a.entries()){const e=new l(r,x);e.position.x=m+o*d,e.position.y=-3,t.add(e)}const p=new c({vertexShader:J,fragmentShader:Q,side:v,uniforms:{uTime:{value:0},uMouse:{value:new w}}});for(const[o,r]of a.entries()){const e=new l(r,p);e.position.x=m+o*d,e.position.y=-6,t.add(e)}j("mousemove",o=>{const{clientX:r,clientY:e}=o,U=r/i.width,S=1-e/i.height;p.uniforms.uMouse.value=new w(U,S)});const y=new L(u,n.domElement),s=new k;return B(()=>{n.render(t,u),y.update(),g.uniforms.uTime.value=s.getElapsedTime(),h.uniforms.uTime.value=s.getElapsedTime(),x.uniforms.uTime.value=s.getElapsedTime(),p.uniforms.uTime.value=s.getElapsedTime()}),(o,r)=>(K(),N("div",{ref_key:"containerRef",ref:f},null,512))}});export{ie as default};
