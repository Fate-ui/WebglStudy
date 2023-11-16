import{S as d,P as p,W as m,N as v,D as f,h as r,b as u,f as h}from"./three.module-0f5ed231.js";import{O as w}from"./OrbitControls-477b977e.js";import{a as y}from"./index-d36258bf.js";import{d as _}from"./index-1a26f821.js";import{d as g,l as x,s as P,p as R,o as S,c as C}from"./index-aabec682.js";const M=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,b=`
  varying vec2 vUv;
  uniform float scale;
  uniform vec3 color1;
  uniform vec3 color2;
  void main() {
    float distance = distance(vUv, vec2(0.5, 0.5));
    float opacity = smoothstep(0.4 * scale, 0.5 * scale, distance);
    float opacity2 = smoothstep(0.2 * scale, 0.3 * scale, distance);
    float opacity3 = smoothstep(0.05 * scale, 0.1 * scale, distance);
    opacity *= step(distance, 0.5 * scale);
    opacity2 *= step(distance, 0.3 * scale);
    opacity3 *= step(distance, 0.1 * scale);
    vec3 color = color1 + (color2 - color1) * scale;

    gl_FragColor = vec4(color, opacity + opacity2 + opacity3);
  }
`,F=g({__name:"2.扩散渐变",setup(U){const o={width:window.innerWidth,height:window.innerHeight},a=new d,t=new p(45,o.width/o.height,.1,1e3);t.position.set(0,30,60);const e=new m({antialias:!0});e.setSize(o.width,o.height),e.setPixelRatio(window.devicePixelRatio),x(()=>{var n;(n=i.value)==null||n.appendChild(e.domElement)});const i=P(),l=new w(t,e.domElement),s=new v({vertexShader:M,fragmentShader:b,transparent:!0,side:f,uniforms:{scale:{value:0},color1:{value:new r("yellow")},color2:{value:new r("blue")}}}),c=new u(new h(10,10),s);return c.rotation.x=-Math.PI/2,a.add(c),y(()=>{e.render(a,t),l.update(),s.uniforms.scale.value+=.01,s.uniforms.scale.value%=1}),R(()=>{_(a,e)}),(n,k)=>(S(),C("div",{ref_key:"containerRef",ref:i},null,512))}});export{F as default};
