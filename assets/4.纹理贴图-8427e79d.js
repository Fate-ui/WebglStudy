import{i as l}from"./index-1a26f821.js";import{p as E}from"./picture-36021d40.js";import{d as u,s as m,l as R,o as f,c as x}from"./index-c6fb5685.js";const C=u({__name:"4.纹理贴图",setup(A){const o=m();return R(()=>{const e=o.value.getContext("webgl"),t=l(e,`
    attribute vec4 a_Position;
    attribute vec2 a_TexCoord;
    varying vec2 v_TexCoord;
    void main() {
      gl_Position = a_Position;
      v_TexCoord = a_TexCoord;
    }
  `,`
    precision mediump float;
    uniform sampler2D u_Sampler;
    varying vec2 v_TexCoord;
    void main() {
      gl_FragColor = texture2D(u_Sampler, v_TexCoord);
    }
  `),_=new Float32Array([-.5,.5,0,1,.5,.5,1,1,-.5,-.5,0,0,.5,-.5,1,0]),s=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,s),e.bufferData(e.ARRAY_BUFFER,_,e.STATIC_DRAW);const a=e.getAttribLocation(t,"a_Position");e.vertexAttribPointer(a,2,e.FLOAT,!1,16,0),e.enableVertexAttribArray(a);const i=e.getAttribLocation(t,"a_TexCoord");e.vertexAttribPointer(i,2,e.FLOAT,!1,16,8),e.enableVertexAttribArray(i),e.clearColor(1,1,0,1);const r=new Image;r.src=E;const c=e.createTexture();e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,1),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,c),r.onload=()=>{e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,e.RGB,e.RGB,e.UNSIGNED_BYTE,r);const T=e.getUniformLocation(t,"u_Sampler");e.uniform1i(T,1),e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.TRIANGLE_STRIP,0,4)}}),(e,n)=>(f(),x("canvas",{ref_key:"canvasRef",ref:o,width:"500",height:"500",class:"m-auto"},null,512))}});export{C as default};
