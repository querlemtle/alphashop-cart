!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);n(1);const r=document.querySelectorAll('[data-icon="darkmode-icon"]'),o=document.querySelector(".button-container"),c=document.querySelector(".btn-previous"),i=document.querySelector(".btn-next"),a=document.querySelectorAll(".step"),s=document.querySelectorAll(".form-section"),u=document.querySelector('.form-section[data-section="radio"]'),l=document.querySelector(".card"),d=document.getElementById("sum"),m=document.documentElement;let f=0,p="",g=[{id:1,amount:1,unitPrice:3999,get calculatedPrice(){return this.unitPrice*this.amount}},{id:2,amount:1,unitPrice:1299,get calculatedPrice(){return this.unitPrice*this.amount}}],y=function(){let t=0;for(const e of g)t+=e.unitPrice*e.amount;return t+=function(t){if("免費"===t)return 0;if(t.length<=4){return+t.substring(1)}return+(t.slice(1,t.length-4)+t.slice(-3))}(p),t};function v(t){if(0===t)return"免費";if((t=t.toString()).length>3){return"$"+t.slice(0,t.length-3)+","+t.slice(-3)}return"$"+t}function h(){c.style.display=0===f?"none":"block",i.textContent=f===a.length-1?"確認下單":"下一步 →"}function b(t){t.preventDefault(),m.classList.toggle("dark"),localStorage[m.classList.contains("dark")?"setItem":"removeItem"]("theme","dark")}!function(){const t=localStorage.getItem("theme");m.classList["dark"===t?"add":"remove"]("dark")}(),h(),o.addEventListener("click",(function(t){const e=a[f];if(t.target===i&&"下一步 →"===t.target.textContent){const t=a[f+1];e.classList.remove("active"),e.classList.add("checked"),t.classList.remove("disabled"),t.classList.add("active"),s[f].classList.add("hide"),s[f+1].classList.remove("hide"),f++}else if(t.target===c){const t=a[f-1];e.classList.remove("active"),e.classList.add("disabled"),t.classList.remove("checked"),t.classList.add("active"),s[f].classList.add("hide"),s[f-1].classList.remove("hide"),f--}h()})),u.addEventListener("change",(function(t){document.querySelectorAll('input[type="radio"]').forEach(t=>{t.closest(".radio-option").classList.add("disabled")}),t.target.closest(".radio-option").classList.remove("disabled");const e=document.getElementById("shipping-price");p=t.target.closest(".radio-option").querySelector(".shipping-price").textContent,e.textContent=p,d.textContent=v(y())})),l.addEventListener("click",(function(t){const e=t.target.parentElement.querySelector(".amount"),n=t.target.closest(".item-detail-wrapper").querySelector(".price"),r=+t.target.parentElement.dataset.id;let o=g[g.findIndex(t=>t.id===r)];t.target.matches(".btn-plus")?(o.amount++,e.textContent=o.amount):t.target.matches(".btn-minus")&&(o.amount--,o.amount<=0?o.amount=1:o.amount,e.textContent=o.amount);n.textContent=v(o.calculatedPrice),d.textContent=v(y())})),r.forEach(t=>t.addEventListener("click",b))},function(t,e,n){}]);