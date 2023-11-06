import{d as v,k as m,m as u,l as h,o as R,c as g,h as _,n as S}from"./index-638dfcb3.js";import{g as F}from"./index-4db78ffb.js";import{i as x,g as f}from"./index-1a26f821.js";const y={class:"flex flex-col w-full"},C=_("header",{class:"mx-auto mt-20",text:"10"},"(点击鼠标左键新增点，右键撤销)",-1),P=["onContextmenu"],w=v({__name:"ConnectLines",setup(T){const s=m();let i,e;const o=u({position:null,u_alpha:null}),t=[0,0,.5,.3,.2,.4];h(()=>{e=s.value.getContext("webgl",{preserveDrawingBuffer:!0}),e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),i=x(e,`
    attribute vec4 position;
    void main() {
      gl_Position = position;
      gl_PointSize = 20.0;
    }
  `,`
    precision mediump float;
    uniform float u_alpha;
    void main() {
      float dist = distance(gl_PointCoord, vec2(0.5, 0.5));
      if (dist < 0.5) {
        gl_FragColor = vec4(1.0, 1.0, 0.0, u_alpha);
      } else {
        discard;
      }
    }
  `),o.position=e.getAttribLocation(i,"position"),o.u_alpha=e.getUniformLocation(i,"u_alpha");const n=u({value:1});e.uniform1f(o.u_alpha,n.value),F.to(n,{value:.3,yoyo:!0,repeat:-1,duration:1});const l=new Float32Array(t),d=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,d),e.bufferData(e.ARRAY_BUFFER,l,e.STATIC_DRAW),e.vertexAttribPointer(o.position,2,e.FLOAT,!1,0,0),e.enableVertexAttribArray(o.position),e.clearColor(0,1,1,1),e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.POINTS,0,3),e.drawArrays(e.LINE_STRIP,0,3)});function A(a){const r=f(a,s.value);t.push(r.x,r.y);const n=new Float32Array(t);e.bufferData(e.ARRAY_BUFFER,n,e.STATIC_DRAW),e.vertexAttribPointer(o.position,2,e.FLOAT,!1,0,0),e.drawArrays(e.POINTS,0,t.length/2),e.drawArrays(e.LINE_STRIP,0,t.length/2)}function c(a){const r=f(a,s.value),n=t.concat([r.x,r.y]);e.clear(e.COLOR_BUFFER_BIT);const l=new Float32Array(n);e.bufferData(e.ARRAY_BUFFER,l,e.STATIC_DRAW),e.vertexAttribPointer(o.position,2,e.FLOAT,!1,0,0),e.drawArrays(e.POINTS,0,t.length/2),e.drawArrays(e.LINE_STRIP,0,n.length/2)}function p(a){t.splice(-2),c(a)}return(a,r)=>(R(),g("div",y,[C,_("canvas",{ref_key:"canvasRef",ref:s,width:"500",height:"500",class:"m-auto",onClick:A,onMousemove:c,onContextmenu:S(p,["prevent"])},null,40,P)]))}});export{w as default};
