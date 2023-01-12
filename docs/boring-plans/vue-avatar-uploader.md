---
title: 一个简单的 Vue 头像选择器
titleTemplate: Boring Plans
date: 2021-08-31
---

## Preface

项目中需要一个头像选择器，但经过调研，市面上的头像选择器（或者图片截取器）一方面风格固定，无法所用组件库风格融合，另一方面，为了做到尽善尽美，大家为选择器预设了许许多多的属性，这对于选择器本身而言是一种增强的效果，但对于具体的项目而言有些过重。于是实现一个简单、可定制（通过 slots）的头像选择器的想法诞生。

## Example

不融入任何组件库时，头像选择器长这样：

![plain](https://img-blog.csdnimg.cn/20878decafe542a6814741094aed5e38.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6Zm26Iqx5byA,size_20,color_FFFFFF,t_70,g_se,x_16)

在 vuetify 中，定制后：

![in-vuetify](https://img-blog.csdnimg.cn/f270275480304ea0affc6e948528e4c9.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6Zm26Iqx5byA,size_20,color_FFFFFF,t_70,g_se,x_16)

## Principle & Implement

原理上这个小组件没有任何技术含量：通过 flex 布局排列图像编辑区域与操作按钮区域、通过 boxShadow 实现遮罩层、通过更新 backgroundPosition 实现图片的移动、通过 `canvas.toDataUrl` 导出图片等等。

而定制化诸如 slider、button 等组件基于一系列 `slots` 以及组件 `props`，具体见[此文档](https://github.com/taoqingqiu/vue-plain-avatar-uploader/tree/main/src/components)。
