if(!self.define){let s,e={};const i=(i,n)=>(i=new URL(i+".js",n).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(n,r)=>{const l=s||("document"in self?document.currentScript.src:"")||location.href;if(e[l])return;let t={};const o=s=>i(s,l),u={module:{uri:l},exports:t,require:o};e[l]=Promise.all(n.map((s=>u[s]||o(s)))).then((s=>(r(...s),t)))}}define(["./workbox-a0adc145"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/BudgetView-CGuvHL0t.js",revision:null},{url:"assets/DeleteTransaction-Hv2XifM-.js",revision:null},{url:"assets/EditTransaction-CtpoSG7X.js",revision:null},{url:"assets/EditTransaction-eUjNdxnE.css",revision:null},{url:"assets/index-C2hKCJDb.css",revision:null},{url:"assets/index-CY3EEASg.js",revision:null},{url:"assets/TransactionsView-wfKkSK_j.js",revision:null},{url:"assets/VCard-BGihEtQu.css",revision:null},{url:"assets/VCard-EjQfq-B7.js",revision:null},{url:"assets/VRow-CndwlDRC.css",revision:null},{url:"assets/VRow-CZnsWxRU.js",revision:null},{url:"index.html",revision:"fa1d797b18606e90c00d633b38492ac4"},{url:"registerSW.js",revision:"3f6160088490f657da892e4f3c18cf28"},{url:"manifest.webmanifest",revision:"82f0c35997dd092b53a422073e1560c6"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
