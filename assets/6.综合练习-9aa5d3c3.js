import{M as f,V as s}from"./three.module-c3045e54.js";import{i as R}from"./index-1a26f821.js";import{d as w,s as g,m as F,l as B,o as h,c as S}from"./index-70ac187b.js";const O=w({__name:"6.综合练习",setup(T){const l=g();let e,a;const t=F({position:null,u_viewMatrix:null,u_modelMatrix:null});return B(()=>{e=l.value.getContext("webgl"),a=R(e,`
    attribute vec4 position;
    uniform mat4 u_viewMatrix;
    uniform mat4 u_modelMatrix;
    void main() {
      gl_Position = u_viewMatrix * u_modelMatrix * position;
      gl_PointSize = 5.0;
    }
  `,`
    precision mediump float;
    void main() {
      float dist = distance(gl_PointCoord, vec2(0.5, 0.5));
      if (dist < 0.5) {
        gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
      } else {
        discard;
      }
    }
  `),t.position=e.getAttribLocation(a,"position");let o=[];const i={minX:-.8,maxX:.8,minZ:-1,maxZ:1};function m(A){o=[];for(let r=i.minX;r<i.maxX;r+=.04)for(let n=i.minZ;n<i.maxZ;n+=.07){const M=.05*Math.sin((18+A)*r+3);o.push(r,M,n)}}m(0);const d=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,d),e.bufferData(e.ARRAY_BUFFER,new Float32Array(o),e.STATIC_DRAW),e.vertexAttribPointer(t.position,3,e.FLOAT,!1,0,0),e.enableVertexAttribArray(t.position),t.u_viewMatrix=e.getUniformLocation(a,"u_viewMatrix");const p=new f().lookAt(new s(.3,.4,.5),new s(0,0,0),new s(0,1,0));e.uniformMatrix4fv(t.u_viewMatrix,!1,p.elements),t.u_modelMatrix=e.getUniformLocation(a,"u_modelMatrix");const v=new f().makeTranslation(0,0,0);e.uniformMatrix4fv(t.u_modelMatrix,!1,v.elements),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.POINTS,0,o.length/3);let c=0;function u(){c+=.04,m(c),e.bufferData(e.ARRAY_BUFFER,new Float32Array(o),e.STATIC_DRAW),e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.POINTS,0,o.length/3),requestAnimationFrame(u)}u()}),(_,x)=>(h(),S("canvas",{ref_key:"canvasRef",ref:l,width:"1000",height:"800",class:"m-auto"},null,512))}});export{O as default};
