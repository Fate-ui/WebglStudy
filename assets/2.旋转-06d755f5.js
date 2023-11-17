import{i as l}from"./index-1a26f821.js";import{d as _,s as f,m as B,l as m,o as p,c as A}from"./index-28042951.js";const d=_({__name:"2.旋转",setup(R){const e=f();let o,i;const t=B({position:null,u_sinB:null,u_cosB:null});return m(()=>{o=e.value.getContext("webgl"),i=l(o,`
    attribute vec4 position;
    uniform float u_sinB;
    uniform float u_cosB;
    void main() {
      gl_Position.x = position.x * u_cosB - position.y * u_sinB;
      gl_Position.y = position.y * u_cosB - position.x * u_sinB;
      gl_Position.z = position.z;
      gl_Position.w = 1.0;
    }
  `,`
    void main() {
      gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
    }
  `),t.position=o.getAttribLocation(i,"position");const c=[0,0,.3,0,0,.3],u=o.createBuffer();o.bindBuffer(o.ARRAY_BUFFER,u),o.bufferData(o.ARRAY_BUFFER,new Float32Array(c),o.STATIC_DRAW),o.vertexAttribPointer(t.position,2,o.FLOAT,!1,0,0),o.enableVertexAttribArray(t.position),t.u_sinB=o.getUniformLocation(i,"u_sinB"),t.u_cosB=o.getUniformLocation(i,"u_cosB"),o.clearColor(0,0,0,1),o.clear(o.COLOR_BUFFER_BIT),o.drawArrays(o.TRIANGLES,0,3);let n=0;function s(){n+=.01,o.uniform1f(t.u_sinB,Math.sin(n)),o.uniform1f(t.u_cosB,Math.cos(n)),o.clear(o.COLOR_BUFFER_BIT),o.drawArrays(o.TRIANGLES,0,3),requestAnimationFrame(s)}s()}),(a,r)=>(p(),A("canvas",{ref_key:"canvasRef",ref:e,width:"500",height:"500",class:"m-auto"},null,512))}});export{d as default};
