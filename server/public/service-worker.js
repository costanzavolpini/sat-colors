"use strict";var precacheConfig=[["/index.html","de8fe7be88d557c65d3434de8ebcd3ef"],["/static/css/main.26658379.css","ed07614a95c4d1a1de8348067157a11b"],["/static/js/main.6b543c34.js","1738b237d51fcc03523dfbeee794b9f6"],["/static/media/addNodeIcon.a1a2d01b.png","a1a2d01bcd034270a3bc92176edfb66c"],["/static/media/arrow-circle-left.db56b7e5.svg","db56b7e5f5e2e6f2aa33fb540c6bae38"],["/static/media/backIcon.dd0baa69.png","dd0baa69a69937600dc3bf035f3873c4"],["/static/media/connectIcon.d5267b8d.png","d5267b8db2498e44bd567bd12e07576b"],["/static/media/cross.260c9c65.png","260c9c6535065674bb5e59a73f894abb"],["/static/media/deleteIcon.02d321ed.png","02d321edc6e03aea1675001899d8f479"],["/static/media/edit.6010d7e7.svg","6010d7e73c7c1a33542910a7ef007bba"],["/static/media/editIcon.d5422321.png","d5422321c4f6feed4081891051f9a6b2"],["/static/media/pencil-alt.29f32609.svg","29f32609caa6f54eaa367355c1acd87b"],["/static/media/plus-circle.2b2138f3.svg","2b2138f3af2701eec3e6655191d37f4f"],["/static/media/trash-alt.31548173.svg","315481735ef349f78a2a58198561031b"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,n,a){var r=new URL(e);return a&&r.pathname.match(a)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,n){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return n.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],a=new URL(t,self.location),r=createCacheKey(a,hashParamName,n,/\.\w{8}\./);return[a.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(a){return setOfCachedUrls(a).then(function(n){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!n.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return a.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var n=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!n.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,n=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),a="index.html";(e=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,a),e=urlsToCacheKeys.has(n));var r="/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(n=new URL(r,self.location).toString(),e=urlsToCacheKeys.has(n)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});