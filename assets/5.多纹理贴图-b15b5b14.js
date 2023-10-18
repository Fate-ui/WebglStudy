import{i as f}from"./index-1a26f821.js";import{p}from"./picture-36021d40.js";import{p as x}from"./mf-854bc8f3.js";import{d as v,s as A,l as d,o as P,c as g}from"./index-2c776554.js";const S="/WebglStudy/assets/pattern0-849e389b.jpg",F=v({__name:"5.多纹理贴图",setup(C){const n=A();return d(()=>{const e=n.value.getContext("webgl"),a=f(e,`
    attribute vec4 a_Position;
    attribute vec2 a_TexCoord;
    varying vec2 v_TexCoord;
    void main() {
      gl_Position = a_Position;
      v_TexCoord = a_TexCoord;
    }
  `,`
    precision mediump float;
    uniform sampler2D u_Sampler1;
    uniform sampler2D u_Sampler2 ;
    uniform sampler2D u_Sampler3;
    varying vec2 v_TexCoord;
    void main() {
      vec4 color1 = texture2D(u_Sampler1, v_TexCoord);
      vec4 color2 = texture2D(u_Sampler2, v_TexCoord);
      vec4 color3 = texture2D(u_Sampler3, v_TexCoord);
      gl_FragColor = mix(mix(color1, color2, 0.5), color3, 0.5);
    }
  `),T=new Float32Array([-.5,.5,0,1,.5,.5,1,1,-.5,-.5,0,0,.5,-.5,1,0]),m=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,m),e.bufferData(e.ARRAY_BUFFER,T,e.STATIC_DRAW);const c=e.getAttribLocation(a,"a_Position");e.vertexAttribPointer(c,2,e.FLOAT,!1,16,0),e.enableVertexAttribArray(c);const s=e.getAttribLocation(a,"a_TexCoord");e.vertexAttribPointer(s,2,e.FLOAT,!1,16,8),e.enableVertexAttribArray(s),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,1),e.clearColor(1,1,0,1);function u(o,r){const t=new Image;return t.src=o,new Promise(i=>{t.onload=()=>{i({image:t,index:r})}})}function E(o,r){const t=e.createTexture();e.activeTexture(e[`TEXTURE${r}`]),e.bindTexture(e.TEXTURE_2D,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT);const i=e.getUniformLocation(a,`u_Sampler${r+1}`);e.uniform1i(i,r),e.texImage2D(e.TEXTURE_2D,0,e.RGB,e.RGB,e.UNSIGNED_BYTE,o)}const R=[x,p,S],_=[];R.forEach((o,r)=>{_.push(u(o,r))}),Promise.all(_).then(o=>{o.forEach(r=>{E(r.image,r.index)}),e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.TRIANGLE_STRIP,0,4)})}),(e,l)=>(P(),g("canvas",{ref_key:"canvasRef",ref:n,width:"500",height:"500",class:"m-auto"},null,512))}});export{F as default};
