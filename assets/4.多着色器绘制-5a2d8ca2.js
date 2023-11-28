import{i as A}from"./index-1a26f821.js";import{p as g}from"./picture-36021d40.js";import{d as L,s as C,l as p,o as I,c as U}from"./index-ef070050.js";const w=L({__name:"4.多着色器绘制",setup(S){const c=C();return p(()=>{const r=c.value.getContext("webgl");r.clearColor(.3,.6,.5,1);const e=`
    attribute vec4 a_Position;
    attribute vec2 a_PicCoord;
    varying vec2 v_PicCoord;
    void main() {
      gl_Position = a_Position;
      v_PicCoord = a_PicCoord;
    }
  `,E=`
    precision mediump float;
    uniform vec4 u_Color;
    void main() {
      gl_FragColor = u_Color;
    }
  `,P=`
    void main() {
      gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
    }
  `,F=`
    precision mediump float;
    uniform sampler2D u_Sampler;
    varying vec2 v_PicCoord;
    void main() {
      gl_FragColor = texture2D(u_Sampler, v_PicCoord);
    }
  `,o=new Image;o.src=g,o.onload=()=>{const a=A(r,e,E),d=new Float32Array([-.5,1,.5,.5,-.5,.5]),f=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,f),r.bufferData(r.ARRAY_BUFFER,d,r.STATIC_DRAW);const i=r.getAttribLocation(a,"a_Position");r.vertexAttribPointer(i,2,r.FLOAT,!1,0,0),r.enableVertexAttribArray(i);const R=r.getUniformLocation(a,"u_Color");r.uniform4f(R,Math.random(),.5,.5,1),r.clear(r.COLOR_BUFFER_BIT),r.drawArrays(r.TRIANGLE_STRIP,0,3);const u=A(r,e,P),v=new Float32Array([-.5,1,.5,1,.5,.5]),T=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,T),r.bufferData(r.ARRAY_BUFFER,v,r.STATIC_DRAW);const n=r.getAttribLocation(u,"a_Position");r.vertexAttribPointer(n,2,r.FLOAT,!1,0,0),r.enableVertexAttribArray(n),r.drawArrays(r.TRIANGLE_STRIP,0,3);const t=A(r,e,F),b=new Float32Array([-.5,.5,0,1,.5,.5,1,1,-.5,-.5,0,0,.5,-.5,1,0]),l=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,l),r.bufferData(r.ARRAY_BUFFER,b,r.STATIC_DRAW);const s=r.getAttribLocation(t,"a_Position");r.vertexAttribPointer(s,2,r.FLOAT,!1,16,0),r.enableVertexAttribArray(s);const _=r.getAttribLocation(t,"a_PicCoord");r.vertexAttribPointer(_,2,r.FLOAT,!1,16,8),r.enableVertexAttribArray(_);const x=r.createTexture();r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,1),r.activeTexture(r.TEXTURE1),r.bindTexture(r.TEXTURE_2D,x),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),r.texImage2D(r.TEXTURE_2D,0,r.RGB,r.RGB,r.UNSIGNED_BYTE,o);const B=r.getUniformLocation(t,"u_Sampler");r.uniform1i(B,1),r.drawArrays(r.TRIANGLE_STRIP,0,4);function m(){r.clear(r.COLOR_BUFFER_BIT),r.useProgram(a),r.bindBuffer(r.ARRAY_BUFFER,f),r.vertexAttribPointer(i,2,r.FLOAT,!1,0,0),r.uniform4f(R,Math.random(),.5,.5,1),r.drawArrays(r.TRIANGLE_STRIP,0,3),r.useProgram(u),r.bindBuffer(r.ARRAY_BUFFER,T),r.vertexAttribPointer(n,2,r.FLOAT,!1,0,0),r.drawArrays(r.TRIANGLE_STRIP,0,3),r.useProgram(t),r.bindBuffer(r.ARRAY_BUFFER,l),r.vertexAttribPointer(s,2,r.FLOAT,!1,16,0),r.vertexAttribPointer(_,2,r.FLOAT,!1,16,8),r.drawArrays(r.TRIANGLE_STRIP,0,4),requestAnimationFrame(m)}m()}}),(r,e)=>(I(),U("canvas",{ref_key:"canvasRef",ref:c,width:"500",height:"500",class:"m-auto"},null,512))}});export{w as default};
