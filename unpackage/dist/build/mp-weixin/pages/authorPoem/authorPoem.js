(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/authorPoem/authorPoem"],{"019f":function(t,n,o){"use strict";o.r(n);var e=o("25a9"),a=o("0368");for(var i in a)"default"!==i&&function(t){o.d(n,t,(function(){return a[t]}))}(i);o("64f3");var r,u=o("f0c5"),l=Object(u["a"])(a["default"],e["b"],e["c"],!1,null,"47e8a0ec",null,!1,e["a"],r);n["default"]=l.exports},"0368":function(t,n,o){"use strict";o.r(n);var e=o("693c"),a=o.n(e);for(var i in e)"default"!==i&&function(t){o.d(n,t,(function(){return e[t]}))}(i);n["default"]=a.a},"25a9":function(t,n,o){"use strict";var e={"cl-tabs":function(){return Promise.all([o.e("common/vendor"),o.e("components/cl-tabs/cl-tabs")]).then(o.bind(null,"9ffe"))},"poem-list":function(){return o.e("components/poem-list/poem-list").then(o.bind(null,"cff9"))},"uni-load-more":function(){return o.e("components/uni-load-more/uni-load-more").then(o.bind(null,"404f"))},empty:function(){return o.e("components/empty/empty").then(o.bind(null,"3df6"))}},a=function(){var t=this,n=t.$createElement;t._self._c},i=[];o.d(n,"b",(function(){return a})),o.d(n,"c",(function(){return i})),o.d(n,"a",(function(){return e}))},"64f3":function(t,n,o){"use strict";var e=o("8229"),a=o.n(e);a.a},"693c":function(t,n,o){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=o("2df2"),a=o("b4a2"),i=function(){o.e("components/empty/empty").then(function(){return resolve(o("3df6"))}.bind(null,o)).catch(o.oe)},r=function(){Promise.all([o.e("common/vendor"),o.e("components/cl-tabs/cl-tabs")]).then(function(){return resolve(o("9ffe"))}.bind(null,o)).catch(o.oe)},u=function(){o.e("components/poem-list/poem-list").then(function(){return resolve(o("cff9"))}.bind(null,o)).catch(o.oe)},l={components:{Empty:i,ClTabs:r,PoemList:u},data:function(){return{author:"",authorInfo:{jieshaoArr:[]},tabs:["诗词","作者"],tabIndex:-1,mainColor:e.mainColor,loading:!1,rows:20,page:0,total:0,data:[],isAll:!1,bgc:""}},onLoad:function(n){this.tabIndex=0,this.author=decodeURIComponent(n.author),t.setNavigationBarTitle({title:this.author}),this.poemList();var o=getApp().globalData.bgc;this.bgc=o[Math.floor(o.length*Math.random())]},methods:{handleTabChange:function(t){this.tabIndex=t},handleClickPoem:function(n){t.navigateTo({url:"../article/article?id="+n._id})},handleScrollToLower:function(){this.poemList()},poemList:function(){var t=this;this.loading||this.isAll||(this.loading=!0,(0,a.getPoemsByAuthor)({page:this.page+1,rows:this.rows,author:this.author}).then((function(n){t.data=t.data.concat(n.data.data.map((function(t){return t.title=t.mingcheng,t.author=t.chaodai+"/"+t.zuozhe,t.summary=t.zhaiyao,t}))),t.page=t.page+1,t.total=n.data.total,t.authorInfo=n.data.authorInfo||{jieshaoArr:[]},t.authorInfo.jieshao&&(t.authorInfo.jieshaoArr=t.authorInfo.jieshao.split("\n")),0===t.total||t.data.length>=t.total?t.isAll=!0:t.isAll=!1})).finally((function(n){t.loading=!1})))}}};n.default=l}).call(this,o("543d")["default"])},"69bc":function(t,n,o){"use strict";(function(t){o("4739");e(o("66fd"));var n=e(o("019f"));function e(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,o("543d")["createPage"])},8229:function(t,n,o){}},[["69bc","common/runtime","common/vendor"]]]);