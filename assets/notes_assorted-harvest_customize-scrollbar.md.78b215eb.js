import{_ as s,c as a,o as n,a as l}from"./app.3e9de45b.js";const d=JSON.parse('{"title":"\u7B80\u5355\u9B54\u6539\u7F51\u9875\u6EDA\u52A8\u6761","titleTemplate":"\u6389\u843D","description":"","frontmatter":{"title":"\u7B80\u5355\u9B54\u6539\u7F51\u9875\u6EDA\u52A8\u6761","titleTemplate":"\u6389\u843D"},"headers":[{"level":2,"title":"Preface","slug":"preface","link":"#preface","children":[]},{"level":2,"title":"Analysis","slug":"analysis","link":"#analysis","children":[]},{"level":2,"title":"Show Code","slug":"show-code","link":"#show-code","children":[]},{"level":2,"title":"Reference","slug":"reference","link":"#reference","children":[]}],"relativePath":"notes/assorted-harvest/customize-scrollbar.md","lastUpdated":1666257852000}'),e={name:"notes/assorted-harvest/customize-scrollbar.md"},o=l(`<h1 id="\u7B80\u5355\u9B54\u6539\u7F51\u9875\u6EDA\u52A8\u6761" tabindex="-1">\u7B80\u5355\u9B54\u6539\u7F51\u9875\u6EDA\u52A8\u6761 <a class="header-anchor" href="#\u7B80\u5355\u9B54\u6539\u7F51\u9875\u6EDA\u52A8\u6761" aria-hidden="true">#</a></h1><h2 id="preface" tabindex="-1">Preface <a class="header-anchor" href="#preface" aria-hidden="true">#</a></h2><p>\u5B9A\u5236\u7F51\u9875\u6EDA\u52A8\u6761\u6837\u5F0F\u662F\u5F88\u5E38\u89C1\u7684\u4E1A\u52A1\u9700\u6C42\u3002</p><h2 id="analysis" tabindex="-1">Analysis <a class="header-anchor" href="#analysis" aria-hidden="true">#</a></h2><p>\u4F17\u6240\u5468\u77E5\uFF1A <img src="https://img-blog.csdnimg.cn/9a46e911c3b34e2a87eeb886104bc41e.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zm25riF56eL,size_20,color_FFFFFF,t_70,g_se,x_16" alt="\u5728\u8FD9\u91CC\u63D2\u5165\u56FE\u7247\u63CF\u8FF0"></p><h2 id="show-code" tabindex="-1">Show Code <a class="header-anchor" href="#show-code" aria-hidden="true">#</a></h2><p>\u901A\u8FC7\u4EE5\u4E0B\u6837\u5F0F\uFF0C\u53EF\u4EE5\u5C06\u6EDA\u52A8\u6761\u9B54\u6539\u6210\u4E0A\u8FF0\u56FE\u4E2D\u7684\u6837\u5B50\uFF1A</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre><code><span class="line"><span style="color:#89DDFF;">::</span><span style="color:#C792EA;">-webkit-scrollbar</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">13px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">height</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">13px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">::</span><span style="color:#C792EA;">-webkit-scrollbar-thumb</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">border-radius</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1em</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">background-color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">rgba</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">50</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">50</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">50</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0.28</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">border</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3px</span><span style="color:#A6ACCD;"> solid transparent</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">background-clip</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> content-box</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">::</span><span style="color:#C792EA;">-webkit-scrollbar-track</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">background-color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">rgba</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">50</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">50</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">50</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0.06</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">::</span><span style="color:#C792EA;">-webkit-scrollbar-corner</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">background-color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">rgba</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">50</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">50</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">50</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0.06</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u5176\u4E2D\u9700\u8981\u6CE8\u610F\u7684\u662F\uFF0Cthumb \u7684\u5BBD\u5EA6\u662F\u65E0\u6CD5\u8BBE\u7F6E\u7684\uFF0C\u4E3A\u4E86\u5B9E\u73B0 thumb \u60AC\u6D6E\u7684\u6548\u679C\uFF0C\u4E3A thumb \u8BBE\u7F6E\u4E86\u900F\u660E\u7684 border\u3002\u800C\u9ED8\u8BA4\u7684 <code>background-clip</code> \u662F <code>border-box</code> \u7684\uFF0C\u8FD9\u610F\u5473\u7740\u80CC\u666F\u4F1A\u8513\u5EF6\u5230\u8FB9\u6846\u4E0B\uFF0C\u8FD9\u6837\u540C\u6837\u662F\u65E0\u6CD5\u5448\u73B0\u60AC\u6D6E\u6548\u679C\u7684\uFF0C\u4E8E\u662F\u5C06\u5176\u8BBE\u7F6E\u6210\u4E3A <code>content-box</code> \u9650\u5236\u80CC\u666F\u533A\u57DF\u4EC5\u4E3A\u5185\u5BB9\u533A\u3002</p><h2 id="reference" tabindex="-1">Reference <a class="header-anchor" href="#reference" aria-hidden="true">#</a></h2><ul><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-clip" target="_blank" rel="noreferrer">background-clip</a></li></ul>`,11),p=[o];function r(c,t,C,D,y,F){return n(),a("div",null,p)}const A=s(e,[["render",r]]);export{d as __pageData,A as default};