import{i as l}from"./index-1a26f821.js";import{d as _,s as f,l as v,o as A,c as u}from"./index-03aa2b5a.js";const m=_({__name:"3.绘图模式",setup(d){const o=f();let e;return v(()=>{e=o.value.getContext("webgl");const t=l(e,`
    attribute vec4 a_Position;
    attribute vec4 a_Color;
    varying vec4 v_Color;
    void main() {
      gl_Position = a_Position;
      gl_PointSize = 10.0;
      v_Color = a_Color;
    }
  `,`
    precision mediump float;
    varying vec4 v_Color;
    void main() {
      float dist = distance(gl_PointCoord, vec2(0.5, 0.5));
      if (dist < 0.5) {
        gl_FragColor = v_Color;
      } else {
        discard;
      }
    }
  `),s=new Float32Array([-.5,.5,1,0,0,1,-.5,-.5,1,0,0,1,0,.5,0,1,0,1,0,-.5,0,1,0,1,.5,.5,0,0,1,1,.5,-.5,0,0,1,1]),c=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,c),e.bufferData(e.ARRAY_BUFFER,s,e.STATIC_DRAW);const r=e.getAttribLocation(t,"a_Position");e.vertexAttribPointer(r,2,e.FLOAT,!1,24,0),e.enableVertexAttribArray(r);const a=e.getAttribLocation(t,"a_Color");e.vertexAttribPointer(a,4,e.FLOAT,!1,24,8),e.enableVertexAttribArray(a),e.clearColor(.5,0,1,1),e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.TRIANGLE_FAN,0,6)}),(i,n)=>(A(),u("canvas",{ref_key:"canvasRef",ref:o,width:"500",height:"500",class:"m-auto"},null,512))}});export{m as default};
