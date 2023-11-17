import{i as u}from"./index-1a26f821.js";import{d as f,s as _,m,l as p,o as A,c as R}from"./index-28042951.js";const g=f({__name:"3.缩放",setup(v){const a=_();let e,o;const t=m({position:null,u_scale:null});return p(()=>{e=a.value.getContext("webgl"),o=u(e,`
    attribute vec4 position;
    uniform float u_scale;
    void main() {
      gl_Position = vec4(vec3(position) * u_scale, 1.0);
    }
  `,`
    void main() {
      gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
    }
  `),t.position=e.getAttribLocation(o,"position");const c=[0,0,.3,0,0,.3],l=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,l),e.bufferData(e.ARRAY_BUFFER,new Float32Array(c),e.STATIC_DRAW),e.vertexAttribPointer(t.position,2,e.FLOAT,!1,0,0),e.enableVertexAttribArray(t.position),t.u_scale=e.getUniformLocation(o,"u_scale"),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.TRIANGLES,0,3);let r=0;function n(){r+=.03,e.uniform1f(t.u_scale,Math.sin(r)),e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.TRIANGLES,0,3),requestAnimationFrame(n)}n()}),(s,i)=>(A(),R("canvas",{ref_key:"canvasRef",ref:a,width:"500",height:"500",class:"m-auto"},null,512))}});export{g as default};
