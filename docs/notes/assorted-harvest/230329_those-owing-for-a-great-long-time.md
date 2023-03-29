---
title: 2022 掉落拾取一
titleTemplate: 掉落
date: 2023-03-29
---

## 前言

由于懒惰，从去年下半年到现在，WorkFlowy 里堆积了若干条 `torecord` 项，是时候清掉它们了。

## 正文

### Commit Convention

规范具体参考 [conventional-commits](https://www.conventionalcommits.org/)，在此只罗列一些主要的提交类型：

- feat: 新功能
- fix: 问题修复
- docs: 文档更新
- style: 样式更新（代码风格、组件等）
- refactor: 不影响功能的重构
- perf: 性能优化
- test: 测试相关
- build: 构建相关（以及依赖项更新）
- ci: 持续集成相关
- revert: 还原、回退
- chore: 其他

### overflow: auto 遇上 display: flex

具体见这：

<iframe height="500" style="width: 100%;" scrolling="no" title="overflow-auto_flex_1" src="https://codepen.io/boring-plans/embed/oNPOeey?default-tab=html%2Cresult&theme-id=light" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/boring-plans/pen/oNPOeey">
  overflow-auto_flex_1</a> by Allen Tao (<a href="https://codepen.io/boring-plans">@boring-plans</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

可以看出，由于**某些原因**首个 **inner** 的一部分无法被显示，对此我们可以加一层嵌套，没有什么是一层嵌套解决不了的：

<iframe height="500" style="width: 100%;" scrolling="no" title="overflow-auto_flex_2" src="https://codepen.io/boring-plans/embed/KKxYvRg?default-tab=html%2Cresult&theme-id=light" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/boring-plans/pen/KKxYvRg">
  overflow-auto_flex_2</a> by Allen Tao (<a href="https://codepen.io/boring-plans">@boring-plans</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

时间过得很快，转眼你就要离开，正当你就要走时，你无意间给 **container** 加了个 **padding**，于是：

<iframe height="500" style="width: 100%;" scrolling="no" title="overflow-auto_flex_3" src="https://codepen.io/boring-plans/embed/BaOEdEo?default-tab=html%2Cresult&theme-id=light" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/boring-plans/pen/BaOEdEo">
  overflow-auto_flex_3</a> by Allen Tao (<a href="https://codepen.io/boring-plans">@boring-plans</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

F**k，这不是你要的滑板鞋！

没有什么是一层嵌套解决不了的，如果有，那再给 **wrapper** 加个固有宽度：

<iframe height="500" style="width: 100%;" scrolling="no" title="overflow-auto_flex_4" src="https://codepen.io/boring-plans/embed/GRXLMNp?default-tab=html%2Cresult&theme-id=light" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/boring-plans/pen/GRXLMNp">
  overflow-auto_flex_4</a> by Allen Tao (<a href="https://codepen.io/boring-plans">@boring-plans</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

这些奇妙现象可以从 [这个回答](https://stackoverflow.com/questions/21515042/scrolling-a-flexbox-with-overflowing-content/21541021#21541021) 感悟到一些端倪，但也只是感悟，只是端倪。F**k，CSS 真有意思。

### display: flex 遇上 text-overflow: ellipsis

当一个 `display: flex` 的元素设置 `text-overflow: ellipsis` 时，我们期待看到的省略号没有出现：

<iframe height="300" style="width: 100%;" scrolling="no" title="flex_ellipsis" src="https://codepen.io/boring-plans/embed/mdGgBGr?default-tab=html%2Cresult&theme-id=light" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/boring-plans/pen/mdGgBGr">
  flex_ellipsis</a> by Allen Tao (<a href="https://codepen.io/boring-plans">@boring-plans</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

对此我们可以加一层嵌套，没有什么是一层嵌套解决不了的：

<iframe height="300" style="width: 100%;" scrolling="no" title="flex_ellipsis_1" src="https://codepen.io/boring-plans/embed/poOBdRY?default-tab=html%2Cresult&theme-id=light" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/boring-plans/pen/poOBdRY">
  flex_ellipsis_1</a> by Allen Tao (<a href="https://codepen.io/boring-plans">@boring-plans</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

##

未完待续。