(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/typePoem/typePoem"],{"0de9":function(t,e,n){},"6a1b":function(t,e,n){"use strict";(function(t){n("4739");o(n("66fd"));var e=o(n("b3f7"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"9d82":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n("b4a2"),i=function(){n.e("components/empty/empty").then(function(){return resolve(n("3df6"))}.bind(null,n)).catch(n.oe)},a=function(){n.e("components/poem-list/poem-list").then(function(){return resolve(n("cff9"))}.bind(null,n)).catch(n.oe)},l={components:{Empty:i,PoemList:a},data:function(){return{isType:!1,type:"",tag:"",loading:!1,rows:20,page:0,total:0,data:[],isAll:!1,bgc:"",src:""}},onLoad:function(e){this.tag=decodeURIComponent(e.tag),this.type=e.type,this.isType="fenlei"===this.type,this.src=getApp().globalData.imgPrefix+"/fenlei/0".concat(this.tag,".jpg"),t.setNavigationBarTitle({title:this.tag}),this.poemList();var n=getApp().globalData.bgc;this.bgc=n[Math.floor(n.length*Math.random())]},methods:{handleClickPoem:function(e){t.navigateTo({url:"../article/article?id="+e._id})},handleScrollToLower:function(){this.poemList()},poemList:function(){var t=this;this.loading||this.isAll||(this.loading=!0,(0,o.poemListByTag)({page:this.page+1,rows:this.rows,field:this.type,tag:"congshu"===this.type?this.tag.replace(/[《》]/g,""):this.tag}).then((function(e){t.data=t.data.concat(e.data.map((function(t){return t.title=t.mingcheng,t.author=t.chaodai+"/"+t.zuozhe,t.summary=t.zhaiyao,t}))),t.page=t.page+1,t.total=e.total,0===t.total||t.data.length>=t.total?t.isAll=!0:t.isAll=!1})).finally((function(e){t.loading=!1})))}}};e.default=l}).call(this,n("543d")["default"])},b3f7:function(t,e,n){"use strict";n.r(e);var o=n("f53e"),i=n("e071");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("ddf2");var l,c=n("f0c5"),u=Object(c["a"])(i["default"],o["b"],o["c"],!1,null,"120e49e1",null,!1,o["a"],l);e["default"]=u.exports},ddf2:function(t,e,n){"use strict";var o=n("0de9"),i=n.n(o);i.a},e071:function(t,e,n){"use strict";n.r(e);var o=n("9d82"),i=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);e["default"]=i.a},f53e:function(t,e,n){"use strict";var o={"poem-list":function(){return n.e("components/poem-list/poem-list").then(n.bind(null,"cff9"))},"uni-load-more":function(){return n.e("components/uni-load-more/uni-load-more").then(n.bind(null,"404f"))}},i=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return o}))}},[["6a1b","common/runtime","common/vendor"]]]);