(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/author/author"],{"1ff2":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=e("4b69"),a=e("b4a2"),i={data:function(){return{filterText:"",loading:!1,data:[],bgc:""}},computed:{list:function(){for(var t=Date.now(),n=[],e=null,a=JSON.parse(JSON.stringify(this.data)),i=0,u=a.length;i<u;i++)if(!this.filterText||-1!==a[i].xingming.indexOf(this.filterText)){e=null;for(var r=0,f=n.length;r<f;r++)if(n[r].letter===a[i].xingpy){e=n[r];break}e?e.data.push(a[i].xingming):n.push({letter:a[i].xingpy,data:[a[i].xingming]})}return console.log(Date.now()-t),(0,o.sort)(n,(function(t,n){return t.letter<n.letter})),console.log(Date.now()-t),n}},onLoad:function(){this.getAuthorList();var t=getApp().globalData.bgc;this.bgc=t[Math.floor(t.length*Math.random())]},methods:{getAuthorList:function(){var t=this;this.loading=!0,(0,a.authorList)({page:1,rows:1e3}).then((function(n){t.data=n.data.data})).finally((function(n){t.loading=!1}))},handleClickAuthor:function(n){t.navigateTo({url:"../authorPoem/authorPoem?author="+encodeURIComponent(n.item.name)})}}};n.default=i}).call(this,e("543d")["default"])},"6f9e":function(t,n,e){},c8fd:function(t,n,e){"use strict";e.r(n);var o=e("fe66"),a=e("d72e");for(var i in a)"default"!==i&&function(t){e.d(n,t,(function(){return a[t]}))}(i);e("cd26");var u,r=e("f0c5"),f=Object(r["a"])(a["default"],o["b"],o["c"],!1,null,"0a175867",null,!1,o["a"],u);n["default"]=f.exports},cd26:function(t,n,e){"use strict";var o=e("6f9e"),a=e.n(o);a.a},d72e:function(t,n,e){"use strict";e.r(n);var o=e("1ff2"),a=e.n(o);for(var i in o)"default"!==i&&function(t){e.d(n,t,(function(){return o[t]}))}(i);n["default"]=a.a},ea8a:function(t,n,e){"use strict";(function(t){e("4739");o(e("66fd"));var n=o(e("c8fd"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},fe66:function(t,n,e){"use strict";var o={"uni-load-more":function(){return e.e("components/uni-load-more/uni-load-more").then(e.bind(null,"404f"))},"uni-indexed-list":function(){return e.e("components/uni-indexed-list/uni-indexed-list").then(e.bind(null,"df38"))}},a=function(){var t=this,n=t.$createElement;t._self._c},i=[];e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return o}))}},[["ea8a","common/runtime","common/vendor"]]]);