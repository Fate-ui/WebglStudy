import{i as P}from"./index-1a26f821.js";import{d as T,s as E,m as L,l as O,o as w,c as C}from"./index-781b760a.js";const D=T({__name:"1.绘制多点",setup(z){const _=E();let o,c;const t=L({position:null,a_color:null});return O(()=>{o=_.value.getContext("webgl"),c=P(o,`
    attribute vec4 position;
    attribute vec4 a_color;
    varying vec4 v_color;
    void main() {
      gl_Position = position;
      gl_PointSize = 5.0;
      v_color = a_color;
    }
  `,`
    precision mediump float;
    varying vec4 v_color;
    void main() {
      gl_FragColor = v_color;
    }
  `),t.position=o.getAttribLocation(c,"position");let r=[];const u={minX:-1,maxX:1};function R(x,S,h){r=[];for(let e=u.minX;e<u.maxX;e+=.01){const y=x*Math.sin(e*S+h),B=[e,-e,1-e,1];r.push(e,y,0,...B)}}let n=new Float32Array(r);const a=3,l=4,p=a+l,v=n.BYTES_PER_ELEMENT,i=p*v,A=a*v,d=o.createBuffer();o.bindBuffer(o.ARRAY_BUFFER,d),o.vertexAttribPointer(t.position,a,o.FLOAT,!1,i,0),o.vertexAttribPointer(t.a_color,l,o.FLOAT,!1,i,A),o.enableVertexAttribArray(t.position),t.a_color=o.getAttribLocation(c,"a_color"),o.enableVertexAttribArray(t.a_color),o.clearColor(0,0,0,1);let m=0,s=0,f=1;function b(){m+=.02,(s>=.2||s<=-.2)&&(f=-f),s+=.002*f,R(s,6,m),n=new Float32Array(r),o.bufferData(o.ARRAY_BUFFER,n,o.STATIC_DRAW),o.vertexAttribPointer(t.position,a,o.FLOAT,!1,i,0),o.vertexAttribPointer(t.a_color,l,o.FLOAT,!1,i,A),o.clear(o.COLOR_BUFFER_BIT),o.drawArrays(o.POINTS,0,n.length/p),requestAnimationFrame(b)}b()}),(g,F)=>(w(),C("canvas",{ref_key:"canvasRef",ref:_,width:"1000",height:"800",class:"m-auto"},null,512))}});export{D as default};
