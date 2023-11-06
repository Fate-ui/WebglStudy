import{M as i}from"./three.module-a9580ee8.js";import{i as m}from"./index-1a26f821.js";import{d as u,s as f,m as _,l as p,o as d,c as v}from"./index-638dfcb3.js";const M=u({__name:"4.矩阵",setup(x){const a=f();let e,o;const t=_({position:null,u_modelMatrix:null});return p(()=>{e=a.value.getContext("webgl"),o=m(e,`
    attribute vec4 position;
    uniform mat4 u_modelMatrix;
    void main() {
      gl_Position = u_modelMatrix * position ;
    }
  `,`
    void main() {
      gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
    }
  `),t.position=e.getAttribLocation(o,"position");const l=[0,0,.3,0,0,.3],c=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,c),e.bufferData(e.ARRAY_BUFFER,new Float32Array(l),e.STATIC_DRAW),e.vertexAttribPointer(t.position,2,e.FLOAT,!1,0,0),e.enableVertexAttribArray(t.position),t.u_modelMatrix=e.getUniformLocation(o,"u_modelMatrix");const r=new i;r.makeScale(2,1,1).multiply(new i().makeTranslation(.2,.1,0)),e.uniformMatrix4fv(t.u_modelMatrix,!1,r.elements),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.TRIANGLES,0,3)}),(n,s)=>(d(),v("canvas",{ref_key:"canvasRef",ref:a,width:"500",height:"500",class:"m-auto"},null,512))}});export{M as default};
