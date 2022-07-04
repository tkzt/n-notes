---
title: 简单魔改网页滚动条
titleTemplate: 掉落
---
# 简单魔改网页滚动条

## Preface

定制网页滚动条样式是很常见的业务需求。

## Analysis

众所周知：
![在这里插入图片描述](https://img-blog.csdnimg.cn/9a46e911c3b34e2a87eeb886104bc41e.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zm25riF56eL,size_20,color_FFFFFF,t_70,g_se,x_16)

## Show Code

通过以下样式，可以将滚动条魔改成上述图中的样子：

```css
::-webkit-scrollbar {
  width: 13px;
  height: 13px;
}
::-webkit-scrollbar-thumb {
  border-radius: 1em;
  background-color: rgba(50, 50, 50, 0.28);
  border: 3px solid transparent;
  background-clip: content-box;
}
::-webkit-scrollbar-track {
  background-color: rgba(50, 50, 50, 0.06);
}
::-webkit-scrollbar-corner {
  background-color: rgba(50, 50, 50, 0.06);
}
```

其中需要注意的是，thumb 的宽度是无法设置的，为了实现 thumb 悬浮的效果，为 thumb 设置了透明的 border。而默认的 `background-clip` 是 `border-box` 的，这意味着背景会蔓延到边框下，这样同样是无法呈现悬浮效果的，于是将其设置成为 `content-box` 限制背景区域仅为内容区。

## Reference

- [background-clip](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-clip)
