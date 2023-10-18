import{i as f}from"./index-1a26f821.js";import{d as u,s as m,m as _,l as d,o as p,c as A}from"./index-2c776554.js";const F=u({__name:"1.位移",setup(R){const a=m();let e,r;const t=_({position:null,u_modelMatrix:null});return d(()=>{e=a.value.getContext("webgl"),r=f(e,`
    attribute vec4 position;
    uniform vec4 modelMatrix;
    void main() {
      gl_Position = position + modelMatrix;
    }
  `,`
    void main() {
      gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
    }
  `),t.position=e.getAttribLocation(r,"position");const l=[0,0,.3,0,0,.3],c=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,c),e.bufferData(e.ARRAY_BUFFER,new Float32Array(l),e.STATIC_DRAW),e.vertexAttribPointer(t.position,2,e.FLOAT,!1,0,0),e.enableVertexAttribArray(t.position);let o=-1;t.u_modelMatrix=e.getUniformLocation(r,"modelMatrix"),e.uniform4f(t.u_modelMatrix,0,o,0,0),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.TRIANGLES,0,3);function i(){o>=1&&(o=-1),o+=.01,e.uniform4f(t.u_modelMatrix,0,o,0,0),e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.TRIANGLES,0,3),requestAnimationFrame(i)}i()}),(n,s)=>(p(),A("canvas",{ref_key:"canvasRef",ref:a,width:"500",height:"500",class:"m-auto"},null,512))}});export{F as default};
