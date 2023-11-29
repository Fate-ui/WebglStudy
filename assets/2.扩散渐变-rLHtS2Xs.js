import{S as w,P as x,W as g,N as m,D as p,h as t,b as f,f as u}from"./three.module-QHcyoKWZ.js";import{O as y}from"./OrbitControls-8TWoeIgH.js";import{a as _}from"./index-du8DvFNP.js";import{d as b}from"./index-W38Qjy34.js";import{d as z,l as R,s as S,p as M,o as U,c as P,h as r,F as C}from"./index-bx_dK3Ep.js";const F=r("div",{class:"fixed left-20px top-20px px-20px leading-50px z-1 bg-white rounded"},[r("span",null,"学习来源："),r("a",{href:"https://www.bilibili.com/video/BV1iX4y1r7Dj/?spm_id_from=333.788&vd_source=c21dc7a2f93289c8e3df1bde97f015b9",target:"_blank",class:"text-blue"}," B站：扫射shader ")],-1),B=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,V=`
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
`,k=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,j=`
  varying vec2 vUv;
  uniform float scale;
  uniform vec3 color1;
  uniform vec3 color2;

  float rect(vec2 size) {
    size = vec2(0.5) - size * 0.5;
    vec2 shaper = vec2(step(size, vUv));
    shaper *= vec2(step(size, 1.0 - vUv));
    return shaper.x * shaper.y;
  }

  float ringRect(vec2 size, float width) {
    float inner = rect(size);
    float outer = rect(size - vec2(width));
    return inner - outer;
  }

  void main() {
    float mixer1 = ringRect(vec2(0.2, 0.2) * scale, 0.05);
    float mixer2 = ringRect(vec2(0.6, 0.6) * scale, 0.05);
    float mixer3 = ringRect(vec2(1.0, 1.0) * scale, 0.05);
    float mixer = mixer1 + mixer2 + mixer3;
    vec3 color = mix(color1, color2, mixer);
    gl_FragColor = vec4(color, mixer);
  }

`,H=z({__name:"2.扩散渐变",setup(D){const o={width:window.innerWidth,height:window.innerHeight},a=new w,i=new x(45,o.width/o.height,.1,1e3);i.position.set(0,30,60);const e=new g({antialias:!0});e.setSize(o.width,o.height),e.setPixelRatio(window.devicePixelRatio),R(()=>{var l;(l=v.value)==null||l.appendChild(e.domElement)});const v=S(),h=new y(i,e.domElement),s=new m({vertexShader:B,fragmentShader:V,transparent:!0,side:p,uniforms:{scale:{value:0},color1:{value:new t("yellow")},color2:{value:new t("blue")}}}),n=new f(new u(10,10),s);n.rotation.x=-Math.PI/2,n.position.x=-30,a.add(n);const c=new m({vertexShader:k,fragmentShader:j,transparent:!0,side:p,uniforms:{scale:{value:0},color1:{value:new t("yellow")},color2:{value:new t("blue")}}}),d=new f(new u(10,10),c);return d.rotation.x=-Math.PI/2,a.add(d),_(()=>{e.render(a,i),h.update(),s.uniforms.scale.value+=.01,s.uniforms.scale.value%=1,c.uniforms.scale.value+=.01,c.uniforms.scale.value%=1}),M(()=>{b(a,e)}),(l,E)=>(U(),P(C,null,[r("div",{ref_key:"containerRef",ref:v},null,512),F],64))}});export{H as default};
