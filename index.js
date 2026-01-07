/* empty css                      */import{b as f}from"./assets/vendor-CAXQE2hQ.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&d(a)}).observe(document,{childList:!0,subtree:!0});function l(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function d(e){if(e.ep)return;e.ep=!0;const t=l(e);fetch(e.href,t)}})();const r=document.querySelector("[data-menu]"),u=document.querySelector(".burger-btn"),m=document.querySelector(".close-btn");r&&u&&m&&(u.addEventListener("click",()=>{r.classList.add("is-open"),document.body.style.overflow="hidden"}),m.addEventListener("click",()=>{r.classList.remove("is-open"),document.body.style.overflow=""}),r.addEventListener("click",o=>{o.target.tagName==="A"&&(r.classList.remove("is-open"),document.body.style.overflow="")}));const p=window.matchMedia("(min-width: 768px)");p.addEventListener("change",o=>{o.matches&&(r.classList.remove("is-open"),document.body.style.overflow="")});const n=document.getElementById("open-question"),i=document.querySelector(".question-form");n&&i&&(n.addEventListener("click",()=>{i.classList.add("question-form--visible"),n.style.display="none"}),i.addEventListener("submit",o=>{o.preventDefault(),i.classList.remove("question-form--visible"),n.style.display=""}));const c=document.querySelector(".coordinates-link[data-large]");c&&c.addEventListener("click",o=>{console.log("clicked",o.target),o.preventDefault();const s=c.dataset.large,l=c.alt;f.create(`
      <img
        src="${s}"
        alt="${l}"
        style="
          max-width: 100vw;
          max-height: 100vh;
          object-fit: contain;
        "
        />
      `).show()});
//# sourceMappingURL=index.js.map
