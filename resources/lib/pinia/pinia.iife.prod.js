/*!
  * pinia v2.0.16
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */
var Pinia=function(t,e){"use strict";let n;const i=t=>n=t,s=Symbol();function o(t){return t&&"object"==typeof t&&"[object Object]"===Object.prototype.toString.call(t)&&"function"!=typeof t.toJSON}var r;t.MutationType=void 0,(r=t.MutationType||(t.MutationType={})).direct="direct",r.patchObject="patch object",r.patchFunction="patch function";const a="undefined"!=typeof window;const c=()=>{};function u(t,n,i,s=c){t.push(n);const o=()=>{const e=t.indexOf(n);e>-1&&(t.splice(e,1),s())};return!i&&e.getCurrentInstance()&&e.onUnmounted(o),o}function p(t,...e){t.slice().forEach((t=>{t(...e)}))}function f(t,n){for(const i in n){if(!n.hasOwnProperty(i))continue;const s=n[i],r=t[i];t[i]=o(r)&&o(s)&&t.hasOwnProperty(i)&&!e.isRef(s)&&!e.isReactive(s)?f(r,s):s}return t}const d=Symbol(),h=new WeakMap;const{assign:l}=Object;function y(n,s,r={},a,y,$){let v;const b=l({actions:{}},r),_={deep:!0};let g,m,j,O=e.markRaw([]),R=e.markRaw([]);const P=a.state.value[n];let w;function S(i){let s;g=m=!1,"function"==typeof i?(i(a.state.value[n]),s={type:t.MutationType.patchFunction,storeId:n,events:j}):(f(a.state.value[n],i),s={type:t.MutationType.patchObject,payload:i,storeId:n,events:j});const o=w=Symbol();e.nextTick().then((()=>{w===o&&(g=!0)})),m=!0,p(O,s,a.state.value[n])}$||P||(e.isVue2?e.set(a.state.value,n,{}):a.state.value[n]={}),e.ref({});const V=c;function k(t,e){return function(){i(a);const s=Array.from(arguments),o=[],r=[];function c(t){o.push(t)}function u(t){r.push(t)}let f;p(R,{args:s,name:t,store:M,after:c,onError:u});try{f=e.apply(this&&this.$id===n?this:M,s)}catch(t){throw p(r,t),t}return f instanceof Promise?f.then((t=>(p(o,t),t))).catch((t=>(p(r,t),Promise.reject(t)))):(p(o,f),f)}}const A={_p:a,$id:n,$onAction:u.bind(null,R),$patch:S,$reset:V,$subscribe(i,s={}){const o=u(O,i,s.detached,(()=>r())),r=v.run((()=>e.watch((()=>a.state.value[n]),(e=>{("sync"===s.flush?m:g)&&i({storeId:n,type:t.MutationType.direct,events:j},e)}),l({},_,s))));return o},$dispose:function(){v.stop(),O=[],R=[],a._s.delete(n)}};e.isVue2&&(A._r=!1);const M=e.reactive(l({},A));a._s.set(n,M);const T=a._e.run((()=>(v=e.effectScope(),v.run((()=>s())))));for(const t in T){const i=T[t];if(e.isRef(i)&&(!e.isRef(x=i)||!x.effect)||e.isReactive(i))$||(!P||(I=i,e.isVue2?h.has(I):o(I)&&I.hasOwnProperty(d))||(e.isRef(i)?i.value=P[t]:f(i,P[t])),e.isVue2?e.set(a.state.value[n],t,i):a.state.value[n][t]=i);else if("function"==typeof i){const n=k(t,i);e.isVue2?e.set(T,t,n):T[t]=n,b.actions[t]=i}}var I,x;return e.isVue2?Object.keys(T).forEach((t=>{e.set(M,t,T[t])})):(l(M,T),l(e.toRaw(M),T)),Object.defineProperty(M,"$state",{get:()=>a.state.value[n],set:t=>{S((e=>{l(e,t)}))}}),e.isVue2&&(M._r=!0),a._p.forEach((t=>{l(M,v.run((()=>t({store:M,app:a._a,pinia:a,options:b}))))})),P&&$&&r.hydrate&&r.hydrate(M.$state,P),g=!0,m=!0,M}let $="Store";function v(t,e){return Array.isArray(e)?e.reduce(((e,n)=>(e[n]=function(){return t(this.$pinia)[n]},e)),{}):Object.keys(e).reduce(((n,i)=>(n[i]=function(){const n=t(this.$pinia),s=e[i];return"function"==typeof s?s.call(this,n):n[s]},n)),{})}const b=v;return t.PiniaVuePlugin=function(t){t.mixin({beforeCreate(){const t=this.$options;if(t.pinia){const e=t.pinia;if(!this._provided){const t={};Object.defineProperty(this,"_provided",{get:()=>t,set:e=>Object.assign(t,e)})}this._provided[s]=e,this.$pinia||(this.$pinia=e),e._a=this,a&&i(e)}else!this.$pinia&&t.parent&&t.parent.$pinia&&(this.$pinia=t.parent.$pinia)},destroyed(){delete this._pStores}})},t.acceptHMRUpdate=function(t,e){return n=>{const i=e.data.pinia||t._pinia;if(i){e.data.pinia=i;for(const o in n){const r=n[o];if("function"==typeof(s=r)&&"string"==typeof s.$id&&i._s.has(r.$id)){const n=r.$id;if(n!==t.$id)return console.warn(`The id of the store changed from "${t.$id}" to "${n}". Reloading.`),e.invalidate();const s=i._s.get(n);if(!s)return void console.log("[Pinia]: skipping hmr because store doesn't exist yet");r(i,s)}}var s}}},t.createPinia=function(){const t=e.effectScope(!0),n=t.run((()=>e.ref({})));let o=[],r=[];const a=e.markRaw({install(t){i(a),e.isVue2||(a._a=t,t.provide(s,a),t.config.globalProperties.$pinia=a,r.forEach((t=>o.push(t))),r=[])},use(t){return this._a||e.isVue2?o.push(t):r.push(t),this},_p:o,_a:null,_e:t,_s:new Map,state:n});return a},t.defineStore=function(t,o,r){let a,c;const u="function"==typeof o;function p(t,r){const p=e.getCurrentInstance();(t=t||p&&e.inject(s))&&i(t),(t=n)._s.has(a)||(u?y(a,o,c,t):function(t,n,s,o){const{state:r,actions:a,getters:c}=n,u=s.state.value[t];let p;p=y(t,(function(){u||(e.isVue2?e.set(s.state.value,t,r?r():{}):s.state.value[t]=r?r():{});const n=e.toRefs(s.state.value[t]);return l(n,a,Object.keys(c||{}).reduce(((n,o)=>(n[o]=e.markRaw(e.computed((()=>{i(s);const n=s._s.get(t);if(!e.isVue2||n._r)return c[o].call(n,n)}))),n)),{}))}),n,s,0,!0),p.$reset=function(){const t=r?r():{};this.$patch((e=>{l(e,t)}))}}(a,c,t));return t._s.get(a)}return"string"==typeof t?(a=t,c=u?r:o):(c=t,a=t.id),p.$id=a,p},t.getActivePinia=()=>e.getCurrentInstance()&&e.inject(s)||n,t.mapActions=function(t,e){return Array.isArray(e)?e.reduce(((e,n)=>(e[n]=function(...e){return t(this.$pinia)[n](...e)},e)),{}):Object.keys(e).reduce(((n,i)=>(n[i]=function(...n){return t(this.$pinia)[e[i]](...n)},n)),{})},t.mapGetters=b,t.mapState=v,t.mapStores=function(...t){return t.reduce(((t,e)=>(t[e.$id+$]=function(){return e(this.$pinia)},t)),{})},t.mapWritableState=function(t,e){return Array.isArray(e)?e.reduce(((e,n)=>(e[n]={get(){return t(this.$pinia)[n]},set(e){return t(this.$pinia)[n]=e}},e)),{}):Object.keys(e).reduce(((n,i)=>(n[i]={get(){return t(this.$pinia)[e[i]]},set(n){return t(this.$pinia)[e[i]]=n}},n)),{})},t.setActivePinia=i,t.setMapStoreSuffix=function(t){$=t},t.skipHydrate=function(t){return e.isVue2?h.set(t,1)&&t:Object.defineProperty(t,d,{})},t.storeToRefs=function(t){if(e.isVue2)return e.toRefs(t);{t=e.toRaw(t);const n={};for(const i in t){const s=t[i];(e.isRef(s)||e.isReactive(s))&&(n[i]=e.toRef(t,i))}return n}},Object.defineProperty(t,"__esModule",{value:!0}),t}({},VueDemi);
