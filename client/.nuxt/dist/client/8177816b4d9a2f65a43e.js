(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{425:function(t,e,o){var content=o(478);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(32).default)("9de36682",content,!0,{sourceMap:!1})},427:function(t,e,o){var content=o(483);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(32).default)("ea56b130",content,!0,{sourceMap:!1})},428:function(t,e,o){var content=o(485);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(32).default)("13c19c5c",content,!0,{sourceMap:!1})},477:function(t,e,o){"use strict";var c=o(425);o.n(c).a},478:function(t,e,o){(t.exports=o(31)(!1)).push([t.i,".fas[data-v-1aa8ad85]{font-size:18px!important;padding-left:7px!important}",""])},482:function(t,e,o){"use strict";var c=o(427);o.n(c).a},483:function(t,e,o){(t.exports=o(31)(!1)).push([t.i,".fas[data-v-2b55b1d5]{font-size:18px!important;padding-left:7px!important}.row[data-v-2b55b1d5]{margin-left:0;margin-right:0}",""])},484:function(t,e,o){"use strict";var c=o(428);o.n(c).a},485:function(t,e,o){(t.exports=o(31)(!1)).push([t.i,".camera[data-v-16b3a7d2]{float:right;font-size:30px;color:#1f568c;cursor:pointer;margin-top:-3px}",""])},509:function(t,e,o){"use strict";o.r(e);var c={name:"Post",props:{video:{type:Object,default:null}},computed:{tags:function(){return"# "+this.video.tags.join(" #")}}},r=(o(477),o(10)),l=Object(r.a)(c,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-card",{staticClass:"mb-2"},[o("div",{staticClass:"GalleryVideoWrapper"},[o("iframe",{attrs:{src:"https://www.youtube.com/embed/"+t.video.youtubeId,width:"100%",height:"200px",seamless:"",frameborder:"0",allow:"autoplay; encrypted-media",allowfullscreen:""}})]),t._v(" "),o("v-card-title",[o("div",{staticStyle:{width:"100%"}},[o("div",{staticStyle:{width:"65%"}},[o("v-icon",{staticStyle:{"font-size":"30px"},attrs:{color:"#1f568c"}},[t._v("account_circle")]),t._v(" "),o("span",{staticClass:"pl-1",staticStyle:{color:"#2e6193","vertical-align":"super"}},[t._v("User name")]),t._v(" "),o("p",{staticClass:"ml-5",staticStyle:{color:"grey","font-size":"8px"}},[t._v("2 days ago")])],1),t._v(" "),o("div",{staticStyle:{width:"30%",float:"right"}},[o("span",{staticStyle:{color:"grey"}},[t._v("45")]),t._v(" "),o("i",{staticClass:"fas fa-heart",staticStyle:{color:"grey"}})])]),t._v(" "),o("div",{},[o("span",{staticStyle:{color:"#2e6193"}},[t._v("text")])])]),t._v(" "),o("v-card-actions",[o("v-btn",{attrs:{flat:"",color:"#1f568c"}},[t._v("Share "),o("i",{staticClass:"fas fa-share"})]),t._v(" "),o("v-btn",{attrs:{flat:"",color:"#1f568c"}},[t._v("Like "),o("i",{staticClass:"fas fa-heart"})]),t._v(" "),o("v-btn",{attrs:{flat:"",color:"#1f568c"}},[t._v("Watchlist "),o("i",{staticClass:"fas fa-bell"})])],1)],1)},[],!1,null,"1aa8ad85",null).exports,n=o(445),v=o(406),d={name:"Post",data:function(){return{dialog:!1,url:"dvssdv",openEditor:!1,basePage:!0}},props:{photo:{type:Object,default:null}},components:{TextEditor:n.a},created:function(){this.getlikes()},computed:{},methods:{postlike:function(){},getlikes:function(){var t={headers:{"Content-Type":"application/json",token:localStorage.accessToken}};v.a.getData("discover/getLikeCounts",t).then(function(t){console.log("resp get likes",t)}).catch(function(t){console.log("error",t.response)})},postwatchlist:function(){var t={headers:{token:localStorage.accessToken}};v.a.postData_onlogin("discover/watchlist",{publishId:this.photo._id},t).then(function(t){"success"==t.data.message&&alert("successfully added to watchlists")}).catch(function(t){console.log("error",t.response.data.message)})},shareOnprofile:function(){this.basePage=!1,this.openEditor=!0}}},f=(o(482),Object(r.a)(d,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[t.basePage?o("v-card",{staticClass:"mb-2 pa-2"},[o("v-img",{attrs:{src:t.photo.file[0].path,height:"200px"}}),t._v(" "),o("v-card-title",[o("div",{staticStyle:{width:"100%"}},[o("div",{staticStyle:{width:"65%"}},[o("v-icon",{staticStyle:{"font-size":"30px"},attrs:{color:"#1f568c"}},[t._v("account_circle")]),t._v(" "),o("span",{staticClass:"pl-1",staticStyle:{color:"#2e6193","vertical-align":"super"}},[t._v("User name")]),t._v(" "),o("p",{staticClass:"ml-5",staticStyle:{color:"grey","font-size":"8px"}},[t._v("2 days ago")])],1),t._v(" "),o("div",{staticStyle:{width:"30%",float:"right"}},[o("span",{staticStyle:{color:"grey"}},[t._v("45")]),t._v(" "),o("i",{staticClass:"fas fa-heart",staticStyle:{color:"grey"}})])]),t._v(" "),o("div",{},[o("span",{staticStyle:{color:"#2e6193"}},[t._v("text")])])]),t._v(" "),o("v-card-actions",[o("v-layout",{attrs:{row:"","justify-center":""}},[o("v-dialog",{attrs:{persistent:"","max-width":"290"},scopedSlots:t._u([{key:"activator",fn:function(e){var c=e.on;return[o("v-btn",t._g({attrs:{flat:"",color:"#1f568c",dark:""}},c),[t._v("Share "),o("i",{staticClass:"fas fa-share"})])]}}],null,!1,2702448041),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[t._v(" "),o("v-card",[o("v-card-title",{staticClass:"headline"},[o("i",{staticClass:"fas fa-times",staticStyle:{color:"#275a8e"},on:{click:function(e){t.dialog=!1}}}),t._v(" "),o("span",{staticStyle:{color:"#8297b4"}},[t._v("Share")]),t._v(" "),o("hr",{staticStyle:{background:"#90acc7",height:"1px","margin-top":"-12px"}})]),t._v(" "),o("div",{staticClass:"row",on:{click:function(e){return t.shareOnprofile()}}},[o("div",{staticClass:"col-md-4 col-sm-4 col-xs-4"},[o("i",{staticClass:"fas fa-user-circle",staticStyle:{color:"#1f568c"}})]),t._v(" "),o("div",{staticClass:"col-md-8 col-sm-8 col-xs-8",staticStyle:{color:"#5078a2"}},[t._v("On my profile")])]),t._v(" "),o("div",{staticClass:"row ml-4"},[o("email",{attrs:{url:t.photo.file[0].path,subject:"Hello",scale:"2"}}),t._v(" "),o("div",{staticClass:"col-md-8 col-sm-8 col-xs-8 ml-1",staticStyle:{color:"#5078a2","text-align":"center"}},[t._v("Mail")])],1),t._v(" "),o("div",{staticClass:"row ml-4"},[o("whats-app",{attrs:{url:t.photo.file[0].path,title:t.Hello,scale:"2"}}),t._v(" "),o("div",{staticClass:"col-md-8 col-sm-8 col-xs-8 ml-1",staticStyle:{color:"#5078a2","text-align":"center"}},[t._v("Whatsapp")])],1),t._v(" "),o("div",{staticClass:"row"},[o("div",{staticClass:"col-md-4 col-sm-4 col-xs-4"},[o("i",{staticClass:"fas fa-comment",staticStyle:{color:"#1f568c"}})]),t._v(" "),o("div",{staticClass:"col-md-8 col-sm-8 col-xs-8",staticStyle:{color:"#5078a2"}},[t._v("Messages")])])],1)],1)],1),t._v(" "),o("v-btn",{attrs:{flat:"",color:"#1f568c"},on:{click:function(e){return t.postlike()}}},[t._v("Like "),o("i",{staticClass:"fas fa-heart"})]),t._v(" "),o("v-btn",{attrs:{flat:"",color:"#1f568c"},on:{click:function(e){return t.postwatchlist()}}},[t._v("Watchlist "),o("i",{staticClass:"fas fa-bell"})])],1)],1):t._e(),t._v(" "),t.openEditor?o("div",[o("text-editor",{attrs:{srcImage:t.photo}})],1):t._e()],1)},[],!1,null,"2b55b1d5",null).exports),_={name:"Post",props:{article:{type:Object,default:null}},computed:{articlePreview:function(){return this.article.content.slice(0,200)+"..."}}},h=Object(r.a)(_,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-card",{staticClass:"mb-2 pa-2"},[o("nuxt-link",{attrs:{to:"/single/article/"+t.article.id}},[o("v-img",{attrs:{src:t.article.featuredImgSrc,height:"200px"}}),t._v(" "),o("v-card-text",{staticClass:"pb-2 px-1",attrs:{"primary-title":""}},[o("v-layout",{attrs:{row:"","align-center":""}},[o("v-flex",{staticClass:"meca--post-icon-container",attrs:{"mr-2":""}},[o("v-icon",{attrs:{color:"red"}},[t._v("mdi-text")])],1),t._v(" "),o("v-flex",[o("h4",{staticClass:"meca--txt-justify"},[t._v(t._s(t.article.title))])])],1),t._v(" "),o("article",[o("p",{staticClass:"grey--text ma-0 mt-2  meca--txt-justify"},[t._v(t._s(t.articlePreview))])])],1)],1),t._v(" "),o("v-card-actions",{staticClass:"pa-0"},[o("v-spacer"),t._v(" "),o("v-btn",{attrs:{flat:"",color:"red"}},[t._v("\n      Aimer")]),t._v(" "),o("v-btn",{attrs:{flat:"",color:"red"}},[t._v("\n      Partager")])],1)],1)},[],!1,null,null,null).exports,m={name:"AutopediaPost",props:{autopediaPage:{type:Object,default:null}}},y={layout:"main",data:function(){return{photos:[]}},components:{VideoPost:l,PhotoPost:f,ArticlePost:h,AutopediaPage:Object(r.a)(m,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-card",{staticClass:"mb-2 pa-2"},[o("nuxt-link",{attrs:{to:"/autopedia/car/"+t.autopediaPage.id}},[o("v-img",{attrs:{src:t.autopediaPage.heroImage,title:t.autopediaPage.make+" - "+t.autopediaPage.model,height:"200px"}}),t._v(" "),o("v-card-text",{staticClass:"pb-2 pt-3 px-1",attrs:{"primary-title":""}},[o("v-layout",{attrs:{row:"","align-center":""}},[o("v-flex",{staticClass:"meca--post-icon-container mr-2"},[o("v-icon",{attrs:{color:"brown"}},[t._v("mdi-book-open-page-variant")])],1),t._v(" "),o("v-flex",[o("h4",[t._v(t._s(t.autopediaPage.make)+" - "+t._s(t.autopediaPage.model))]),t._v(" "),t.autopediaPage.year_stop?o("span",{staticClass:"grey--text ma-0 mt-2"},[t._v("\n            "+t._s(t.autopediaPage.year_start)+" - "+t._s(t.autopediaPage.year_stop)+"\n          ")]):o("span",{staticClass:"grey--text ma-0 mt-2"},[t._v("\n            "+t._s(t.autopediaPage.year_start)+"\n          ")])])],1)],1)],1),t._v(" "),o("v-card-actions",{staticClass:"pa-0"},[o("v-spacer"),t._v(" "),o("v-btn",{attrs:{flat:"",color:"brown"}},[t._v("\n      Aimer")]),t._v(" "),o("v-btn",{attrs:{flat:"",color:"brown"}},[t._v("\n      Partager")])],1)],1)},[],!1,null,null,null).exports},created:function(){this.$store.commit("updateFooterTab","feed")},computed:{videos:function(){return this.$store.state.home.videos},articles:function(){return this.$store.state.home.articles},autopediaPages:function(){return this.$store.state.home.autopediaPages}},mounted:function(){this.fetchphotos()},methods:{fetchphotos:function(){var t=this,e={headers:{token:localStorage.accessToken}};v.a.getData("discover/feeds",e).then(function(e){console.log("resp",e),t.$store.state.home.photos=e.data,t.photos=t.$store.state.home.photos}).catch(function(t){console.log("error",t.response.data.message)})},clickFortext:function(){this.$router.push("/feeds_action")}}},x=(o(484),Object(r.a)(y,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("v-container",{staticStyle:{background:"white"},attrs:{fluid:""}},[o("div",{staticClass:"header_post_feeds"},[o("span",{staticStyle:{color:"#7b9cbc!important","font-size":"15px",cursor:"pointer"},on:{click:function(e){return t.clickFortext()}}},[t._v("Say something")]),t._v(" "),o("v-icon",{staticClass:"camera"},[t._v("camera_alt")])],1)]),t._v(" "),o("v-container",{staticClass:"px-2  pb-0",attrs:{fluid:""}},[t._l(t.videos,function(video){return o("video-post",{key:"feed-vid-"+video.id,attrs:{video:video}})}),t._v(" "),t._l(t.photos,function(t){return o("photo-post",{key:"feed-img-"+t.file[0].id,attrs:{photo:t}})}),t._v(" "),t._l(t.articles,function(article){return o("article-post",{key:"feed-art-"+article.id,attrs:{article:article}})}),t._v(" "),t._l(t.autopediaPages,function(t){return o("autopedia-page",{key:"feed-auto-"+t.id,attrs:{"autopedia-page":t}})})],2)],1)},[],!1,null,"16b3a7d2",null));e.default=x.exports}}]);