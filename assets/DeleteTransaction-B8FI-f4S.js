import{u as f}from"./VContainer-7Idv0MoV.js";import{o as _,f as h,h as e,i as t,j as r,t as p,V as n,bD as x}from"./index-Ch2Nu3OB.js";import{V,b as C,a as b}from"./VCard-D_zbdyal.js";const y=r("div",{class:"text-h6 mb-4"},"Are you sure you want to delete?",-1),T={class:"text-h5 font-weight-bold"},D={__name:"DeleteTransaction",props:{item:{type:Object,default:()=>({})}},emits:["close"],setup(s,{emit:i}){const l=s,o=x(),{deleteTransaction:d}=f(),m=i,a=()=>m("close"),u=()=>{try{d(l.item),o.success("Transaction Deleted"),a()}catch(c){o.error(c)}};return(c,k)=>(_(),h(b,{width:"400"},{default:e(()=>[t(V,{class:"text-center"},{default:e(()=>[y,r("div",T,p(s.item.name),1)]),_:1}),t(C,null,{default:e(()=>[t(n,{text:"No",onClick:a}),t(n,{text:"Yes",onClick:u})]),_:1})]),_:1}))}};export{D as default};