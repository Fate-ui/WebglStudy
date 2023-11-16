import{Color as _}from"https://unpkg.com/three/build/three.module.js";import{i as f}from"./index-1a26f821.js";import{d as u,k as m,l as A,o as R,c as g}from"./index-1bad62f9.js";const S=u({__name:"DrawRectangle",setup(p){let r;const t=m();return A(()=>{const o=t.value.getContext("webgl");o.enable(o.BLEND),o.blendFunc(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA),r=f(o,`
        attribute vec4 a_Position;
        void main() {
            gl_Position = a_Position;
            gl_PointSize = 50.0;
        }
    `,`
        precision mediump float;
        uniform vec4 u_Color;
        void main() {
            gl_FragColor = u_Color;
        }
    `);const n=o.getAttribLocation(r,"a_Position"),c=new Float32Array([-.2,.2,-.2,-.2,.2,.2,.2,-.2]),l=o.createBuffer();o.bindBuffer(o.ARRAY_BUFFER,l),o.bufferData(o.ARRAY_BUFFER,c,o.STATIC_DRAW),o.vertexAttribPointer(n,2,o.FLOAT,!1,0,0),o.enableVertexAttribArray(n);const a=o.getUniformLocation(r,"u_Color");o.uniform4f(a,.5,1,.5,1);const e=new _("rgb(255, 0, 0)");o.clearColor(e.r,e.g,e.a,1),o.clear(o.COLOR_BUFFER_BIT),o.drawArrays(o.TRIANGLE_STRIP,0,4);function i(){e.offsetHSL(.005,0,0),o.clear(o.COLOR_BUFFER_BIT),o.uniform4f(a,e.r,e.g,e.b,1),o.drawArrays(o.TRIANGLE_STRIP,0,4),requestAnimationFrame(i)}i()}),(o,s)=>(R(),g("canvas",{ref_key:"canvas",ref:t,width:"500",height:"500",style:{margin:"100px 200px"}},null,512))}});export{S as default};
