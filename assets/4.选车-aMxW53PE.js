import{b as W,f as re,d as j,a as A}from"./base-i78343Mr.js";import{E as de,a as ce}from"./el-radio-x0wSpKtl.js";import{S as pe,P as me,W as ue,G as fe,b as ge,a6 as $,j as he,m as _e,k as I}from"./three.module-EC2ItXet.js";import{O as ve}from"./OrbitControls-UvYfdcau.js";import{D as we}from"./DRACOLoader-qxrhcOaj.js";import{G as ye}from"./GLTFLoader-2es8O60f.js";import{d as Ce}from"./index-W38Qjy34.js";import{m as be,c as G}from"./typescript-s4sHOmN-.js";import{U as q,C as J}from"./event-1FCdoqwy.js";import{k as K,L as ke,U as xe,f as h,d as E,o as H,c as M,O as R,P,a as s,i as Ee,w as _,S as Te,a0 as Pe,T as He,K as Le,h as x,q as v,a1 as $e,z as Ke,A as Me,j as Q,t as X,n as Be,s as Ie,l as Ne,p as Re,F as V,r as z,$ as Oe,E as Se}from"./index-qUhmW9vi.js";import{_ as D,w as Ve,c as Ae}from"./use-form-item-HMGt__fy.js";import{d as De,E as Fe}from"./index-O2se9W_j.js";import"./style-xLxcu4R_.js";const Y=()=>Math.floor(Math.random()*1e4),U=a=>typeof re(a),Ge=W({accordion:Boolean,modelValue:{type:j([Array,String,Number]),default:()=>be([])}}),ze={[q]:U,[J]:U},Z=Symbol("collapseContextKey"),Ue=(a,o)=>{const t=K(G(a.modelValue)),l=n=>{t.value=n;const i=a.accordion?t.value[0]:t.value;o(q,i),o(J,i)},e=n=>{if(a.accordion)l([t.value[0]===n?"":n]);else{const i=[...t.value],d=i.indexOf(n);d>-1?i.splice(d,1):i.push(n),l(i)}};return ke(()=>a.modelValue,()=>t.value=G(a.modelValue),{deep:!0}),xe(Z,{activeNames:t,handleItemClick:e}),{activeNames:t,setActiveNames:l}},We=()=>{const a=A("collapse");return{rootKls:h(()=>a.b())}},je=E({name:"ElCollapse"}),qe=E({...je,props:Ge,emits:ze,setup(a,{expose:o,emit:t}){const l=a,{activeNames:e,setActiveNames:n}=Ue(l,t),{rootKls:i}=We();return o({activeNames:e,setActiveNames:n}),(d,u)=>(H(),M("div",{class:P(s(i))},[R(d.$slots,"default")],2))}});var Je=D(qe,[["__file","/home/runner/work/element-plus/element-plus/packages/components/collapse/src/collapse.vue"]]);const Qe=E({name:"ElCollapseTransition"}),Xe=E({...Qe,setup(a){const o=A("collapse-transition"),t=e=>{e.style.maxHeight="",e.style.overflow=e.dataset.oldOverflow,e.style.paddingTop=e.dataset.oldPaddingTop,e.style.paddingBottom=e.dataset.oldPaddingBottom},l={beforeEnter(e){e.dataset||(e.dataset={}),e.dataset.oldPaddingTop=e.style.paddingTop,e.dataset.oldPaddingBottom=e.style.paddingBottom,e.style.maxHeight=0,e.style.paddingTop=0,e.style.paddingBottom=0},enter(e){e.dataset.oldOverflow=e.style.overflow,e.scrollHeight!==0?e.style.maxHeight=`${e.scrollHeight}px`:e.style.maxHeight=0,e.style.paddingTop=e.dataset.oldPaddingTop,e.style.paddingBottom=e.dataset.oldPaddingBottom,e.style.overflow="hidden"},afterEnter(e){e.style.maxHeight="",e.style.overflow=e.dataset.oldOverflow},enterCancelled(e){t(e)},beforeLeave(e){e.dataset||(e.dataset={}),e.dataset.oldPaddingTop=e.style.paddingTop,e.dataset.oldPaddingBottom=e.style.paddingBottom,e.dataset.oldOverflow=e.style.overflow,e.style.maxHeight=`${e.scrollHeight}px`,e.style.overflow="hidden"},leave(e){e.scrollHeight!==0&&(e.style.maxHeight=0,e.style.paddingTop=0,e.style.paddingBottom=0)},afterLeave(e){t(e)},leaveCancelled(e){t(e)}};return(e,n)=>(H(),Ee(He,Te({name:s(o).b()},Pe(l)),{default:_(()=>[R(e.$slots,"default")]),_:3},16,["name"]))}});var N=D(Xe,[["__file","/home/runner/work/element-plus/element-plus/packages/components/collapse-transition/src/collapse-transition.vue"]]);N.install=a=>{a.component(N.name,N)};const Ye=N,Ze=W({title:{type:String,default:""},name:{type:j([String,Number]),default:()=>Y()},disabled:Boolean}),et=a=>{const o=Le(Z),t=K(!1),l=K(!1),e=K(Y()),n=h(()=>o==null?void 0:o.activeNames.value.includes(a.name));return{focusing:t,id:e,isActive:n,handleFocus:()=>{setTimeout(()=>{l.value?l.value=!1:t.value=!0},50)},handleHeaderClick:()=>{a.disabled||(o==null||o.handleItemClick(a.name),t.value=!1,l.value=!0)},handleEnterClick:()=>{o==null||o.handleItemClick(a.name)}}},tt=(a,{focusing:o,isActive:t,id:l})=>{const e=A("collapse"),n=h(()=>[e.b("item"),e.is("active",s(t)),e.is("disabled",a.disabled)]),i=h(()=>[e.be("item","header"),e.is("active",s(t)),{focusing:s(o)&&!a.disabled}]),d=h(()=>[e.be("item","arrow"),e.is("active",s(t))]),u=h(()=>e.be("item","wrap")),w=h(()=>e.be("item","content")),y=h(()=>e.b(`content-${s(l)}`)),C=h(()=>e.b(`head-${s(l)}`));return{arrowKls:d,headKls:i,rootKls:n,itemWrapperKls:u,itemContentKls:w,scopedContentId:y,scopedHeadId:C}},st=["id","aria-expanded","aria-controls","aria-describedby","tabindex"],at=["id","aria-hidden","aria-labelledby"],ot=E({name:"ElCollapseItem"}),nt=E({...ot,props:Ze,setup(a,{expose:o}){const t=a,{focusing:l,id:e,isActive:n,handleFocus:i,handleHeaderClick:d,handleEnterClick:u}=et(t),{arrowKls:w,headKls:y,rootKls:C,itemWrapperKls:B,itemContentKls:O,scopedContentId:T,scopedHeadId:f}=tt(t,{focusing:l,isActive:n,id:e});return o({isActive:n}),(b,c)=>(H(),M("div",{class:P(s(C))},[x("button",{id:s(f),class:P(s(y)),"aria-expanded":s(n),"aria-controls":s(T),"aria-describedby":s(T),tabindex:b.disabled?-1:0,onClick:c[0]||(c[0]=(...g)=>s(d)&&s(d)(...g)),onKeydown:c[1]||(c[1]=$e(Be((...g)=>s(u)&&s(u)(...g),["stop","prevent"]),["space","enter"])),onFocus:c[2]||(c[2]=(...g)=>s(i)&&s(i)(...g)),onBlur:c[3]||(c[3]=g=>l.value=!1)},[R(b.$slots,"title",{},()=>[Q(X(b.title),1)]),v(s(Fe),{class:P(s(w))},{default:_(()=>[v(s(De))]),_:1},8,["class"])],42,st),v(s(Ye),null,{default:_(()=>[Me(x("div",{id:s(T),role:"region",class:P(s(B)),"aria-hidden":!s(n),"aria-labelledby":s(f)},[x("div",{class:P(s(O))},[R(b.$slots,"default")],2)],10,at),[[Ke,s(n)]])]),_:3})],2))}});var ee=D(nt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/collapse/src/collapse-item.vue"]]);const lt=Ve(Je,{CollapseItem:ee}),it=Ae(ee),rt={class:"fixed right-0 top-0 w-320px bg-white"},dt={class:"flex justify-between"},ct=["onClick"],xt=E({__name:"4.选车",setup(a){const o={width:window.innerWidth,height:window.innerHeight},t=new pe,l=new me(45,o.width/o.height,1,1e4);l.position.set(6,6,6);const e=new ue({antialias:!0});e.setSize(o.width,o.height),e.setPixelRatio(window.devicePixelRatio);const n=Ie();Ne(()=>{n.value.appendChild(e.domElement)}),t.add(new fe(10,10));const i=new ve(l,e.domElement),d=new we;d.setDecoderPath("draco/");const u=new ye;u.setDRACOLoader(d),u.load("model/car.glb",p=>{const L=p.scene;t.add(L),L.traverse(r=>{if(r instanceof ge){const{name:k}=r;k.includes("Mesh002")?(r.material.dispose(),r.material=w):k.includes("轮毂")?(r.material.dispose(),r.material=B):k.includes("前脸")?(r.material.dispose(),r.material=y):k.includes("引擎盖_1")?(r.material.dispose(),r.material=C):k.includes("挡风玻璃")&&(r.material.dispose(),r.material=O)}})});const w=new $({color:16711680,metalness:1,roughness:.5,clearcoat:1,clearcoatRoughness:0}),y=new $({color:16711680,metalness:1,roughness:.5,clearcoat:1,clearcoatRoughness:0}),C=new $({color:16711680,metalness:1,roughness:.5,clearcoat:1,clearcoatRoughness:0}),B=new $({color:16711680,metalness:1,roughness:.1}),O=new $({color:16777215,transmission:1,transparent:!0,metalness:0,roughness:.1});t.add(new he(16777215,1));const T=new _e(16777215,3);T.position.set(0,15,0),t.add(T);const f=new I(16777215,500);f.power=1e4,f.position.set(25,5,0),t.add(f);const b=new I(16777215,500);f.power=1e4,b.position.set(-25,5,0),t.add(b);const c=new I(16777215,500);f.power=1e4,c.position.set(0,5,25),t.add(c);const g=new I(16777215,500);f.power=1e4,g.position.set(0,5,-25),t.add(g);function F(){requestAnimationFrame(F),e.render(t,l),i.update()}F();const te=["red","blue","green","gray","orange","purple"];function se(p){w.color.set(p),y.color.set(p),C.color.set(p),B.color.set(p)}const ae=[{name:"磨砂",value:1},{name:"冰晶",value:0}],S=K();function oe(p){w.clearcoatRoughness=p,y.clearcoatRoughness=p,C.clearcoatRoughness=p}return Re(()=>{Ce(t,e)}),(p,L)=>{const r=it,k=de,ne=ce,le=lt;return H(),M(V,null,[x("div",{ref_key:"containerRef",ref:n},null,512),x("div",rt,[v(le,{class:"mx-20px"},{default:_(()=>[v(r,{title:"颜色"},{default:_(()=>[x("ul",dt,[(H(),M(V,null,z(te,m=>x("li",{key:m,class:"w-40px h-40px rounded-full cursor-pointer",style:Oe({background:m}),onClick:ie=>se(m)},null,12,ct)),64))])]),_:1}),v(r,{title:"贴膜材质"},{default:_(()=>[v(ne,{modelValue:s(S),"onUpdate:modelValue":L[0]||(L[0]=m=>Se(S)?S.value=m:null)},{default:_(()=>[(H(),M(V,null,z(ae,m=>v(k,{key:m.value,label:m.value,onChange:ie=>oe(m.value)},{default:_(()=>[Q(X(m.name),1)]),_:2},1032,["label","onChange"])),64))]),_:1},8,["modelValue"])]),_:1})]),_:1})])],64)}}});export{xt as default};
