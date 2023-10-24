import{M as s,V as o,P as R}from"./three.module-64cab3bc.js";import{i as p}from"./index-1a26f821.js";import{d as T,s as w,l as C,o as B,c as h}from"./index-5935f0ca.js";const S=T({__name:"1.粒子动画",setup(g){const a=w();return C(()=>{const e=a.value.getContext("webgl");e.enable(e.DEPTH_TEST),e.clearColor(.5,.5,1,1);const t=p(e,`
    attribute vec4 a_Position;
    attribute vec4 a_Color;
    uniform mat4 u_ViewMatrix;
    uniform mat4 u_ModelMatrix;
    uniform mat4 u_PerspectiveCamera;
    void main() {
      gl_Position = u_PerspectiveCamera * u_ViewMatrix * u_ModelMatrix * a_Position;
    }
  `,`
    precision mediump float;
    uniform vec4 u_Color;
    void main() {
      gl_FragColor = u_Color;
    }
  `),m=new Float32Array([-.25,.25,.25,-.25,-.25,.25,.25,-.25,.25,.25,.25,.25,.25,.25,-.25,.25,-.25,-.25,-.25,-.25,-.25,-.25,.25,-.25]),f=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,f),e.bufferData(e.ARRAY_BUFFER,m,e.STATIC_DRAW);const r=e.getAttribLocation(t,"a_Position");e.vertexAttribPointer(r,3,e.FLOAT,!1,0,0),e.enableVertexAttribArray(r);const n=new Uint8Array([0,1,2,0,2,3,3,2,5,3,5,4,4,5,6,4,6,7,7,0,6,0,1,6,0,3,4,0,4,7,1,2,5,1,5,6]),u=e.createBuffer();e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,u),e.bufferData(e.ELEMENT_ARRAY_BUFFER,n,e.STATIC_DRAW),e.enable(e.DEPTH_TEST);const l=e.getUniformLocation(t,"u_ViewMatrix"),_=new s().lookAt(new o(.3,.4,.5),new o(0,0,0),new o(0,1,0));e.uniformMatrix4fv(l,!1,_.elements);const d=new R(45,a.value.width/a.value.height,1,20),v=e.getUniformLocation(t,"u_PerspectiveCamera");e.uniformMatrix4fv(v,!1,d.matrix.elements);function M(){const E=e.getUniformLocation(t,"u_ModelMatrix"),x=e.getUniformLocation(t,"u_Color");e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT);for(let i=0;i<1e3;i++){const A=new s().makeTranslation(Math.random()-.5,Math.random()-.5,Math.random()-.5);e.uniformMatrix4fv(E,!1,A.elements),e.uniform4f(x,Math.random(),Math.random(),Math.random(),.9),e.drawElements(e.TRIANGLES,n.length,e.UNSIGNED_BYTE,0)}}M()}),(e,c)=>(B(),h("canvas",{ref_key:"canvasRef",ref:a,width:"500",height:"500",class:"m-auto"},null,512))}});export{S as default};
