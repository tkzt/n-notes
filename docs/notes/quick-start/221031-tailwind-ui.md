---
title: Tailwind CSS 分享
titleTemplate: Quick Start
date: 2022-11-03
---

## What is Tailwind CSS

- [NPM Downloads Trending](https://npmtrends.com/tailwindcss)
<p align="center">
  <img alt="Npm Downloads" src="https://lc-gluttony.s3.amazonaws.com/n06TKNQNbYo8/ykq3da4raOFI3WgS3fh31ANYuryHkwhR/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20221031162812.png" width="80%" style="border-radius: 12px;" />
</p>

- Official Definition

> A utility-first CSS framework for rapidly building custom user interfaces.

### Utility First

`Utility First` 这个概念是相对于 `Semantic First` 而言的。后者即通过多个样式共同构建出描述特征、具有含义的某个类的常规用法。

举个例子，常规语义化表达下的一个朴素的卡片：

<iframe height="300" style="width: 100%;" scrolling="no" title="Card Example" src="https://codepen.io/boring-plans/embed/mdKezVd?default-tab=css%2Cresult&editable=true&theme-id=light" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/boring-plans/pen/mdKezVd">
  Card Example</a> by Allen Tao (<a href="https://codepen.io/boring-plans">@boring-plans</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

而使用 Tailwind CSS：

<iframe height="300" style="width: 100%;" scrolling="no" title="Card Example Tailwind" src="https://codepen.io/boring-plans/embed/wvXKYvG?default-tab=html%2Cresult&editable=true&theme-id=light" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/boring-plans/pen/wvXKYvG">
  Card Example Tailwind</a> by Allen Tao (<a href="https://codepen.io/boring-plans">@boring-plans</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

从这个例子中可以看出，Tailwind CSS 不再强调 Class 的语义性，而是提供尽可能原子化的工具类，让用户能基于此，以一种搭积木的方式快速组装样式，构建组件、页面。

何为原子化？👇

<p align="center">
  <img src="https://lc-gluttony.s3.amazonaws.com/n06TKNQNbYo8/aqdcX1qrATGRUU11Gf9Loaxba0afoGOm/Snipaste_2022-10-31_21-24-24.png" width="80%" style="border-radius: 12px;" />
</p>

从中不难看出，最终每一个 Class 大都仅包含一条既定样式，这也是所谓“积木”的含义。

### CSS Framework

简单来说，我们可以把样式的表达形式按照细粒度分为：

- 内联

```html
<div
  style="border: 1px solid #f0f0f0; border-radius: 8px; color: #a0a0a0"
></div>
```

- 原子化

```html
<div class="rounded border text-[#a0a0a0]"></div>
<style>
  .rounded {
    border-radius: 8px;
  }

  .border {
    border: 1px solid #f0f0f0;
  }

  .text-\[\#a0a0a0\] {
    color: #a0a0a0;
  }
</style>
```

- 语义化

```html
<div class="card card-text"></div>
<style>
  .card {
    border: 1px solid #f0f0f0;
    border-radius: 8px;
  }

  .card-text {
    color: #a0a0a0;
  }
</style>
```

- 组件化

```html
<Card text-color="#a0a0a0" />
```

从上到下样式的细粒度逐渐增加，灵活度变弱，封装程度变高。目前来说，大多数流行的 UI 框架，比如 Ant Design, Vuetify, Element UI 等等，都更侧重于提供开箱即用的组件（虽然同时也许也会提供一系列 Utility Class，比如 Vuetify 中的 `d-flex` 表示 `display: flex` 等），本质上属于 UI 组件库。

而 Tailwind CSS 则侧重于提供细粒度更小的原子类，致力于构建纯粹的 CSS 框架，这并不是说 Tailwind CSS 在做一种反组件化的逆行操作，正如其官网所言，它仍然是 `Component Driven` 的，更准确地说，它服务于组件化，能够帮助人们更快速、便捷地进行组件封装。

举个例子，当我们想要在一个 Vue 项目中，封装一个 Button 通用组件：

<iframe src="https://stackblitz.com/edit/vue-hudquh?embed=1&file=src/components/Button.vue&hideNavigation=1" width="100%" scrolling="no" title="Button Example Tailwind" frameborder="no" height="400"/>

不使用前端框架时（Bootstrap Be Like）：

```html
<button class="btn btn--primary">Primary Button</button>
<style>
  .btn {
    @apply text-base font-medium rounded-lg p-3;
  }

  .btn--primary {
    @apply bg-sky-500 text-white;
  }
</style>
```

## Features

### 完备的设计系统

<iframe height="300" style="width: 100%; margin: 16px 0;" scrolling="no" title="Button Example Vue" src="https://codepen.io/boring-plans/embed/eYKJvQW?default-tab=html%2Cresult&editable=true&theme-id=light" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/boring-plans/pen/eYKJvQW">
  Button Example Vue</a> by Allen Tao (<a href="https://codepen.io/boring-plans">@boring-plans</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

#### Sizing

约定了一些取值，以宽度为例：

- w-0 - 表示 0px
- w-px - 表示 1px
- w-数字 - 1 单位表示 0.25 rem
- w-1/2, w-1/3, w-1/4, w-1/5, w-1/6, w-1/12 - 表示比例

特殊地：

- w-full - `width: 100%`
- w-screen - `width: 100vw`
- w-min - `width: min-content`
- w-max - `width: max-content`
- w-fit - `width: fit-content`

#### Colors

<p align="center">
  <img src="https://lc-gluttony.s3.amazonaws.com/n06TKNQNbYo8/PN747zOhHOkhcEJJoHPfwzRt3Db334HE/Snipaste_2022-11-01_16-35-06.png" width="80%" style="border-radius: 12px;" />
</p>

预设了许多 Color Palette，并可以通过约定的数值标识深浅度。可以广泛使用在各种颜色定制场景，比如：

```html
<div class="text-sky-500 bg-violet-100 border-white"></div>
```

#### Typography

```html
<div class="text-center underline decoration-slate-500 decoration-4"></div>
```

#### Shadows

```html
<div class="shadow-sm"></div>
```

#### 布局

<br />
<iframe height="700" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/boring-plans/embed/VwdeWKj?default-tab=html%2Cresult&editable=true&theme-id=light" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/boring-plans/pen/VwdeWKj">
  Untitled</a> by Allen Tao (<a href="https://codepen.io/boring-plans">@boring-plans</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
<br />

#### 渐变、动画

<br />
<iframe height="300" style="width: 100%;" scrolling="no" title="Transition &amp; Animation Example Tailwind" src="https://codepen.io/boring-plans/embed/qBKbpLY?default-tab=html%2Cresult&editable=true&theme-id=light" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/boring-plans/pen/qBKbpLY">
  Transition &amp; Animation Example Tailwind</a> by Allen Tao (<a href="https://codepen.io/boring-plans">@boring-plans</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
<br />

#### ...

[Tailwind CSS Document](https://tailwindcss.com/docs/)

### States & Arbitrary Values

上文有提到 **Tailwind CSS 不再强调 Class** 的语义性，然而换一种理解方式，它其实设计出了一套更细节、约定性更强的语义化表达规范。比如 `w-1`，我们虽然无法从中得知“这是一个卡片”，但大致可以看出这是“这表示 1 单位的宽度”的意思。

从原理上来讲，Tailwind CSS 的 Utility First 实际是借助 HTML Class 实现了一门最终会被构建成符合规范的 CSS 样式声明的 `DSL (Domain Specific Language)`，得益于现代化前端工具链，这门 DSL 甚至可以携带自定义数值，这极大程度增加了可玩性。

#### 状态控制

<br />
<iframe height="300" style="width: 100%;" scrolling="no" title="States Example Tailwind" src="https://codepen.io/boring-plans/embed/QWxyQGd?default-tab=html%2Cresult&editable=true&theme-id=light" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/boring-plans/pen/QWxyQGd">
  States Example Tailwind</a> by Allen Tao (<a href="https://codepen.io/boring-plans">@boring-plans</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
<br />

#### Arbitrary Values

上文提到的带数值表达，都可以带上自定义值，以 `Shadow` 为例：

```html
<div class="shadow-[0_0_10px_10px_#faa] w-[20px] h-[20px] bg-orange-400"></div>
```

#### 视觉断点控制

<br />
<iframe src="https://stackblitz.com/edit/vue-cmfcp2?embed=1&file=src/App.vue&hideNavigation=1" width="100%" scrolling="no" title="Button Example Tailwind" frameborder="no" height="400"/>

### Customization

```js
module.exports = {
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      blue: "#1fb6ff",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
    },
    extend: {
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
};
```

或者通过 `@layer` 以及 `@apply` 指令，基于 Tailwind CSS 变量来自定义：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .my-atomic {
    @apply rounded-b-lg shadow-md;
  }
}
```

### 最终体积极小

> Tailwind automatically removes all unused CSS when building for production, which means your final CSS bundle is the smallest it could possibly be. In fact, most Tailwind projects ship less than 10kB of CSS to the client.

## 实践 - 瀑布流卡片

[EMO 云《晴天》评论 API](https://github.com/boring-plans/tailwind-vue-example)

## 总结

### 优点

- 灵活，高度定制化

- 最终 CSS Bundle 极小，加快渲染速度

- 极大减少命名心智负担（类似于行内样式，因为减少了 CSS Selector 这一胶水层）

- 可以节省很多设计方面的心智负担（快速炫页面，也可以联系到官方所说的，让你的开发不必离开 HTML）

### 缺点

- 内容样式强耦合，后期维护方面或存在压力

- 学习成本。Tailwind CSS 本身可以理解为一种推陈出新，若未领略过 **Bootstrap** 时代的风采，需要记忆的点颇多（但官方有推 VSC 插件）

- Class 串稍长 （可以通过 `@apply` 应对，但这种复合、叠加的方式，会生成新的类，增大最终 CSS 体积，这与 Tailwind CSS 本身的设计哲学相左，不建议优先使用。）

Tailwind CSS 尤其适用于一些需要高度定制化的场景，譬如 组件库、门户、博客网站等等。不建议老项目中途迁移到 Tailwind CSS，那将是一场灾难（兼容性、侵入性）。

简单来说，当你开启一个全新的项目，且厌烦了一直使用的组件库的 UI、约束，不妨来拥抱 Tailwind CSS 一下。

## 参考

- [Tailwind CSS 入门和实践](https://zhuanlan.zhihu.com/p/430830277)
- 如何评价 CSS 框架 TailwindCSS？ - 知乎
  - [山月的回答](https://www.zhihu.com/question/337939566/answer/1752928891)
  - [顾轶灵的回答](https://www.zhihu.com/question/337939566/answer/1679260273)

## 推荐访问

- [Trending Tailwind Kits](https://www.tailwindawesome.com/?type=kit)
