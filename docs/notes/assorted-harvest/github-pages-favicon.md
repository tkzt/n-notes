---
title: Github Pages Page Favicon 不显示解决
titleTemplate: 掉落
date: 2021-05-04
---

## 概述

为了爱与正义，陶某将原本托管在 [Gitee](https://gitee.com/) 的博客，转移到了 Github。转移后，发现原本正常显示的 favicon 不显示了，这很诡异。

## 解决

在尝试多种解决方案后，终于发现最优解：`在 faviocn 图标的路径后加一半角问号`。即改：

```html
<link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon" />
```

为：

```html
<link rel="shortcut icon" href="/images/favicon.ico?" type="image/x-icon" />
```

## 参考

- [Github Pages website favicon not showing](https://stackoverflow.com/questions/46163065/github-pages-website-favicon-not-showing)
