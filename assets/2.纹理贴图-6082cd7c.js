import{i as v}from"./index-1a26f821.js";import{p as x}from"./picture-36021d40.js";import{d as P,s as U,m as g,l as S,o as b,c as d}from"./index-0b642964.js";const F=P({__name:"2.纹理贴图",setup(D){const n=U();let e,a;const t=g({position:null,a_pin:null,u_sample:null});return S(()=>{e=n.value.getContext("webgl"),a=v(e,`
    attribute vec4 position;
    attribute vec2 a_pin;
    varying vec2 v_pin;
    void main() {
      gl_Position = position;
      v_pin = a_pin;
    }
  `,`
    precision mediump float;
    uniform sampler2D u_sample;
    varying vec2 v_pin;
    void main() {
      gl_FragColor = texture2D(u_sample, v_pin);
    }
  `);const[s,_]=[2,2],m=[-.5,.5,0,s,-.5,-.5,0,0,.5,.5,_,s,.5,-.5,_,0],o=new Float32Array(m),r=2,c=2,E=r+c,T=o.BYTES_PER_ELEMENT,l=E*T,u=r*T,f=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,f),e.bufferData(e.ARRAY_BUFFER,o,e.STATIC_DRAW),t.position=e.getAttribLocation(a,"position"),e.vertexAttribPointer(t.position,r,e.FLOAT,!1,l,0),e.enableVertexAttribArray(t.position),t.a_pin=e.getAttribLocation(a,"a_pin"),e.vertexAttribPointer(t.a_pin,c,e.FLOAT,!1,l,u),e.enableVertexAttribArray(t.a_pin),e.clearColor(0,0,0,1),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,1),e.activeTexture(e.TEXTURE1);const A=e.createTexture();e.bindTexture(e.TEXTURE_2D,A);const i=new Image;i.src=x,i.onload=()=>{e.texImage2D(e.TEXTURE_2D,0,e.RGB,e.RGB,e.UNSIGNED_BYTE,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT),t.u_sample=e.getUniformLocation(a,"u_sample"),e.uniform1i(t.u_sample,1),e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.TRIANGLE_STRIP,0,o.length/E)}}),(p,R)=>(b(),d("canvas",{ref_key:"canvasRef",ref:n,width:"1000",height:"800",class:"m-auto"},null,512))}});export{F as default};
