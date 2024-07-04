const __vite__fileDeps=["assets/EditTransaction-AO0SwGRU.js","assets/index-Ch2Nu3OB.js","assets/index-C2hKCJDb.css","assets/VContainer-7Idv0MoV.js","assets/VContainer-CndwlDRC.css","assets/VCard-D_zbdyal.js","assets/VCard-BGihEtQu.css","assets/VRow-C4K22NCo.js","assets/EditTransaction-eUjNdxnE.css"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{d as G,r as T,c as H,g as K,u as Q,a as W,b as S,w as X,e as x,o as g,f as Z,h as n,i as o,j as y,t as v,k as r,l as k,m as E,n as U,V as ee,p as ae,q as te,s as se,_ as le}from"./index-Ch2Nu3OB.js";import{d as m,u as ne,V as oe,a as $,b as re,c as ue,e as ie}from"./VContainer-7Idv0MoV.js";import{V as h,a as C}from"./VRow-C4K22NCo.js";const O=window.localStorage,de=G("user",()=>{const V=T(JSON.parse(O.getItem("User")||"{}")),i=T(JSON.parse(O.getItem("Funds")||'{"value": 0}'));return{user:V,funds:i,setFunds:d=>{i.value=d?parseFloat(d):null,i.updated_at=new Date().toISOString(),O.setItem("Funds",JSON.stringify(i))}}});var I={exports:{}};(function(V,i){(function(D,d){V.exports=d()})(H,function(){return function(D,d){d.prototype.isSameOrAfter=function(f,M){return this.isSame(f,M)||this.isAfter(f,M)}}})})(I);var ce=I.exports;const fe=K(ce),ve={class:"text-h4"},me={key:0,class:"text-body-1 mt-1"},pe={key:1,class:"text-caption"},ye={class:"text-h5 mb-2"},_e={key:0,class:"text-success"},be={key:1,class:"text-error"},xe={class:"text-center py-2"},ge=y("div",null,"Can't budget without any transactions!",-1),Me={__name:"BudgetView",setup(V){m.extend(fe);const i=de(),D=ne();Q();const{mobile:d}=W(),{commaNumber:f}=ie(),M=se(()=>le(()=>import("./EditTransaction-AO0SwGRU.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8]))),Y=S({});X(()=>i.funds,s=>Y.value=s,{immediate:!0});const w=x(()=>{var s;return(s=i.funds)!=null&&s.updated_at?m(i.funds.updated_at).format("MMMM DD, YYYY"):null}),j=()=>i.setFunds(Y.value.value),_=S(m().startOf("day")),B=S(60),A=x(()=>_.value.add(parseInt(B.value||0)+1,"days").startOf("day")),p=x(()=>{const s=[];D.transactionsList.forEach(a=>{let l=a.end_date?m(a.end_date):null;if(l&&l.isBefore(_.value))return;let u=m(a.start_date);if(!a.interval_value&&u.isBefore(_.value)||u.isSameOrAfter(A.value))return;if(a.interval_value){let N=Math.floor(u.diff(_.value,a.interval));if(N>0){let q=Math.floor(N/a.interval_value);u=u.add(q+a.interval_value,a.interval)}}const{id:F,name:R,value:z,sign:L}=a;for(;u.isBefore(A.value)&&u.isSameOrAfter(_.value)&&(!l||l&&u.isBefore(l))&&(s.push({id:`${F}-${u.format("YYYY-MM-DD")}`,tansaction_id:F,name:R,value:z,sign:L,day:u}),!!a.interval_value);)u=u.add(a.interval_value,a.interval)}),s.sort((a,l)=>a.day.isSame(l.day,"day")?0:a.day.isBefore(l.day)?-1:1);let t=parseFloat(i.funds.value)||0;const e=s.length;for(let a=0;a<e;a++){let l=s[a];t+=l.value*l.sign,l.balance=t,l.day=l.day.toDate(),l.index=a}return s}),J=x(()=>p.value.length),P=[{title:"Date",key:"day"},{title:"Name",key:"name",sortable:!1},{title:"Amount",key:"value",sortable:!1},{title:"Balance",key:"balance",sortable:!1}],c=x(()=>{let s=p.value[0];p.value.forEach(e=>{e.balance<s.balance&&(s=e)});let t=s?p.value[s.index+1]:null;if(t)for(let e=t.index;e<J.value;e++){let a=p.value[e];a.balance<t.balance&&(t=a)}return[s,t]}),b=S(!1);return(s,t)=>(g(),Z(oe,{fluid:""},{default:n(()=>[o(C,{class:"mt-2"},{default:n(()=>[o(h,null,{default:n(()=>{var e;return[y("div",ve,"Your Budget: "+v(r(f)((e=c.value[0])==null?void 0:e.balance)),1),c.value[0]?(g(),k("div",me,"until "+v(r(m)(c.value[0].day).format("ddd, MMMM DD, YYYY")),1)):E("",!0),c.value[0]&&c.value[1]&&c.value[0].day!=c.value[1].day?(g(),k("div",pe,"then "+v(r(f)(c.value[1].balance))+" until "+v(r(m)(c.value[1].day).format("ddd, MMMM DD, YYYY")),1)):E("",!0)]}),_:1}),o(h,{class:"d-flex align-center",cols:r(d)?12:3},{default:n(()=>[o($,{label:"Current Funds",modelValue:Y.value.value,"onUpdate:modelValue":t[0]||(t[0]=e=>Y.value.value=e),type:"number",min:1,"prepend-icon":"mdi-cash-multiple",onChange:j,density:"default",hint:`Updated ${w.value}`,"persistent-hint":!!w.value},null,8,["modelValue","hint","persistent-hint"])]),_:1},8,["cols"])]),_:1}),o(C,null,{default:n(()=>[o(h,null,{default:n(()=>[o(re,{items:p.value,headers:P,"sort-by":[{key:"day",order:"asc"}],sticky:"",density:"compact"},{top:n(()=>[o(C,{class:"mb-2"},{default:n(()=>[o(h,{class:"d-flex align-start"},{default:n(()=>[y("div",ye,[U("Upcoming Transactions"),o(ee,{class:"ml-2",icon:"mdi-plus",onClick:t[1]||(t[1]=e=>b.value=!0),size:"small",variant:"text"})])]),_:1}),o(h,{class:"d-flex align-start",cols:r(d)?12:3},{default:n(()=>[o($,{label:"Budget Days",modelValue:B.value,"onUpdate:modelValue":t[2]||(t[2]=e=>B.value=e),type:"number","prepend-icon":"mdi-calendar-month"},null,8,["modelValue"])]),_:1},8,["cols"])]),_:1})]),"item.day":n(({item:e})=>[U(v(r(m)(e.day).format("ddd, MMMM DD, YYYY")),1)]),"item.value":n(({item:e})=>[e.sign==1?(g(),k("div",_e,"+ "+v(r(f)(e.value)),1)):(g(),k("div",be,"- "+v(r(f)(e.value)),1))]),"item.balance":n(({item:e})=>[y("span",{class:ae(e.balance<0?"text-error":null)},v(r(f)(e.balance)),3)]),"no-data":n(()=>[y("div",xe,[ge,y("a",{href:"",onClick:t[3]||(t[3]=te(e=>b.value=!0,["prevent"]))},"Add one")])]),_:1},8,["items"])]),_:1})]),_:1}),o(ue,{modelValue:b.value,"onUpdate:modelValue":t[5]||(t[5]=e=>b.value=e),persistent:"",fullscreen:r(d),transition:r(d)?"dialog-bottom-transition":null},{default:n(()=>[o(r(M),{class:"mx-auto",item:{},onClose:t[4]||(t[4]=e=>b.value=!1)})]),_:1},8,["modelValue","fullscreen","transition"])]),_:1}))}};export{Me as default};