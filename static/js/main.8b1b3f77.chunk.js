(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{12:function(e,t,n){},14:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n(1),i=n.n(a),r=n(5),s=n.n(r),o=(n(12),n(4)),l=n.n(o),d=n(6),u=n(2),j=(n(14),n(15),"1583369f");window.Clipboard=function(e,t,n){var c;function a(){var a,i;n.userAgent.match(/ipad|iphone/i)?((a=t.createRange()).selectNodeContents(c),(i=e.getSelection()).removeAllRanges(),i.addRange(a),c.setSelectionRange(0,999999)):c.select()}return{copy:function(e){!function(e){(c=t.createElement("textArea")).value=e,t.body.appendChild(c)}(e),a(),t.execCommand("copy"),t.body.removeChild(c)}}}(window,document,navigator);var b=function(e){var t=e.movie;return Object(c.jsx)("div",{className:"movie-info",children:Object(c.jsxs)("div",{className:"row",children:[Object(c.jsx)("div",{className:"col-lg-4",children:Object(c.jsx)("img",{className:"movie-poster",src:"N/A"===t.Poster?"not_available.png":t.Poster,alt:""})}),Object(c.jsxs)("div",{className:"col-lg-8",children:[Object(c.jsxs)("p",{children:[Object(c.jsx)("strong",{children:"Title:"})," ","".concat(t.Title)]}),Object(c.jsxs)("p",{children:[Object(c.jsx)("strong",{children:"Year:"})," ","".concat(t.Year)]}),Object(c.jsxs)("p",{children:[Object(c.jsx)("strong",{children:"imdb ID:"})," ","".concat(t.imdbID)]})]})]})})};var m=function(){var e=Object(a.useState)(""),t=Object(u.a)(e,2),n=t[0],i=t[1],r=Object(a.useState)([]),s=Object(u.a)(r,2),o=s[0],m=s[1],h=Object(a.useState)(""),f=Object(u.a)(h,2),p=f[0],v=f[1],O=Object(a.useState)(!1),x=Object(u.a)(O,2),g=x[0],w=x[1],N=Object(a.useState)(new Map),y=Object(u.a)(N,2),S=y[0],C=y[1],k=Object(a.useState)(!1),E=Object(u.a)(k,2),I=E[0],R=E[1],T=Object(a.useState)(null),P=Object(u.a)(T,2),A=P[0],D=P[1],F=function(e,t,n){var c=n||3e3;v(e),w(t),A&&clearTimeout(A),D(setTimeout((function(){v("")}),c))},M=function(e){return new Promise((function(t,n){fetch("https://www.omdbapi.com/?i=".concat(e,"&apikey=").concat(j)).then((function(e){return e.json()})).then((function(e){"True"===e.Response?t(e):n(e.Error)}),(function(e){n(e)}))}))},L=function(e){var t=[];e.forEach(function(){var e=Object(d.a)(l.a.mark((function e(n,c){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:c>=5?F("Error: Your share line contains more than ".concat(5," movies, only 5 will be loaded"),!0,5e3):t.push(M(n));case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}());var n=new Map;Promise.all(t).then((function(e){e.forEach((function(e){n.set(e.imdbID,e)})),C(n)})).catch((function(e){F("Error: Got error while loading shared movies. ".concat(e))}))};return Object(a.useEffect)((function(){if("/share"===window.location.pathname){var e=new URLSearchParams(window.location.search);0===e.get("ids").length&&F("Error: Share Link has no content",!0,5e3);var t=e.get("ids").split(",");L(t)}else if(localStorage.getItem("movie_ids")){var n=localStorage.getItem("movie_ids").split(",");L(n)}}),[]),Object(a.useEffect)((function(){I?localStorage.setItem("movie_ids",Array.from(S).map((function(e,t){return e[0]})).join(",")):R(!0)}),[S,I]),Object(a.useEffect)((function(){""===n?m([]):new Promise((function(e,t){fetch("https://www.omdbapi.com/?s=".concat(n,"&apikey=").concat(j)).then((function(e){return e.json()})).then((function(n){"True"===n.Response?e(n.Search):t(n.Error)}),(function(e){t(e)}))})).then((function(e){m(e)})).catch((function(e){F(e,!0),m([])}))}),[n]),Object(c.jsx)("div",{className:"App",children:Object(c.jsxs)("div",{className:"container pt-5",children:[Object(c.jsx)("h2",{id:"title",children:"The Shoppies"}),Object(c.jsx)("i",{className:"far fa-share-square",onClick:function(e){var t=Array.from(S).map((function(e,t){return e[0]}));if(0!==t.length){var n=new URLSearchParams;n.set("ids",t);var c="".concat(window.location.origin,"/share?").concat(n.toString());window.Clipboard.copy(c),F("Your share link is generated and saved to your clipboard: ".concat(c),!1,1e4)}else F("Nothing to Share",!0)}}),Object(c.jsx)("div",{className:"card",children:Object(c.jsxs)("div",{className:"card-body",children:[Object(c.jsx)("label",{htmlFor:"search-box",children:"Movie Title"}),Object(c.jsxs)("div",{className:"input-group",children:[Object(c.jsx)("div",{className:"input-group-prepend",children:Object(c.jsx)("button",{className:"btn btn-outline-secondary",children:Object(c.jsx)("i",{className:"fas fa-search"})})}),Object(c.jsx)("input",{id:"search-box",type:"text",value:n,className:"form-control",placeholder:"Search",onChange:function(e){return i(e.target.value)}})]})]})}),p?Object(c.jsx)("div",{className:"alert alert-".concat(g?"danger":"primary"," mt-3 sticky-top"),role:"alert",children:p}):null,Object(c.jsxs)("div",{className:"row mt-3",children:[Object(c.jsx)("div",{className:"col-md-6",children:Object(c.jsx)("div",{className:"card",children:Object(c.jsxs)("div",{id:"movie-list",className:"card-body",children:[Object(c.jsxs)("h3",{children:["Results For ",n?'"'.concat(n,'"'):"..."]}),Object(c.jsx)("ul",{className:"list-group",children:o.map((function(e,t){return Object(c.jsxs)("li",{className:"list-group-item d-flex justify-content-between align-items-center",children:[Object(c.jsx)(b,{movie:e}),Object(c.jsx)("button",{className:"btn btn-primary btn-sm",disabled:!!S.has(e.imdbID),onClick:function(){return function(e,t){if(S.has(t.imdbID))F("Error: Invalid Click on Nominate Button (Shouldnn't be able to click)",!0);else if(S.size>=5)F("You reach the max nomination limit: ".concat(5),!0);else{var n=new Map(S);n.set(t.imdbID,t),C(n)}}(0,e)},children:"Nominate"})]},t)}))})]})})}),Object(c.jsx)("div",{className:"col-md-6",children:Object(c.jsx)("div",{className:"card",children:Object(c.jsxs)("div",{className:"card-body",children:[Object(c.jsx)("h3",{children:"Nominations"}),Object(c.jsx)("ul",{className:"list-group",children:Array.from(S).map((function(e,t){var n=e[1];return Object(c.jsxs)("li",{className:"list-group-item d-flex justify-content-between align-items-center",children:[Object(c.jsx)(b,{movie:n}),Object(c.jsx)("button",{className:"btn btn-danger btn-sm",disabled:!1,onClick:function(){return function(e){var t=new Map(S);t.delete(e.imdbID),C(t)}(n)},children:"Remove"})]},t)}))})]})})})]})]})})},h=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,17)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,i=t.getLCP,r=t.getTTFB;n(e),c(e),a(e),i(e),r(e)}))};s.a.render(Object(c.jsx)(i.a.StrictMode,{children:Object(c.jsx)(m,{})}),document.getElementById("root")),h()}},[[16,1,2]]]);
//# sourceMappingURL=main.8b1b3f77.chunk.js.map