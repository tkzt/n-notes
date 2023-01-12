---
title: Ace Editor 获取选中内容
titleTemplate: 那些杀不死我的
date: 2021-12-27
---

## Preface

上回书说到目前正在基于 ACE DIY 一个 SQL 编辑器。今天开发涉及到 获取选中内容 的模块的时候发现 ACE 获取选中内容，并不像直觉猜想的那样。

直接上代码。

## Show Code

省略初始化编辑器等等操作。

```js
getSelectedContent() {
  const range = this.editor.getSelectionRange();
  return this.editor.session.getTextRange(range);
},
```

主要是想和 ACE 提供出来的 `getSelection` 区分一下，该函数返回的是一个所谓的 `Selection`
实例。

## Reference

- [Ace Editor get current selected line number and text](https://stackoverflow.com/questions/24906120/ace-editor-get-current-selected-line-number-and-text)
