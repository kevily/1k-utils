"use strict";(self.webpackChunkdocusaurus_2=self.webpackChunkdocusaurus_2||[]).push([[89],{895:function(e,t,a){a.d(t,{dK:function(){return l},_k:function(){return i},vc:function(){return s},rx:function(){return o},qo:function(){return m},Hk:function(){return c},Iz:function(){return u}});var r=a(1336),n=a.n(r);a(892)(n()),a(1728).w(n()),a(4182)(n());var l=["en","zh"],i=!1,s=null,o="48cc5692",m=8,c=50,u={search_placeholder:"Search",see_all_results:"See all results",no_results:"No results.",search_results_for:'Search results for "{{ keyword }}"',search_the_documentation:"Search the documentation",count_documents_found_plural:"{{ count }} documents found",count_documents_found:"{{ count }} document found",no_documents_were_found:"No documents were found"}},8665:function(e,t,a){a.d(t,{Z:function(){return E}});var r=a(102),n=a(7294),l=a(6010),i=a(4814),s=a(9960),o="sidebar_2ahu",m="sidebarItemTitle_2hhb",c="sidebarItemList_2xAf",u="sidebarItem_2UVv",d="sidebarItemLink_1RT6",g="sidebarItemLinkActive_12pM",p=a(5999);function h(e){var t=e.sidebar;return 0===t.items.length?null:n.createElement("nav",{className:(0,l.Z)(o,"thin-scrollbar"),"aria-label":(0,p.I)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"})},n.createElement("div",{className:(0,l.Z)(m,"margin-bottom--md")},t.title),n.createElement("ul",{className:c},t.items.map((function(e){return n.createElement("li",{key:e.permalink,className:u},n.createElement(s.Z,{isNavLink:!0,to:e.permalink,className:d,activeClassName:g},e.title))}))))}var v=["sidebar","toc","children"];var E=function(e){var t=e.sidebar,a=e.toc,s=e.children,o=(0,r.Z)(e,v),m=t&&t.items.length>0;return n.createElement(i.Z,o,n.createElement("div",{className:"container margin-vert--lg"},n.createElement("div",{className:"row"},m&&n.createElement("aside",{className:"col col--3"},n.createElement(h,{sidebar:t})),n.createElement("main",{className:(0,l.Z)("col",{"col--7":m,"col--9 col--offset-1":!m}),itemScope:!0,itemType:"http://schema.org/Blog"},s),a&&n.createElement("div",{className:"col col--2"},a))))}},2754:function(e,t,a){a.r(t),a.d(t,{default:function(){return u}});var r=a(7294),n=a(2263),l=a(8665),i=a(8561),s=a(9960),o=a(5999);var m=function(e){var t=e.metadata,a=t.previousPage,n=t.nextPage;return r.createElement("nav",{className:"pagination-nav","aria-label":(0,o.I)({id:"theme.blog.paginator.navAriaLabel",message:"Blog list page navigation",description:"The ARIA label for the blog pagination"})},r.createElement("div",{className:"pagination-nav__item"},a&&r.createElement(s.Z,{className:"pagination-nav__link",to:a},r.createElement("div",{className:"pagination-nav__label"},"\xab"," ",r.createElement(o.Z,{id:"theme.blog.paginator.newerEntries",description:"The label used to navigate to the newer blog posts page (previous page)"},"Newer Entries")))),r.createElement("div",{className:"pagination-nav__item pagination-nav__item--next"},n&&r.createElement(s.Z,{className:"pagination-nav__link",to:n},r.createElement("div",{className:"pagination-nav__label"},r.createElement(o.Z,{id:"theme.blog.paginator.olderEntries",description:"The label used to navigate to the older blog posts page (next page)"},"Older Entries")," ","\xbb"))))},c=a(2822);var u=function(e){var t=e.metadata,a=e.items,s=e.sidebar,o=(0,n.Z)().siteConfig.title,u=t.blogDescription,d=t.blogTitle,g="/"===t.permalink?o:d;return r.createElement(l.Z,{title:g,description:u,wrapperClassName:c.kM.wrapper.blogPages,pageClassName:c.kM.page.blogListPage,searchMetadatas:{tag:"blog_posts_list"},sidebar:s},a.map((function(e){var t=e.content;return r.createElement(i.Z,{key:t.metadata.permalink,frontMatter:t.frontMatter,assets:t.assets,metadata:t.metadata,truncated:t.metadata.truncated},r.createElement(t,null))})),r.createElement(m,{metadata:t}))}},8561:function(e,t,a){a.d(t,{Z:function(){return _}});var r=a(7294),n=a(6010),l=a(3905),i=a(5999),s=a(9960),o=a(4996),m=a(2822),c=a(7707),u=a(6753),d="blogPostTitle_GeHD",g="blogPostData_291c",p="blogPostDetailsFull_3kfx",h=a(8727),v="image_1yU8";var E=function(e){var t=e.author,a=t.name,n=t.title,l=t.url,i=t.imageURL;return r.createElement("div",{className:"avatar margin-bottom--sm"},i&&r.createElement(s.Z,{className:"avatar__photo-link avatar__photo",href:l},r.createElement("img",{className:v,src:i,alt:a})),a&&r.createElement("div",{className:"avatar__intro",itemProp:"author",itemScope:!0,itemType:"https://schema.org/Person"},r.createElement("div",{className:"avatar__name"},r.createElement(s.Z,{href:l,itemProp:"url"},r.createElement("span",{itemProp:"name"},a))),n&&r.createElement("small",{className:"avatar__subtitle",itemProp:"description"},n)))},b="authorCol_1R69";function f(e){var t=e.authors,a=e.assets;return 0===t.length?r.createElement(r.Fragment,null):r.createElement("div",{className:"row margin-top--md margin-bottom--sm"},t.map((function(e,t){var l;return r.createElement("div",{className:(0,n.Z)("col col--6",b),key:t},r.createElement(E,{author:Object.assign({},e,{imageURL:null!=(l=a.authorsImageUrls[t])?l:e.imageURL})}))})))}var _=function(e){var t,a,v,E,b=(v=(0,m.c2)().selectMessage,function(e){var t=Math.ceil(e);return v(t,(0,i.I)({id:"theme.blog.post.readingTime.plurals",description:'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One min read|{readingTime} min read"},{readingTime:t}))}),_=(0,o.C)().withBaseUrl,N=e.children,Z=e.frontMatter,k=e.assets,P=e.metadata,T=e.truncated,w=e.isBlogPostPage,M=void 0!==w&&w,y=P.date,I=P.formattedDate,L=P.permalink,U=P.tags,x=P.readingTime,C=P.title,R=P.editUrl,A=P.authors,B=null!=(t=k.image)?t:Z.image,S=!M&&T,z=U.length>0;return r.createElement("article",{className:M?void 0:"margin-bottom--xl",itemProp:"blogPost",itemScope:!0,itemType:"http://schema.org/BlogPosting"},(E=M?"h1":"h2",r.createElement("header",null,r.createElement(E,{className:d,itemProp:"headline"},M?C:r.createElement(s.Z,{itemProp:"url",to:L},C)),r.createElement("div",{className:(0,n.Z)(g,"margin-vert--md")},r.createElement("time",{dateTime:y,itemProp:"datePublished"},I),void 0!==x&&r.createElement(r.Fragment,null," \xb7 ",b(x))),r.createElement(f,{authors:A,assets:k}))),B&&r.createElement("meta",{itemProp:"image",content:_(B,{absolute:!0})}),r.createElement("div",{className:"markdown",itemProp:"articleBody"},r.createElement(l.Zo,{components:c.Z},N)),(z||T)&&r.createElement("footer",{className:(0,n.Z)("row docusaurus-mt-lg",(a={},a[p]=M,a))},z&&r.createElement("div",{className:(0,n.Z)("col",{"col--9":S})},r.createElement(h.Z,{tags:U})),M&&R&&r.createElement("div",{className:"col margin-top--sm"},r.createElement(u.Z,{editUrl:R})),S&&r.createElement("div",{className:(0,n.Z)("col text--right",{"col--3":z})},r.createElement(s.Z,{to:P.permalink,"aria-label":"Read more about "+C},r.createElement("b",null,r.createElement(i.Z,{id:"theme.blog.post.readMore",description:"The label used in blog post item excerpts to link to full blog posts"},"Read More"))))))}},6753:function(e,t,a){a.d(t,{Z:function(){return d}});var r=a(7294),n=a(5999),l=a(3117),i=a(102),s=a(6010),o="iconEdit_2_ui",m=["className"],c=function(e){var t=e.className,a=(0,i.Z)(e,m);return r.createElement("svg",(0,l.Z)({fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,s.Z)(o,t),"aria-hidden":"true"},a),r.createElement("g",null,r.createElement("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})))},u=a(2822);function d(e){var t=e.editUrl;return r.createElement("a",{href:t,target:"_blank",rel:"noreferrer noopener",className:u.kM.common.editThisPage},r.createElement(c,null),r.createElement(n.Z,{id:"theme.common.editThisPage",description:"The link label to edit the current page"},"Edit this page"))}},8727:function(e,t,a){a.d(t,{Z:function(){return g}});var r=a(7294),n=a(6010),l=a(5999),i=a(9960),s="tag_1Okp",o="tagRegular_3MiF",m="tagWithCount_1HU1";var c=function(e){var t,a=e.permalink,l=e.name,c=e.count;return r.createElement(i.Z,{href:a,className:(0,n.Z)(s,(t={},t[o]=!c,t[m]=c,t))},l,c&&r.createElement("span",null,c))},u="tags_2ga9",d="tag_11ep";function g(e){var t=e.tags;return r.createElement(r.Fragment,null,r.createElement("b",null,r.createElement(l.Z,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list"},"Tags:")),r.createElement("ul",{className:(0,n.Z)(u,"padding--none","margin-left--sm")},t.map((function(e){var t=e.label,a=e.permalink;return r.createElement("li",{key:a,className:d},r.createElement(c,{name:t,permalink:a}))}))))}}}]);