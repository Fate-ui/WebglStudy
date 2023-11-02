import{C as w,k as S,L as O,f as v,d as y,o as B,c as I,h as g,z as N,a2 as h,a as e,E as P,Q as b,n as E,P as V,B as F,j as D,t as M,H as Q,l as W,V as x,m as J,x as X,M as Y}from"./index-781b760a.js";import{b as R,f as _,j as z,u as T,a as G}from"./base-69a98eb3.js";import{U as C,C as Z,d as ee}from"./event-e06a23af.js";import{a as oe,b as ae,_ as $,d as le,u as se,e as ne,w as te,c as A}from"./use-form-item-8d7e105e.js";const K=R({size:T,disabled:Boolean,label:{type:[String,Number,Boolean],default:""}}),re=R({...K,modelValue:{type:[String,Number,Boolean],default:""},name:{type:String,default:""},border:Boolean}),L={[C]:s=>w(s)||_(s)||z(s),[Z]:s=>w(s)||_(s)||z(s)},U=Symbol("radioGroupKey"),j=(s,m)=>{const n=S(),a=O(U,void 0),d=v(()=>!!a),f=v({get(){return d.value?a.modelValue:s.modelValue},set(i){d.value?a.changeEvent(i):m&&m(C,i),n.value.checked=s.modelValue===s.label}}),r=oe(v(()=>a==null?void 0:a.size)),u=ae(v(()=>a==null?void 0:a.disabled)),l=S(!1),p=v(()=>u.value||d.value&&f.value!==s.label?-1:0);return{radioRef:n,isGroup:d,radioGroup:a,focus:l,size:r,disabled:u,tabIndex:p,modelValue:f}},ie=["value","name","disabled"],de=y({name:"ElRadio"}),ue=y({...de,props:re,emits:L,setup(s,{emit:m}){const n=s,a=G("radio"),{radioRef:d,radioGroup:f,focus:r,size:u,disabled:l,modelValue:p}=j(n,m);function i(){F(()=>m("change",p.value))}return(o,t)=>{var c;return B(),I("label",{class:b([e(a).b(),e(a).is("disabled",e(l)),e(a).is("focus",e(r)),e(a).is("bordered",o.border),e(a).is("checked",e(p)===o.label),e(a).m(e(u))])},[g("span",{class:b([e(a).e("input"),e(a).is("disabled",e(l)),e(a).is("checked",e(p)===o.label)])},[N(g("input",{ref_key:"radioRef",ref:d,"onUpdate:modelValue":t[0]||(t[0]=k=>P(p)?p.value=k:null),class:b(e(a).e("original")),value:o.label,name:o.name||((c=e(f))==null?void 0:c.name),disabled:e(l),type:"radio",onFocus:t[1]||(t[1]=k=>r.value=!0),onBlur:t[2]||(t[2]=k=>r.value=!1),onChange:i,onClick:t[3]||(t[3]=E(()=>{},["stop"]))},null,42,ie),[[h,e(p)]]),g("span",{class:b(e(a).e("inner"))},null,2)],2),g("span",{class:b(e(a).e("label")),onKeydown:t[4]||(t[4]=E(()=>{},["stop"]))},[V(o.$slots,"default",{},()=>[D(M(o.label),1)])],34)],2)}}});var pe=$(ue,[["__file","/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio.vue"]]);const me=R({...K,name:{type:String,default:""}}),fe=["value","name","disabled"],be=y({name:"ElRadioButton"}),ce=y({...be,props:me,setup(s){const m=s,n=G("radio"),{radioRef:a,focus:d,size:f,disabled:r,modelValue:u,radioGroup:l}=j(m),p=v(()=>({backgroundColor:(l==null?void 0:l.fill)||"",borderColor:(l==null?void 0:l.fill)||"",boxShadow:l!=null&&l.fill?`-1px 0 0 0 ${l.fill}`:"",color:(l==null?void 0:l.textColor)||""}));return(i,o)=>{var t;return B(),I("label",{class:b([e(n).b("button"),e(n).is("active",e(u)===i.label),e(n).is("disabled",e(r)),e(n).is("focus",e(d)),e(n).bm("button",e(f))])},[N(g("input",{ref_key:"radioRef",ref:a,"onUpdate:modelValue":o[0]||(o[0]=c=>P(u)?u.value=c:null),class:b(e(n).be("button","original-radio")),value:i.label,type:"radio",name:i.name||((t=e(l))==null?void 0:t.name),disabled:e(r),onFocus:o[1]||(o[1]=c=>d.value=!0),onBlur:o[2]||(o[2]=c=>d.value=!1),onClick:o[3]||(o[3]=E(()=>{},["stop"]))},null,42,fe),[[h,e(u)]]),g("span",{class:b(e(n).be("button","inner")),style:Q(e(u)===i.label?e(p):{}),onKeydown:o[4]||(o[4]=E(()=>{},["stop"]))},[V(i.$slots,"default",{},()=>[D(M(i.label),1)])],38)],2)}}});var H=$(ce,[["__file","/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio-button.vue"]]);const ve=R({id:{type:String,default:void 0},size:T,disabled:Boolean,modelValue:{type:[String,Number,Boolean],default:""},fill:{type:String,default:""},label:{type:String,default:void 0},textColor:{type:String,default:""},name:{type:String,default:void 0},validateEvent:{type:Boolean,default:!0}}),ge=L,ye=["id","aria-label","aria-labelledby"],Ee=y({name:"ElRadioGroup"}),Re=y({...Ee,props:ve,emits:ge,setup(s,{emit:m}){const n=s,a=G("radio"),d=le(),f=S(),{formItem:r}=se(),{inputId:u,isLabeledByFormItem:l}=ne(n,{formItemContext:r}),p=o=>{m(C,o),F(()=>m("change",o))};W(()=>{const o=f.value.querySelectorAll("[type=radio]"),t=o[0];!Array.from(o).some(c=>c.checked)&&t&&(t.tabIndex=0)});const i=v(()=>n.name||d.value);return x(U,J({...X(n),changeEvent:p,name:i})),Y(()=>n.modelValue,()=>{n.validateEvent&&(r==null||r.validate("change").catch(o=>ee()))}),(o,t)=>(B(),I("div",{id:e(u),ref_key:"radioGroupRef",ref:f,class:b(e(a).b("group")),role:"radiogroup","aria-label":e(l)?void 0:o.label||"radio-group","aria-labelledby":e(l)?e(r).labelId:void 0},[V(o.$slots,"default")],10,ye))}});var q=$(Re,[["__file","/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio-group.vue"]]);const Ve=te(pe,{RadioButton:H,RadioGroup:q}),Ge=A(q);A(H);export{Ve as E,Ge as a};
