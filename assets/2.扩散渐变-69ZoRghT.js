import{S as p,P as m,W as f,N as v,D as u,h as l,b as h,f as w}from"./three.module-QHcyoKWZ.js";import{O as _}from"./OrbitControls-8TWoeIgH.js";import{a as x}from"./index-zO-Sle_b.js";import{d as y}from"./index-W38Qjy34.js";import{d as g,l as b,s as P,p as R,o as S,c as C,h as a,F as M}from"./index-EijTbRPw.js";const B=a("div",{class:"fixed left-20px top-20px px-20px leading-50px z-1 bg-white rounded"},[a("span",null,"学习来源："),a("a",{href:"https://www.bilibili.com/video/BV1iX4y1r7Dj/?spm_id_from=333.788&vd_source=c21dc7a2f93289c8e3df1bde97f015b9",target:"_blank",class:"text-blue"}," B站：扫射shader ")],-1),U=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,k=`
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
`,G=g({__name:"2.扩散渐变",setup(F){const o={width:window.innerWidth,height:window.innerHeight},t=new p,s=new m(45,o.width/o.height,.1,1e3);s.position.set(0,30,60);const e=new f({antialias:!0});e.setSize(o.width,o.height),e.setPixelRatio(window.devicePixelRatio),b(()=>{var i;(i=c.value)==null||i.appendChild(e.domElement)});const c=P(),d=new _(s,e.domElement),n=new v({vertexShader:U,fragmentShader:k,transparent:!0,side:u,uniforms:{scale:{value:0},color1:{value:new l("yellow")},color2:{value:new l("blue")}}}),r=new h(new w(10,10),n);return r.rotation.x=-Math.PI/2,t.add(r),x(()=>{e.render(t,s),d.update(),n.uniforms.scale.value+=.01,n.uniforms.scale.value%=1}),R(()=>{y(t,e)}),(i,z)=>(S(),C(M,null,[a("div",{ref_key:"containerRef",ref:c},null,512),B],64))}});export{G as default};
