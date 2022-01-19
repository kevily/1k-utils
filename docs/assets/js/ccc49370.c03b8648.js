"use strict";(self.webpackChunkdocusaurus_2=self.webpackChunkdocusaurus_2||[]).push([[103],{895:function(e,t,a){a.d(t,{dK:function(){return r},_k:function(){return i},vc:function(){return o},rx:function(){return s},qo:function(){return m},Hk:function(){return c},Iz:function(){return u}});var n=a(1336),l=a.n(n);a(892)(l()),a(1728).w(l()),a(4182)(l());var r=["en","zh"],i=!1,o=null,s="48cc5692",m=8,c=50,u={search_placeholder:"Search",see_all_results:"See all results",no_results:"No results.",search_results_for:'Search results for "{{ keyword }}"',search_the_documentation:"Search the documentation",count_documents_found_plural:"{{ count }} documents found",count_documents_found:"{{ count }} document found",no_documents_were_found:"No documents were found"}},8665:function(e,t,a){a.d(t,{Z:function(){return f}});var n=a(102),l=a(7294),r=a(6010),i=a(4814),o=a(9960),s="sidebar_2ahu",m="sidebarItemTitle_2hhb",c="sidebarItemList_2xAf",u="sidebarItem_2UVv",d="sidebarItemLink_1RT6",g="sidebarItemLinkActive_12pM",p=a(5999);function v(e){var t=e.sidebar;return 0===t.items.length?null:l.createElement("nav",{className:(0,r.Z)(s,"thin-scrollbar"),"aria-label":(0,p.I)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"})},l.createElement("div",{className:(0,r.Z)(m,"margin-bottom--md")},t.title),l.createElement("ul",{className:c},t.items.map((function(e){return l.createElement("li",{key:e.permalink,className:u},l.createElement(o.Z,{isNavLink:!0,to:e.permalink,className:d,activeClassName:g},e.title))}))))}var h=["sidebar","toc","children"];var f=function(e){var t=e.sidebar,a=e.toc,o=e.children,s=(0,n.Z)(e,h),m=t&&t.items.length>0;return l.createElement(i.Z,s,l.createElement("div",{className:"container margin-vert--lg"},l.createElement("div",{className:"row"},m&&l.createElement("aside",{className:"col col--3"},l.createElement(v,{sidebar:t})),l.createElement("main",{className:(0,r.Z)("col",{"col--7":m,"col--9 col--offset-1":!m}),itemScope:!0,itemType:"http://schema.org/Blog"},o),a&&l.createElement("div",{className:"col col--2"},a))))}},8561:function(e,t,a){a.d(t,{Z:function(){return b}});var n=a(7294),l=a(6010),r=a(3905),i=a(5999),o=a(9960),s=a(4996),m=a(2822),c=a(7707),u=a(6753),d="blogPostTitle_GeHD",g="blogPostData_291c",p="blogPostDetailsFull_3kfx",v=a(8727),h="image_1yU8";var f=function(e){var t=e.author,a=t.name,l=t.title,r=t.url,i=t.imageURL;return n.createElement("div",{className:"avatar margin-bottom--sm"},i&&n.createElement(o.Z,{className:"avatar__photo-link avatar__photo",href:r},n.createElement("img",{className:h,src:i,alt:a})),a&&n.createElement("div",{className:"avatar__intro",itemProp:"author",itemScope:!0,itemType:"https://schema.org/Person"},n.createElement("div",{className:"avatar__name"},n.createElement(o.Z,{href:r,itemProp:"url"},n.createElement("span",{itemProp:"name"},a))),l&&n.createElement("small",{className:"avatar__subtitle",itemProp:"description"},l)))},E="authorCol_1R69";function _(e){var t=e.authors,a=e.assets;return 0===t.length?n.createElement(n.Fragment,null):n.createElement("div",{className:"row margin-top--md margin-bottom--sm"},t.map((function(e,t){var r;return n.createElement("div",{className:(0,l.Z)("col col--6",E),key:t},n.createElement(f,{author:Object.assign({},e,{imageURL:null!=(r=a.authorsImageUrls[t])?r:e.imageURL})}))})))}var b=function(e){var t,a,h,f,E=(h=(0,m.c2)().selectMessage,function(e){var t=Math.ceil(e);return h(t,(0,i.I)({id:"theme.blog.post.readingTime.plurals",description:'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One min read|{readingTime} min read"},{readingTime:t}))}),b=(0,s.C)().withBaseUrl,N=e.children,k=e.frontMatter,Z=e.assets,P=e.metadata,C=e.truncated,L=e.isBlogPostPage,w=void 0!==L&&L,T=P.date,x=P.formattedDate,y=P.permalink,I=P.tags,H=P.readingTime,M=P.title,A=P.editUrl,U=P.authors,B=null!=(t=Z.image)?t:k.image,R=!w&&C,S=I.length>0;return n.createElement("article",{className:w?void 0:"margin-bottom--xl",itemProp:"blogPost",itemScope:!0,itemType:"http://schema.org/BlogPosting"},(f=w?"h1":"h2",n.createElement("header",null,n.createElement(f,{className:d,itemProp:"headline"},w?M:n.createElement(o.Z,{itemProp:"url",to:y},M)),n.createElement("div",{className:(0,l.Z)(g,"margin-vert--md")},n.createElement("time",{dateTime:T,itemProp:"datePublished"},x),void 0!==H&&n.createElement(n.Fragment,null," \xb7 ",E(H))),n.createElement(_,{authors:U,assets:Z}))),B&&n.createElement("meta",{itemProp:"image",content:b(B,{absolute:!0})}),n.createElement("div",{className:"markdown",itemProp:"articleBody"},n.createElement(r.Zo,{components:c.Z},N)),(S||C)&&n.createElement("footer",{className:(0,l.Z)("row docusaurus-mt-lg",(a={},a[p]=w,a))},S&&n.createElement("div",{className:(0,l.Z)("col",{"col--9":R})},n.createElement(v.Z,{tags:I})),w&&A&&n.createElement("div",{className:"col margin-top--sm"},n.createElement(u.Z,{editUrl:A})),R&&n.createElement("div",{className:(0,l.Z)("col text--right",{"col--3":S})},n.createElement(o.Z,{to:P.permalink,"aria-label":"Read more about "+M},n.createElement("b",null,n.createElement(i.Z,{id:"theme.blog.post.readMore",description:"The label used in blog post item excerpts to link to full blog posts"},"Read More"))))))}},9360:function(e,t,a){a.r(t),a.d(t,{default:function(){return d}});var n=a(7294),l=a(1217),r=a(8665),i=a(8561),o=a(5999),s=a(9960);var m=function(e){var t=e.nextItem,a=e.prevItem;return n.createElement("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,o.I)({id:"theme.blog.post.paginator.navAriaLabel",message:"Blog post page navigation",description:"The ARIA label for the blog posts pagination"})},n.createElement("div",{className:"pagination-nav__item"},a&&n.createElement(s.Z,{className:"pagination-nav__link",to:a.permalink},n.createElement("div",{className:"pagination-nav__sublabel"},n.createElement(o.Z,{id:"theme.blog.post.paginator.newerPost",description:"The blog post button label to navigate to the newer/previous post"},"Newer Post")),n.createElement("div",{className:"pagination-nav__label"},"\xab ",a.title))),n.createElement("div",{className:"pagination-nav__item pagination-nav__item--next"},t&&n.createElement(s.Z,{className:"pagination-nav__link",to:t.permalink},n.createElement("div",{className:"pagination-nav__sublabel"},n.createElement(o.Z,{id:"theme.blog.post.paginator.olderPost",description:"The blog post button label to navigate to the older/next post"},"Older Post")),n.createElement("div",{className:"pagination-nav__label"},t.title," \xbb"))))},c=a(2822),u=a(1575);var d=function(e){var t,a=e.content,o=e.sidebar,s=a.frontMatter,d=a.assets,g=a.metadata,p=g.title,v=g.description,h=g.nextItem,f=g.prevItem,E=g.date,_=g.tags,b=g.authors,N=s.hide_table_of_contents,k=s.keywords,Z=s.toc_min_heading_level,P=s.toc_max_heading_level,C=null!=(t=d.image)?t:s.image;return n.createElement(r.Z,{wrapperClassName:c.kM.wrapper.blogPages,pageClassName:c.kM.page.blogPostPage,sidebar:o,toc:!N&&a.toc&&a.toc.length>0?n.createElement(u.Z,{toc:a.toc,minHeadingLevel:Z,maxHeadingLevel:P}):void 0},n.createElement(l.Z,{title:p,description:v,keywords:k,image:C},n.createElement("meta",{property:"og:type",content:"article"}),n.createElement("meta",{property:"article:published_time",content:E}),b.some((function(e){return e.url}))&&n.createElement("meta",{property:"article:author",content:b.map((function(e){return e.url})).filter(Boolean).join(",")}),_.length>0&&n.createElement("meta",{property:"article:tag",content:_.map((function(e){return e.label})).join(",")})),n.createElement(i.Z,{frontMatter:s,assets:d,metadata:g,isBlogPostPage:!0},n.createElement(a,null)),(h||f)&&n.createElement(m,{nextItem:h,prevItem:f}))}},6753:function(e,t,a){a.d(t,{Z:function(){return d}});var n=a(7294),l=a(5999),r=a(3117),i=a(102),o=a(6010),s="iconEdit_2_ui",m=["className"],c=function(e){var t=e.className,a=(0,i.Z)(e,m);return n.createElement("svg",(0,r.Z)({fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,o.Z)(s,t),"aria-hidden":"true"},a),n.createElement("g",null,n.createElement("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})))},u=a(2822);function d(e){var t=e.editUrl;return n.createElement("a",{href:t,target:"_blank",rel:"noreferrer noopener",className:u.kM.common.editThisPage},n.createElement(c,null),n.createElement(l.Z,{id:"theme.common.editThisPage",description:"The link label to edit the current page"},"Edit this page"))}},1575:function(e,t,a){a.d(t,{Z:function(){return c}});var n=a(3117),l=a(102),r=a(7294),i=a(6010),o=a(5002),s="tableOfContents_35-E",m=["className"];var c=function(e){var t=e.className,a=(0,l.Z)(e,m);return r.createElement("div",{className:(0,i.Z)(s,"thin-scrollbar",t)},r.createElement(o.Z,(0,n.Z)({},a,{linkClassName:"table-of-contents__link toc-highlight",linkActiveClassName:"table-of-contents__link--active"})))}},5002:function(e,t,a){a.d(t,{Z:function(){return m}});var n=a(3117),l=a(102),r=a(7294),i=a(2822),o=["toc","className","linkClassName","linkActiveClassName","minHeadingLevel","maxHeadingLevel"];function s(e){var t=e.toc,a=e.className,n=e.linkClassName,l=e.isChild;return t.length?r.createElement("ul",{className:l?void 0:a},t.map((function(e){return r.createElement("li",{key:e.id},r.createElement("a",{href:"#"+e.id,className:null!=n?n:void 0,dangerouslySetInnerHTML:{__html:e.value}}),r.createElement(s,{isChild:!0,toc:e.children,className:a,linkClassName:n}))}))):null}function m(e){var t=e.toc,a=e.className,m=void 0===a?"table-of-contents table-of-contents__left-border":a,c=e.linkClassName,u=void 0===c?"table-of-contents__link":c,d=e.linkActiveClassName,g=void 0===d?void 0:d,p=e.minHeadingLevel,v=e.maxHeadingLevel,h=(0,l.Z)(e,o),f=(0,i.LU)(),E=null!=p?p:f.tableOfContents.minHeadingLevel,_=null!=v?v:f.tableOfContents.maxHeadingLevel,b=(0,i.DA)({toc:t,minHeadingLevel:E,maxHeadingLevel:_}),N=(0,r.useMemo)((function(){if(u&&g)return{linkClassName:u,linkActiveClassName:g,minHeadingLevel:E,maxHeadingLevel:_}}),[u,g,E,_]);return(0,i.Si)(N),r.createElement(s,(0,n.Z)({toc:b,className:m,linkClassName:u},h))}},8727:function(e,t,a){a.d(t,{Z:function(){return g}});var n=a(7294),l=a(6010),r=a(5999),i=a(9960),o="tag_1Okp",s="tagRegular_3MiF",m="tagWithCount_1HU1";var c=function(e){var t,a=e.permalink,r=e.name,c=e.count;return n.createElement(i.Z,{href:a,className:(0,l.Z)(o,(t={},t[s]=!c,t[m]=c,t))},r,c&&n.createElement("span",null,c))},u="tags_2ga9",d="tag_11ep";function g(e){var t=e.tags;return n.createElement(n.Fragment,null,n.createElement("b",null,n.createElement(r.Z,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list"},"Tags:")),n.createElement("ul",{className:(0,l.Z)(u,"padding--none","margin-left--sm")},t.map((function(e){var t=e.label,a=e.permalink;return n.createElement("li",{key:a,className:d},n.createElement(c,{name:t,permalink:a}))}))))}}}]);