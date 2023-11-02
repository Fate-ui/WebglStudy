import{M as s}from"./three.module-d7a93e67.js";import{i as b}from"./index-1a26f821.js";import{p as L}from"./mf-854bc8f3.js";import{d as U,s as S,m as P,l as B,o as D,c as F}from"./index-781b760a.js";const h=U({__name:"3.魔方",setup(y){const l=S();let e,o;const t=P({position:null,a_pin:null,u_sample:null});return B(()=>{e=l.value.getContext("webgl"),o=b(e,`
    attribute vec4 position;
    attribute vec2 a_pin;
    uniform mat4 u_ModelMatrix;
    varying vec2 v_pin;
    void main() {
      gl_Position = u_ModelMatrix * position;
      v_pin = a_pin;
    }
  `,`
    precision mediump float;
    uniform sampler2D u_sample;
    varying vec2 v_pin;
    void main() {
      gl_FragColor = texture2D(u_sample, v_pin);
    }
  `),e.clearColor(0,0,0,1),e.enable(e.CULL_FACE),e.enable(e.DEPTH_TEST);const x=[-.5,-.5,-.5,0,0,-.5,.5,-.5,0,.5,.5,-.5,-.5,.25,0,-.5,.5,-.5,0,.5,.5,.5,-.5,.25,.5,.5,-.5,-.5,.25,0,-.5,-.5,.5,.25,0,.5,-.5,.5,.5,0,-.5,.5,.5,.25,.5,-.5,.5,.5,.25,.5,.5,-.5,.5,.5,0,.5,.5,.5,.5,.5,-.5,.5,-.5,.5,0,-.5,.5,.5,.5,.5,.5,.5,-.5,.75,0,-.5,.5,.5,.5,.5,.5,.5,.5,.75,.5,.5,.5,-.5,.75,0,-.5,-.5,-.5,0,.5,.5,-.5,-.5,.25,.5,-.5,-.5,.5,0,1,-.5,-.5,.5,0,1,.5,-.5,-.5,.25,.5,.5,-.5,.5,.25,1,-.5,-.5,-.5,.25,.5,-.5,-.5,.5,.25,1,-.5,.5,-.5,.5,.5,-.5,-.5,.5,.25,1,-.5,.5,.5,.5,1,-.5,.5,-.5,.5,.5,.5,-.5,-.5,.5,.5,.5,.5,-.5,.75,.5,.5,-.5,.5,.5,1,.5,-.5,.5,.5,1,.5,.5,-.5,.75,.5,.5,.5,.5,.75,1],n=new Float32Array(x),a=3,_=2,c=a+_,m=n.BYTES_PER_ELEMENT,u=c*m,A=a*m,v=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,v),e.bufferData(e.ARRAY_BUFFER,n,e.STATIC_DRAW),t.position=e.getAttribLocation(o,"position"),e.vertexAttribPointer(t.position,a,e.FLOAT,!1,u,0),e.enableVertexAttribArray(t.position),t.a_pin=e.getAttribLocation(o,"a_pin"),e.vertexAttribPointer(t.a_pin,_,e.FLOAT,!1,u,A),e.enableVertexAttribArray(t.a_pin);const i=new s,d=new s().makeRotationX(.02),g=new s().makeRotationY(.02),p=e.getUniformLocation(o,"u_ModelMatrix");e.uniformMatrix4fv(p,!1,i.elements),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,1),e.activeTexture(e.TEXTURE1);const M=e.createTexture();e.bindTexture(e.TEXTURE_2D,M);const r=new Image;r.src=L,r.onload=()=>{e.texImage2D(e.TEXTURE_2D,0,e.RGB,e.RGB,e.UNSIGNED_BYTE,r),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),t.u_sample=e.getUniformLocation(o,"u_sample"),e.uniform1i(t.u_sample,1),f()};function f(){e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.TRIANGLES,0,n.length/c)}function E(){i.multiply(g).multiply(d),e.uniformMatrix4fv(p,!1,i.elements),f(),requestAnimationFrame(E)}E()}),(T,R)=>(D(),F("canvas",{ref_key:"canvasRef",ref:l,width:"700",height:"700",class:"m-auto"},null,512))}});export{h as default};
