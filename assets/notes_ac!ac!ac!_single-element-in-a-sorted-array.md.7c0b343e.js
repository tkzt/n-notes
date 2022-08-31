import{_ as s,c as a,o as n,a as l}from"./app.a59c9aa2.js";const C=JSON.parse('{"title":"\u6709\u5E8F\u6570\u7EC4\u4E2D\u7684\u5355\u4E00\u5143\u7D20","titleTemplate":"AC!AC!AC!","description":"","frontmatter":{"title":"\u6709\u5E8F\u6570\u7EC4\u4E2D\u7684\u5355\u4E00\u5143\u7D20","titleTemplate":"AC!AC!AC!"},"headers":[{"level":2,"title":"\u9898\u76EE","slug":"\u9898\u76EE","link":"#\u9898\u76EE","children":[]},{"level":2,"title":"\u89E3\u9898","slug":"\u89E3\u9898","link":"#\u89E3\u9898","children":[]}],"relativePath":"notes/ac!ac!ac!/single-element-in-a-sorted-array.md","lastUpdated":1661928165000}'),e={name:"notes/ac!ac!ac!/single-element-in-a-sorted-array.md"},p=l(`<h1 id="\u6709\u5E8F\u6570\u7EC4\u4E2D\u7684\u5355\u4E00\u5143\u7D20" tabindex="-1">\u6709\u5E8F\u6570\u7EC4\u4E2D\u7684\u5355\u4E00\u5143\u7D20 <a class="header-anchor" href="#\u6709\u5E8F\u6570\u7EC4\u4E2D\u7684\u5355\u4E00\u5143\u7D20" aria-hidden="true">#</a></h1><h2 id="\u9898\u76EE" tabindex="-1">\u9898\u76EE <a class="header-anchor" href="#\u9898\u76EE" aria-hidden="true">#</a></h2><p><a href="https://leetcode-cn.com/problems/single-element-in-a-sorted-array/" target="_blank" rel="noreferrer">\u4F20\u9001\u95E8</a></p><h2 id="\u89E3\u9898" tabindex="-1">\u89E3\u9898 <a class="header-anchor" href="#\u89E3\u9898" aria-hidden="true">#</a></h2><p>\u8FD9\u9898\u5F88\u7ECF\u5178\uFF0C\u8003\u5BDF\u7684\u57FA\u7840\u77E5\u8BC6\uFF1A\u4E24\u4E2A\u76F8\u540C\u7684\u6570\u76F8\u5F02\u6216\u5F97\u96F6\u3001\u96F6\u4E0E\u5176\u4ED6\u6570\u76F8\u5F02\u6216\u5F97\u5176\u4ED6\u6570\u672C\u8EAB\u3002\u6709\u79CD\u6D88\u6D88\u4E50\u7684\u610F\u601D\uFF0C\u66F4\u5DE7\u7684\u5728\u4E8E\u505A\u9898\u7684\u8FD9\u4E00\u5929\u662F 03 \u6708 14 \u65E5\u3002</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#676E95;">/**</span></span>
<span class="line"><span style="color:#676E95;"> * </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">param</span><span style="color:#676E95;"> </span><span style="color:#89DDFF;">{</span><span style="color:#FFCB6B;">number[]</span><span style="color:#89DDFF;">}</span><span style="color:#676E95;"> </span><span style="color:#A6ACCD;">nums</span></span>
<span class="line"><span style="color:#676E95;"> * </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">return</span><span style="color:#676E95;"> </span><span style="color:#89DDFF;">{</span><span style="color:#FFCB6B;">number</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#676E95;"> */</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> singleNonDuplicate </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">nums</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">result</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">for</span><span style="color:#F07178;">(</span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">of</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">nums</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">result</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">^=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">result</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span></code></pre></div>`,6),o=[p];function t(r,c,y,F,i,D){return n(),a("div",null,o)}const A=s(e,[["render",t]]);export{C as __pageData,A as default};
