import{_ as a,c as s,o as e,a as n}from"./app.3e9de45b.js";const b=JSON.parse('{"title":"Git \u57FA\u64CD","titleTemplate":"\u519B\u4F53\u62F3","description":"","frontmatter":{"title":"Git \u57FA\u64CD","titleTemplate":"\u519B\u4F53\u62F3"},"headers":[{"level":2,"title":"\u7B80\u4ECB","slug":"\u7B80\u4ECB","link":"#\u7B80\u4ECB","children":[]},{"level":2,"title":"\u57FA\u672C\u6982\u5FF5","slug":"\u57FA\u672C\u6982\u5FF5","link":"#\u57FA\u672C\u6982\u5FF5","children":[{"level":3,"title":"\u7248\u672C\u5E93\uFF08repository\uFF09","slug":"\u7248\u672C\u5E93\uFF08repository\uFF09","link":"#\u7248\u672C\u5E93\uFF08repository\uFF09","children":[]},{"level":3,"title":"\u5DE5\u4F5C\u533A\u3001\u6682\u5B58\u533A\u3001HEAD","slug":"\u5DE5\u4F5C\u533A\u3001\u6682\u5B58\u533A\u3001head","link":"#\u5DE5\u4F5C\u533A\u3001\u6682\u5B58\u533A\u3001head","children":[]}]},{"level":2,"title":"\u914D\u7F6E","slug":"\u914D\u7F6E","link":"#\u914D\u7F6E","children":[{"level":3,"title":"\u5B89\u88C5","slug":"\u5B89\u88C5","link":"#\u5B89\u88C5","children":[]},{"level":3,"title":"name\u3001email\u3001ssh key","slug":"name\u3001email\u3001ssh-key","link":"#name\u3001email\u3001ssh-key","children":[]}]},{"level":2,"title":"Get Started","slug":"get-started","link":"#get-started","children":[{"level":3,"title":"\u521D\u59CB\u5316\u4ED3\u5E93","slug":"\u521D\u59CB\u5316\u4ED3\u5E93","link":"#\u521D\u59CB\u5316\u4ED3\u5E93","children":[]}]},{"level":2,"title":"\u57FA\u672C\u64CD\u4F5C","slug":"\u57FA\u672C\u64CD\u4F5C","link":"#\u57FA\u672C\u64CD\u4F5C","children":[{"level":3,"title":"add","slug":"add","link":"#add","children":[]},{"level":3,"title":"commit","slug":"commit","link":"#commit","children":[]},{"level":3,"title":"push","slug":"push","link":"#push","children":[]},{"level":3,"title":"pull","slug":"pull","link":"#pull","children":[]},{"level":3,"title":"stash","slug":"stash","link":"#stash","children":[]},{"level":3,"title":"\u5206\u652F","slug":"\u5206\u652F","link":"#\u5206\u652F","children":[]},{"level":3,"title":"\u56DE\u6EDA","slug":"\u56DE\u6EDA","link":"#\u56DE\u6EDA","children":[]}]}],"relativePath":"notes/basic-skills/git-getting-started.md","lastUpdated":1666257852000}'),t={name:"notes/basic-skills/git-getting-started.md"},l=n(`<h1 id="git-\u57FA\u64CD" tabindex="-1">Git \u57FA\u64CD <a class="header-anchor" href="#git-\u57FA\u64CD" aria-hidden="true">#</a></h1><h2 id="\u7B80\u4ECB" tabindex="-1">\u7B80\u4ECB <a class="header-anchor" href="#\u7B80\u4ECB" aria-hidden="true">#</a></h2><p>\u76F8\u8F83\u4E8E SVN \u7B49\u96C6\u4E2D\u5F0F\u7248\u672C\u7BA1\u7406\u5DE5\u5177\uFF0CGit \u5176\u663E\u8457\u7279\u70B9\u5305\u62EC\u5206\u5E03\u5F0F\u3001\u5F3A\u5927\u7684\u5206\u652F\u7BA1\u7406\u3001\u5FEB\u3001\u7B80\u5355\u3002\u5176\u8BDE\u751F\u662F\u4E3A\u4E86\u9AD8\u6548\u4E14\u7B26\u5408\u5F00\u6E90\u7CBE\u795E\u5730\u89E3\u51B3 Linux \u6E90\u7801\u7BA1\u7406\u95EE\u9898\uFF0C\u521D\u4EE3\u7531 Linus \u5386\u65F6\u4E24\u5468\uFF0C\u4F7F\u7528 C \u5F00\u53D1\u3002</p><p>\u6240\u8C13\u5206\u5E03\u5F0F\u5373\u6BCF\u4E2A\u8282\u70B9\u90FD\u542B\u6709\u5B8C\u6574\u4ED3\u5E93\uFF0C\u90FD\u53EF\u4EE5\u5728\u672C\u5730\u8FDB\u884C\u7248\u672C\u7684\u66F4\u65B0\u3001\u56DE\u6EDA\uFF0C\u7248\u672C\u7684\u7BA1\u7406\u4E0D\u5FC5\u4F9D\u8D56\u67D0\u4E00\u4E2A\u8282\u70B9\uFF08\u5373\u96C6\u4E2D\u5F0F\u7BA1\u7406\u4E2D\u7684\u4E2D\u592E\u8282\u70B9\uFF09\u3002\u4F46\u5B9E\u9645\u4E0A\uFF0C\u4E3A\u4E86\u4E0D\u540C\u8282\u70B9\u66F4\u4FBF\u6377\u5730\u8FDB\u884C\u7248\u672C\u7684\u540C\u6B65\uFF0C\u5F80\u5F80\u4F1A\u6709\u67D0\u4E2A\uFF08\u4E9B\uFF09\u8282\u70B9\u5145\u5F53\u53E6\u4E00\u610F\u4E49\u4E0A\u7684\u4E2D\u592E\uFF08\u4F60\u6BD4\u5982 github\u3001gitee \u7B49\uFF09\u3002Git \u7684\u8FD0\u4F5C\u770B\u8D77\u6765\u50CF\u8FD9\u6837\uFF1A</p><p><img src="https://img-blog.csdnimg.cn/20210312161433791.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTEzNTI5ODg=,size_16,color_FFFFFF,t_70" alt="\u5728\u8FD9\u91CC\u63D2\u5165\u56FE\u7247\u63CF\u8FF0"><small style="text-align:center;display:block;">* PS. from <a href="https://www.liaoxuefeng.com/wiki/896043488029600" target="_blank" rel="noreferrer">\u5ED6\u96EA\u5CF0\u7684\u5B98\u65B9\u7F51\u7AD9</a></small></p><h2 id="\u57FA\u672C\u6982\u5FF5" tabindex="-1">\u57FA\u672C\u6982\u5FF5 <a class="header-anchor" href="#\u57FA\u672C\u6982\u5FF5" aria-hidden="true">#</a></h2><h3 id="\u7248\u672C\u5E93\uFF08repository\uFF09" tabindex="-1">\u7248\u672C\u5E93\uFF08repository\uFF09 <a class="header-anchor" href="#\u7248\u672C\u5E93\uFF08repository\uFF09" aria-hidden="true">#</a></h3><p>\u5B57\u9762\u4E0A\u6765\u770B\u662F\u4E00\u4E2A\u88C5\u7740\u6240\u6709\u5F85\u7BA1\u7406\u6587\u4EF6\u7684\u5BB9\u5668\uFF0C\u6587\u4EF6\u7684\u5220\u9664\u3001\u66F4\u65B0\u3001\u65B0\u589E\u90FD\u4F53\u73B0\u5176\u4E2D\u3002\u672C\u8D28\u4E0A\u662F\u4E00\u4E2A\u540D\u66F0 <code>.git</code> \u7684\u6587\u4EF6\u5939\uFF0C\u540C\u7EA7\u76EE\u5F55\u4E0B\u6240\u6709\u6587\u4EF6\uFF08\u9664\u53BB <code>.gitignore</code> \u4E2D\u88AB\u70B9\u540D\u7684\u6587\u4EF6\u4EEC\uFF09\u7684\u5404\u4E2A\u72B6\u6001\u90FD\u901A\u8FC7\u67D0\u4E9B\u795E\u5947\u9B54\u6CD5\u8BB0\u5F55\u5728\u5176\u4E2D\u3002</p><h3 id="\u5DE5\u4F5C\u533A\u3001\u6682\u5B58\u533A\u3001head" tabindex="-1">\u5DE5\u4F5C\u533A\u3001\u6682\u5B58\u533A\u3001HEAD <a class="header-anchor" href="#\u5DE5\u4F5C\u533A\u3001\u6682\u5B58\u533A\u3001head" aria-hidden="true">#</a></h3><p>\u53EF\u4EE5\u5C06\u7248\u672C\u5E93\u7684\u795E\u5947\u9B54\u6CD5\u7B80\u5355\u7406\u89E3\u4E3A\u5982\u4E0B\u6240\u793A\uFF08\u6240\u8C13\u5DE5\u4F5C\u533A\u5373\u5F85\u7BA1\u7406\u6587\u4EF6\u6240\u5728\u76EE\u5F55\uFF09\uFF1A</p><p><img src="https://img-blog.csdnimg.cn/20210312161451784.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTEzNTI5ODg=,size_16,color_FFFFFF,t_70" alt="\u5728\u8FD9\u91CC\u63D2\u5165\u56FE\u7247\u63CF\u8FF0"></p><h2 id="\u914D\u7F6E" tabindex="-1">\u914D\u7F6E <a class="header-anchor" href="#\u914D\u7F6E" aria-hidden="true">#</a></h2><h3 id="\u5B89\u88C5" tabindex="-1">\u5B89\u88C5 <a class="header-anchor" href="#\u5B89\u88C5" aria-hidden="true">#</a></h3><p>\u7565</p><h3 id="name\u3001email\u3001ssh-key" tabindex="-1">name\u3001email\u3001ssh key <a class="header-anchor" href="#name\u3001email\u3001ssh-key" aria-hidden="true">#</a></h3><p>\u521D\u59CB\u914D\u7F6E\u901A\u5E38\u5305\u62EC\u4E09\u9879\uFF1A</p><h4 id="name" tabindex="-1">name <a class="header-anchor" href="#name" aria-hidden="true">#</a></h4><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">git config --global user.name </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">\u8521\u5D69\u677E</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span></code></pre></div><p>\u6700\u7EC8\u8868\u73B0\u4E3A\uFF1A</p><p><img src="https://img-blog.csdnimg.cn/20210312161508687.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTEzNTI5ODg=,size_16,color_FFFFFF,t_70" alt="\u5728\u8FD9\u91CC\u63D2\u5165\u56FE\u7247\u63CF\u8FF0"></p><h4 id="email" tabindex="-1">email <a class="header-anchor" href="#email" aria-hidden="true">#</a></h4><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">git config --global user.email </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">css@yunboo.com.cn</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span></code></pre></div><p>\u8FD9\u4E2A\u53EF\u4EE5\u7528\u6765\u7EDF\u8BA1 contribution \u7B49\u3002</p><h4 id="ssh-\u5BC6\u94A5" tabindex="-1">ssh \u5BC6\u94A5 <a class="header-anchor" href="#ssh-\u5BC6\u94A5" aria-hidden="true">#</a></h4><p>\u5728\u540C\u6B65\u6570\u636E\u65F6\uFF0C\u8EAB\u4EFD\u6821\u9A8C\u662F\u5FC5\u4E0D\u53EF\u5C11\u7684\u3002\u4F17\u6240\u5468\u77E5\uFF0C\u6821\u9A8C\u65B9\u5F0F\u6709\u4E24\u79CD\uFF0Chttps\u3001ssh\u3002\u8FD9\u5176\u5B9E\u662F\u4E24\u79CD\u534F\u8BAE\uFF0C\u524D\u8005\u5728\u63A8\u9001\u8FDC\u7AEF\u65F6\u4F1A\u663E\u5F0F\u5730\u8981\u6C42\u8F93\u5165\u8D26\u53F7\u540D\u5BC6\u7801\uFF08\u5728 coding \u4E2D\uFF0C\u662F coding \u7684\u8D26\u53F7\u540D\u5BC6\u7801\uFF09\uFF0C\u800C\u540E\u8005\u9700\u4E8B\u5148\u901A\u8FC7 ssh-keygen \uFF08\u4E00\u822C\u800C\u8A00\u4E00\u8DEF enter \u5373\u53EF\uFF09\u751F\u6210 ssh \u516C\u79C1\u5BC6\u94A5\uFF0C\u7136\u540E\u5C06\u516C\u94A5\u586B\u5230\u76F8\u5173\u5E73\u53F0\u7684 ssh \u914D\u7F6E\u4E2D\u3002</p><p>\u751F\u6210\u5BC6\u94A5\uFF1A</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">ssh-keygen -t rsa -C </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">username@domain</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>windows \u4E0B\u67E5\u770B\u516C\u94A5\uFF1A</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">notepad </span><span style="color:#89DDFF;">~</span><span style="color:#A6ACCD;">/.ssh/id_rsa.pub</span></span>
<span class="line"></span></code></pre></div><h2 id="get-started" tabindex="-1">Get Started <a class="header-anchor" href="#get-started" aria-hidden="true">#</a></h2><h3 id="\u521D\u59CB\u5316\u4ED3\u5E93" tabindex="-1">\u521D\u59CB\u5316\u4ED3\u5E93 <a class="header-anchor" href="#\u521D\u59CB\u5316\u4ED3\u5E93" aria-hidden="true">#</a></h3><p>\u521D\u59CB\u5316\u4ED3\u5E93\u6709\u4E24\u79CD\u65B9\u5F0F\uFF1A\u5C06\u672C\u5730\u5DF2\u6709\u7684\u6587\u4EF6\u5939\u521D\u59CB\u5316\u4E3A git \u4ED3\u5E93\u3001\u4ECE\u8FDC\u7AEF\u62C9\u53D6\u4E00\u4E2A\u5DF2\u5B58\u5728\u7684 git \u4ED3\u5E93\u3002</p><h4 id="\u4ECE\u672C\u5730\u6587\u4EF6\u5939" tabindex="-1">\u4ECE\u672C\u5730\u6587\u4EF6\u5939 <a class="header-anchor" href="#\u4ECE\u672C\u5730\u6587\u4EF6\u5939" aria-hidden="true">#</a></h4><p>\u6B64\u79CD\u65B9\u5F0F\u9700\u8981\u5148\u5728\u76F8\u5173\u5E73\u53F0\u521B\u5EFA\u7A7A\u767D\u7684\u4ED3\u5E93\u3002\u9996\u5148\u9700\u8981\u5728\u76EE\u6807\u6587\u4EF6\u5939\u5185\uFF1A</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">git init</span></span>
<span class="line"></span></code></pre></div><p>\u4E00\u4E2A <code>.git</code> \u6587\u4EF6\u5939\u5E94\u8FD0\u800C\u751F\uFF08\u5B9E\u9645\u662F\u5728\u5F53\u524D\u76EE\u5F55\u521B\u5EFA\u4E86\u4E00\u4E2A\u7248\u672C\u5E93\uFF09\u3002\u800C\u540E\u5C06\u9700\u8981\u7BA1\u7406\u7684\u6587\u4EF6\u901A\u8FC7 <code>git add</code> \u547D\u4EE4\u6DFB\u52A0\u5230\u6682\u5B58\u533A\uFF0C\u4E00\u822C\u800C\u8A00\uFF0C\u521D\u59CB\u65F6\u4F1A\u6DFB\u52A0\u5F53\u524D\u76EE\u5F55\u9664 <code>.gitignore</code> \u4E2D\u6307\u660E\u6587\u4EF6\u5916\u6240\u6709\u6587\u4EF6\uFF1A</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">git add </span><span style="color:#82AAFF;">.</span></span>
<span class="line"></span></code></pre></div><p>\u800C\u540E\uFF0C\u4F8B\u884C first commit\uFF08\u6682\u5B58\u533A\u5230\u672C\u5730\u7248\u672C\u5E93\uFF09\uFF1A</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">git commit -m </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">first commit</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span></code></pre></div><p>\u800C\u540E\uFF0C\u6DFB\u52A0\u8FDC\u7A0B\u6E90\uFF1A</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">git remote add origin https://e.coding.net/yunboo/smartCampus/running-platform.git</span></span>
<span class="line"></span></code></pre></div><p>\u5728\u4E00\u756A\u4FEE\u6539\u518D add \u518D commit \u540E\uFF0C\u63A8\u9001\u5230\u8FDC\u7AEF\uFF1A</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">git push -u origin master</span></span>
<span class="line"></span></code></pre></div><p>\u5176\u4E2D <code>-u</code> \u7528\u4E8E\u6307\u5B9A\u672C\u5730\u7248\u672C\u5E93\u6240\u5728\u5206\u652F\u7684\u8FDC\u7A0B\u4E0A\u6D41\uFF0C\u662F <code>--set-upstream</code> \u7684\u7B80\u5199\u3002</p><h4 id="\u4ECE\u8FDC\u7A0B\u4ED3\u5E93" tabindex="-1">\u4ECE\u8FDC\u7A0B\u4ED3\u5E93 <a class="header-anchor" href="#\u4ECE\u8FDC\u7A0B\u4ED3\u5E93" aria-hidden="true">#</a></h4><p>\u9996\u5148\u514B\u9686\u4ED3\u5E93\u5230\u672C\u5730\uFF1A</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">git clone https://e.coding.net/yunboo/smartCampus/running-platform.git</span></span>
<span class="line"></span></code></pre></div><p>\u5728\u4E00\u756A\u4FEE\u6539\u518D add \u518D commit \u540E\uFF0C\u63A8\u9001\u5230\u8FDC\u7AEF\uFF1A</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">git push -u origin master</span></span>
<span class="line"></span></code></pre></div><h2 id="\u57FA\u672C\u64CD\u4F5C" tabindex="-1">\u57FA\u672C\u64CD\u4F5C <a class="header-anchor" href="#\u57FA\u672C\u64CD\u4F5C" aria-hidden="true">#</a></h2><h3 id="add" tabindex="-1">add <a class="header-anchor" href="#add" aria-hidden="true">#</a></h3><p>\u901A\u8FC7 <code>git add</code> \uFF1A</p><ul><li>\u5C06\u5DE5\u4F5C\u533A\u6587\u4EF6\u6DFB\u52A0\u5230\u6682\u5B58\u533A\uFF08stage\uFF09</li><li>\u5C06\u5DE5\u4F5C\u533A\u6587\u4EF6\u7684\u4FEE\u6539\u66F4\u65B0\u5230\u6682\u5B58\u533A</li></ul><p>\u540E\u63A5\u5177\u4F53\u6587\u4EF6\u3001\u6587\u4EF6\u5939\u8FDB\u884C\u5355\u72EC\u3001\u6279\u91CF\u7684\u6DFB\u52A0\uFF08<code>.</code> \u6307\u5F53\u524D\u6587\u4EF6\u5939\u6240\u6709\uFF09\u3002</p><h3 id="commit" tabindex="-1">commit <a class="header-anchor" href="#commit" aria-hidden="true">#</a></h3><p>\u901A\u8FC7 <code>git commit</code> \u5C06\u6682\u5B58\u533A\u6587\u4EF6\u63D0\u4EA4\u5230\u7248\u672C\u5E93\uFF0C\u5373\u4E00\u6B21\u521B\u5EFA\u4E86\u4E00\u4E2A\u7248\u672C\u3002</p><p>\u5728\u63D0\u4EA4\u540C\u65F6\uFF0C\u9700\u8981\u4E3A\u8BE5\u7248\u672C\u6DFB\u52A0\u4E00\u4E9B\u5907\u6CE8\u4FE1\u606F\u3002\u5907\u6CE8\u53EF\u4EE5\u901A\u8FC7\u4E24\u79CD\u65B9\u5F0F\u6765\u6DFB\u52A0\uFF1A</p><ul><li><code>git commit</code> \u5176\u540E\u4E0D\u63A5\u4EFB\u4F55\u547D\u4EE4\uFF0C\u4F1A\u5728\u7EC8\u7AEF\u4F1A\u5207\u6362\u4E3A vim \u7F16\u8F91\u5668\uFF0C\u4EE5\u4FBF\u7F16\u8F91\u3001\u4FDD\u5B58\u4E00\u4E2A <strong>\u8BE6\u7EC6\u7684 commit \u8BF4\u660E</strong>\u3002</li><li><code>git commit</code> \u540E\u63A5 <code>-m</code> \u518D\u63A5\u4E00\u53E5 <strong>\u7B80\u6D01\u7684\u8BF4\u660E</strong>\uFF0C\u4F60\u6BD4\u5982\uFF1A</li></ul><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">git commit -m </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">whatever</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span></code></pre></div><p>\u4E8B\u5B9E\u4E0A\uFF0Ccommit \u65F6\uFF0C\u9700\u8981\u6709\u4E1C\u897F\u53EF\u63D0\u4EA4\uFF0C\u6240\u8C13\u6709\u4E1C\u897F\u53EF\u63D0\u4EA4\u5305\u62EC\uFF1A</p><ul><li>\u6709\u6B64\u524D\u672A\u6DFB\u52A0\u5230\u6682\u5B58\u533A\u7684\u6587\u4EF6\u88AB\u52A0\u5165\u4E86</li><li>\u5DF2\u7ECF\u5728\u6682\u5B58\u533A\u7684\u6587\u4EF6\u53D1\u751F\u4E86\u66F4\u65B0\uFF08\u5305\u62EC\u4FEE\u6539\u3001\u88AB\u5220\u9664\u7B49\u7B49\uFF09</li></ul><p>\u8FD9\u610F\u5473\u7740\uFF0C\u5728 commit \u4E4B\u524D\u5F80\u5F80\u9700\u8981 add \u4E00\u628A\uFF0C\u8FD9\u4FBF\u53EF\u4EE5\u901A\u8FC7 <code>-am</code> \u6765\u7B80\u5316\u547D\u4EE4\uFF08\u4ECE\u5B57\u9762\u4E0A\u6765\u770B\uFF0C<code>-am</code> \u610F\u601D\u662F\u5728 commit \u65F6\u5148 add \u4E00\u628A\uFF09\u3002\u4F46\u9700\u8981\u6CE8\u610F\u7684\u662F\uFF0C<code>-am</code> \u53EA\u4F1A\u63D0\u4EA4\u5DF2\u5728\u6682\u5B58\u533A\u7684\u6587\u4EF6\u72B6\u6001\u66F4\u65B0\uFF0C\u5F53\u6709\u65B0\u589E\u6587\u4EF6\u65F6\uFF0C\u4ECD\u9700\u8981\u5148 add\u3002</p><p>\u53E6\u5916\uFF0C\u53EF\u4EE5\u901A\u8FC7 <code>git tag</code> \uFF0C\u4E3A\u5F53\u524D\u7248\u672C\u6253\u4E0A\u6807\u7B7E\u3002\u6BD4\u5982 <code>git tag &quot;hhh&quot;</code> \u4E4B\u540E\uFF0C\u901A\u8FC7 <code>git log</code> \u67E5\u770B\u63D0\u4EA4\u65E5\u5FD7\uFF1A</p><p><img src="https://img-blog.csdnimg.cn/2021031216155141.png" alt="\u5728\u8FD9\u91CC\u63D2\u5165\u56FE\u7247\u63CF\u8FF0"></p><h3 id="push" tabindex="-1">push <a class="header-anchor" href="#push" aria-hidden="true">#</a></h3><p>\u5728 commit \u4E4B\u540E\uFF0C\u5728\u5DF2\u6307\u5B9A\u4E0A\u6D41\u7684\u524D\u63D0\u4E0B\uFF0C\u53EF\u4EE5\u901A\u8FC7 <code>git push</code> \u547D\u4EE4\u5C06\u672C\u5730\u7248\u672C\u5E93\u63A8\u9001\u5230\u8FDC\u7AEF\u3002</p><p>\u5728\u672A\u6307\u5B9A\u4E0A\u6D41\u65F6\uFF0C\u53EF\u4EE5\u5728 push \u65F6\u52A0\u4E0A <code>-u</code> \u547D\u4EE4\uFF0C\u518D\u63A5\u4E0A\u8FDC\u7AEF\u5206\u652F\uFF0C\u6307\u5B9A\u4E0A\u6D41\u5E76\u63D0\u4EA4\uFF0C\u4F60\u6BD4\u5982\uFF1A</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">git push -u origin master</span></span>
<span class="line"></span></code></pre></div><p>\u800C\u540E\u8FDC\u7AEF\u7684 master \u5206\u652F\u4FBF\u6210\u4E3A\u672C\u5730\u4E0A\u6D41\uFF0C\u6B64\u540E\u7684\u63A8\u9001\u53EA\u9700\u8981 <code>git push</code>\u3002</p><h3 id="pull" tabindex="-1">pull <a class="header-anchor" href="#pull" aria-hidden="true">#</a></h3><p>\u4F17\u6240\u5468\u77E5\uFF0C<code>git pull</code> \u4E3A <code>git push</code> \u7684\u76F8\u53CD\u64CD\u4F5C\uFF0C\u9ED8\u8BA4\u62C9\u53D6\u4E0A\u6D41\u6700\u65B0\u63D0\u4EA4\u5230\u672C\u5730\uFF0C\u901A\u8FC7 <code>git pull origin certain-branch</code> \u62C9\u53D6\u8FDC\u7AEF\u67D0\u4E2A\u5206\u652F\u6700\u65B0\u63D0\u4EA4\u3002</p><h3 id="stash" tabindex="-1">stash <a class="header-anchor" href="#stash" aria-hidden="true">#</a></h3><p>\u6709\u65F6\uFF0C\u5728\u5DE5\u4F5C\u533A\u6709\u4FEE\u6539\u4F46\u672A\u63D0\u4EA4\u7684\u72B6\u6001\u4E0B\uFF0C\u60F3\u62C9\u53D6\u63D0\u4EA4\uFF0C\u6216\u8005\u5207\u6362\u5206\u652F\uFF0C\u53EF\u4EE5\u5148 <code>git stash</code> \u6682\u5B58\u672C\u5730\u4FEE\u6539\u5230\u67D0\u4E2A\u795E\u79D8\u7A7A\u95F4\uFF08\u770B\u8D77\u6765\u672C\u5730\u4FEE\u6539\u4EFF\u4F5B\u6D88\u5931\u4E86\u4E00\u6837\uFF09\uFF0C\u800C\u540E\u5728\u9002\u5B9C\u7684\u65F6\u5019\uFF0C<code>git stash pop</code> \u5C06\u6682\u5B58\u653E\u56DE\u672C\u5730\u3002</p><h3 id="\u5206\u652F" tabindex="-1">\u5206\u652F <a class="header-anchor" href="#\u5206\u652F" aria-hidden="true">#</a></h3><p>\u4E00\u4E2A\u4ED3\u5E93\u53EF\u4EE5\u6709\u591A\u4E2A\u5206\u652F\uFF0C\u76F4\u5230\u5206\u652F\u5408\u5E76\u524D\uFF0C\u5404\u4E2A\u5206\u652F\u72EC\u7ACB\u53D1\u5C55\u3002\u5728\u7248\u672C\u5E93\u4E2D\uFF0C\u6709\u4E00\u4E2A\u795E\u5947\u7684 <code>HEAD \u6307\u9488</code>\uFF0C\u5B83\u6307\u5411\u67D0\u4E2A\u5206\u652F\uFF0C\u8868\u793A\u5F53\u524D\u63D0\u4EA4\u63D0\u5F80\u4F55\u65B9\u3002</p><h4 id="\u65B0\u5EFA\u5206\u652F" tabindex="-1">\u65B0\u5EFA\u5206\u652F <a class="header-anchor" href="#\u65B0\u5EFA\u5206\u652F" aria-hidden="true">#</a></h4><p>\u6211\u4EEC\u53EF\u4EE5\u4EE5\u67D0\u4E2A\u6240\u5904\u5206\u652F\u4F5C\u4E3A\u6E90\uFF0C\u521B\u5EFA\u4E00\u4E2A\u5206\u652F\uFF1A</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">git checkout -b </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">new-branch</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span></code></pre></div><p>\u4E5F\u53EF\u4EE5\u4E0D\u8981\u6E90\uFF0C\u521B\u5EFA\u4E00\u4E2A\u5B64\u513F\u5206\u652F\uFF08\u521B\u5EFA\u540E\u5DE5\u4F5C\u533A\u6587\u4EF6\u867D\u7136\u5728\u5DF2 add \u5230\u6682\u5B58\u533A\uFF0C\u4F46\u5904\u4E8E\u66F4\u65B0\u672A\u63D0\u4EA4\u72B6\u6001\uFF0C\u53EF\u4EE5\u76F4\u63A5\u5220\u9664\u67D0\u4E9B\u4E0D\u8981\u7684\u6587\u4EF6\u800C\u540E\u518D commit -am\uFF0C\u4EE5\u5F97\u5230\u4E00\u4E2A\u65B0\u5206\u652F\u7684\u521D\u59CB\u63D0\u4EA4\uFF09\uFF1A</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">git checkout --orphan </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">new-orphan-branch</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span></code></pre></div><h4 id="\u5207\u6362" tabindex="-1">\u5207\u6362 <a class="header-anchor" href="#\u5207\u6362" aria-hidden="true">#</a></h4><p>\u901A\u8FC7 <code>git branch</code> \u547D\u4EE4\u53EF\u4EE5\u67E5\u770B\u5F53\u524D\u6240\u6709\u7684\u5206\u652F\uFF0C\u901A\u8FC7 <code>git checkout</code> \u53EF\u4EE5\u5207\u6362\u5230\u53E6\u4E00\u4E2A\u5206\u652F\uFF1A</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">git checkout new-branch</span></span>
<span class="line"></span></code></pre></div><h4 id="\u62C9\u53D6\u8FDC\u7AEF\u5206\u652F" tabindex="-1">\u62C9\u53D6\u8FDC\u7AEF\u5206\u652F <a class="header-anchor" href="#\u62C9\u53D6\u8FDC\u7AEF\u5206\u652F" aria-hidden="true">#</a></h4><p>\u4E00\u822C\u800C\u8A00\uFF0C\u62C9\u53D6\u4E0B\u6765\u7684\u4ED3\u5E93\u5904\u4E8E\u9ED8\u8BA4\u7684 master \u5206\u652F\uFF0C\u60F3\u8981\u62C9\u53D6\u67D0\u4E2A\u975E master \u5206\u652F\u5230\u672C\u5730\uFF0C\u53EF\u4EE5\u901A\u8FC7\uFF1A</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">git clone -b dev https://e.coding.net/yunboo/smartCampus/running-platform.git</span></span>
<span class="line"></span></code></pre></div><p>\u6240\u8C13 <code>dev</code>\uFF0C\u4FBF\u662F\u76EE\u6807\u5206\u652F\u3002</p><h4 id="\u5408\u5E76\u5206\u652F" tabindex="-1">\u5408\u5E76\u5206\u652F <a class="header-anchor" href="#\u5408\u5E76\u5206\u652F" aria-hidden="true">#</a></h4><p>\u6709\u65F6\uFF0C\u6211\u4EEC\u60F3\u76F4\u63A5\u5C06\u8FDC\u7A0B\u67D0\u4E2A\u5206\u652F\u5408\u5E76\u5230\u5F53\u524D\u5206\u652F\uFF0C\u90A3\u4E48\u76F4\u63A5\uFF1A</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">git merge certain-branch</span></span>
<span class="line"></span></code></pre></div><h4 id="\u51B2\u7A81" tabindex="-1">\u51B2\u7A81 <a class="header-anchor" href="#\u51B2\u7A81" aria-hidden="true">#</a></h4><p>\u5728\u5408\u5E76\u3001\u62C9\u53D6\u5176\u4ED6\u5206\u652F\u65F6\uFF0C\u6709\u53EF\u80FD\u4E24\u4E2A\u5206\u652F\u90FD\u5BF9\u67D0\u6587\u4EF6\u7684\u67D0\u5904\u8FDB\u884C\u4E86\u4FEE\u6539\uFF0C\u8FD9\u6837\u4FBF\u65E0\u6CD5\u5FEB\u901F\u5408\u5E76\uFF0C\u4FBF\u4F1A\u4EA7\u751F\u51B2\u7A81\uFF0C\u6B64\u65F6\u9700\u8981\u624B\u52A8\u53BB\u89E3\u51B3\u51B2\u7A81\u3002</p><p>\u5728\u89E3\u51B3\u5B8C\u51B2\u7A81\u540E\uFF0C\u518D\u63D0\u4EA4\u4FBF\u53EF\u3002</p><h3 id="\u56DE\u6EDA" tabindex="-1">\u56DE\u6EDA <a class="header-anchor" href="#\u56DE\u6EDA" aria-hidden="true">#</a></h3><p>\u6BCF\u6B21\u63D0\u4EA4\u90FD\u4F1A\u751F\u6210\u4E00\u4E2A sha1 \u52A0\u5BC6\u3001\u4EE5 16 \u8FDB\u5236\u663E\u793A\u7684 <code>commit id</code>\uFF0C\u4F60\u6BD4\u5982\uFF0C\u7531\u4E8E\u65F6\u95F4\u4E0E\u5730\u57DF\u7684\u5173\u7CFB\uFF0C\u6211\u4EEC\u6709\u5982\u4E0B\u4E09\u6B21\u63D0\u4EA4\uFF1A</p><p><img src="https://img-blog.csdnimg.cn/20210312161614379.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTEzNTI5ODg=,size_16,color_FFFFFF,t_70" alt="\u5728\u8FD9\u91CC\u63D2\u5165\u56FE\u7247\u63CF\u8FF0"></p><p>\u7531\u4E8E\u67D0\u4E9B\u539F\u56E0\uFF0C\u5728\u4E00\u756A\u64CD\u4F5C\u4E4B\u540E\uFF08\u5DE5\u4F5C\u533A\u6709\u4E00\u4E9B\u66F4\u65B0\u8FD8\u672A\u63D0\u4EA4\uFF09\u6211\u4EEC\u9700\u8981\u56DE\u5230\u7248\u672C <code>commit 06818...</code>\u3002\u8FD9\u65F6\uFF0C\u6211\u4EEC\u53EF\u4EE5\u8FD9\u6837\uFF1A</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">git reset --soft 06818</span></span>
<span class="line"></span></code></pre></div><p>\u8FD9\u4F1A\u4FDD\u7559\u672C\u5730\u672A\u63D0\u4EA4\u7684\u4FEE\u6539\uFF0C\u540C\u65F6\u5C06\u672A\u4FEE\u6539\u7684\u6587\u4EF6\u9000\u56DE\u5230 06818 \u7248\u672C\u3002</p><p>\u6211\u4EEC\u4E5F\u53EF\u4EE5\uFF1A</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">git reset --hard 06818</span></span>
<span class="line"></span></code></pre></div><p>\u8FD9\u6837\u4F1A\u5E72\u6389\u672C\u5730\u6240\u6709\u4FEE\u6539\uFF0C\u76F4\u63A5\u9000\u56DE 06818 \u7248\u672C\u3002</p><p>\u4F46\u6709\u65F6\uFF0C\u6211\u4EEC\u53EA\u60F3\u5E72\u6389\u4E2D\u95F4\u7248\u672C\uFF0C\u8FD9\u65F6\u53EF\u4EE5\u901A\u8FC7\uFF1A</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">git revert d89ff</span></span>
<span class="line"></span></code></pre></div><p>\u8FD9\u6837\u4F1A\u89E6\u53D1\u4E00\u6B21\u65B0\u7684\u63D0\u4EA4\uFF0C\u53EA\u53BB\u9664\u67D0\u6B21\u6307\u5B9A\u7684\u63D0\u4EA4\u3002</p>`,105),p=[l];function o(i,c,d,r,h,g){return e(),s("div",null,p)}const m=a(t,[["render",o]]);export{b as __pageData,m as default};