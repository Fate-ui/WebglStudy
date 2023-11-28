import{M as _,V as c}from"./three.module-e7d85b12.js";import{i as p}from"./index-1a26f821.js";import{d as w,s as M,m as A,l as g,o as R,c as h}from"./index-ef070050.js";const b=w({__name:"5.视图矩阵",setup(F){const u=M();let e,a;const t=A({position:null,u_viewMatrix:null,u_modelMatrix:null});return g(()=>{e=u.value.getContext("webgl"),a=p(e,`
    attribute vec4 position;
    uniform mat4 u_viewMatrix;
    uniform mat4 u_modelMatrix;
    void main() {
      gl_Position = u_viewMatrix * u_modelMatrix * position;
    }
  `,`
    void main() {
      gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
    }
  `),t.position=e.getAttribLocation(a,"position");const n=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,-1,-1,1,1,-1,-1,1,-1,-1,-1,-1],i=[0,1,1,2,2,3,3,0,0,5,1,6,2,7,3,4,4,5,5,6,6,7,7,4],m=[];i.forEach(l=>{const r=l*3;m.push(n[r]/5,n[r+1]/5,n[r+2]/5)});const v=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,v),e.bufferData(e.ARRAY_BUFFER,new Float32Array(m),e.STATIC_DRAW),e.vertexAttribPointer(t.position,3,e.FLOAT,!1,0,0),e.enableVertexAttribArray(t.position),t.u_viewMatrix=e.getUniformLocation(a,"u_viewMatrix"),t.u_modelMatrix=e.getUniformLocation(a,"u_modelMatrix"),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.LINES,0,i.length);let o=-1,s=1;function f(){o+=.01*s,(o>=1||o<=-1)&&(s=-s);const l=new _().lookAt(new c(o,.2,1),new c(0,0,0),new c(0,1,0));e.uniformMatrix4fv(t.u_viewMatrix,!1,l.elements);const r=new _().makeTranslation(o,0,0);e.uniformMatrix4fv(t.u_modelMatrix,!1,r.elements),e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.LINES,0,i.length),e.drawArrays(e.LINES,0,i.length),requestAnimationFrame(f)}f()}),(d,x)=>(R(),h("canvas",{ref_key:"canvasRef",ref:u,width:"500",height:"500",class:"m-auto"},null,512))}});export{b as default};
