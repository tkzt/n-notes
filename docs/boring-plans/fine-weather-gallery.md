---
title: 一个基于 Vue3 & Vite 的相册应用
titleTemplate: Boring Plans
---

# 一个基于 Vue3 & Vite 的相册应用

由于有若干个能拍照的设备，再加上时间会公平地杀死一切，我每年都会拍出几张回看时**感慨万千**的照片。

但由于时间与地域的关系，这些照片往往要么丢失，要么被随意塞在网盘的某处。于是，现在 _（2022-11-28）_ 我决心花一些精力把它们维护起来。

## 首先

经过约 **0.37s** 的思考，我决定构建一个 `SPA` 来收纳这些图片。不一会儿，一个具象的 SPA 在脑海里浮现：

- 分为缩略、详情两种展示状态
- 图片属性包括
    - 名称
    - 拍摄时间
    - 拍摄地点
    - 一些描述
- 缩略展示时
    - 初始不展示图片属性
    - 悬浮时暗角遮罩层、属性显示
        - 属性分三层展示：名称、地点 & 时间、描述
        - 描述超出宽度时呈 Ellipsis 效果
        - 属性绝对定位到左下角
    - 悬浮时图像卡片整体稍微增大
    - 采用瀑布流布局
- 点击缩略图片进入详情
    - 详情页分为两部分：
        - 图片部分
            - 占大部分空间
            - 图片以 `object-fit: contain` 的方式自适应在容器里 
        - 属性部分
            - 占少部分空间
            - 没有描述时添加默认值
    - 支持快捷键操作：
        - 左右翻页
        - `ESC` 退出详情
    - `backdrop-filter` 的浸透、模糊效果拉满
- 响应式调整
- 适配暗黑主题

同时，我想出一个~~炫酷~~简陋的 Logo：

<p align="center">
    <img src="https://images.tkzt.cn/blog/fine-weather-gallery.png" width="37%" />
</p>

## 接着

接着就进入奋力编码的阶段了。

### 缩略展示

<br />

#### 图像卡片

最终，每个卡片大致长这样：

<p align="center">
    <img src="https://images.tkzt.cn/blog/fwg-image-card.gif" />
</p>

是的，这很简单：

```html
<div class="container">
    <img :src="src" @mouseenter="mask = true"/>
    <div class="mask" v-if="mask" @mouseleave="mask = false">
        <div class="info">
            <h3>{{ title }}</h3>
            <p>
                <span v-if="location">
                    <i class="fas fa-map-marker-alt"></i>
                    {{ location }}
                </span>
                <span v-if="year">
                    <i class="fas fa-clock"></i>
                    {{ year }}
                </span>
            </p>
            <p>{{ description }}</p>
        </div>
    </div>
</div>
```

遮罩层暗角所依赖的样式：

```css
background: radial-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%),
            radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.3) 166%);
```

出于一些没有意义的执着，我还想要个 **Loading** 效果，最好能和每次打开 [unsplash](https://unsplash.com/) 看到的一样。经过不懈努力，我终于发现了 [blurha.sh](https://blurha.sh/)，一个用来生成模糊化占位图的不二之选。

<p align="center">
    <img src="https://images.tkzt.cn/blog/fwg-blurha-intro.png" />
</p>

它可以将任意图片，编码成形如 `UCIrKH4.x^E09H~X%KNF~XITRjxbxoM{kER%` 的一串 Hash 值，反向构建时，需先将此值解码成指定大小的图片，在 Canvas 中拉伸后即可得到一个理想的模糊化占位图。解码、渲染大致就像这样：

```js
import { decode } from 'blurhash';

const pixels = decode(props.blurHash.encoded, 32, 32);
const ctx = skeletonRef.value.getContext('2d');
const imageData = ctx.createImageData(32, 32);
imageData.data.set(pixels);
ctx.putImageData(imageData, 0, 0);
```

最终，卡片组件变成这样：

```html
<div class="container">
    <Transition mode="out-in">
        <Suspense>
        <template #default>
            <ImageAsync :src="src" @mouseenter="mask = true" />
        </template>
        <template #fallback>
            <canvas class="skeleton" ref="skeletonRef" width="32" height="32"></canvas>
        </template>
        </Suspense>
    </Transition>
    <div class="mask" v-if="mask" @mouseleave="mask = false">
        <div class="info">
            <h3>{{ title }}</h3>
            <p>
            <span v-if="location">
                <i class="fas fa-map-marker-alt"></i>
                {{ location }}
            </span>
            <span v-if="year">
                <i class="fas fa-clock"></i>
                {{ year }}
            </span>
            </p>
            <p>{{ description }}</p>
        </div>
    </div>
</div>
```

其中的异步图片组件：

```html
<template>
    <img :src="src" />
</template>

<script setup>
import { unref } from 'vue'

const props = defineProps({
  src: String,
});

// using another `img` element instead of directly fetching the `src`
// is in order to make sure only one request will be sent.
const img = new Image();
img.src = unref(props.src);
await new Promise((resolve) => {
  img.onload = () => {
    resolve();
  };
});
</script>
```

效果大概是这样的：

<p align="center">
    <img src="https://images.tkzt.cn/blog/fwg-loading.gif" />
</p>

That's cool.

#### 瀑布流

缩略时的整体布局大致如下：

```html
<main>
    <article>
        <ImageCard 
            class="cell" 
            v-for="img, index in images" 
            :key="index" 
            v-bind="img"
            @click="openDetail(index)"
        />
    </article>
    <footer class="caption"></footer>
</main>
```

当然，还要佐之一些 CSS 魔法：

```css
article {
  padding: 24px;
  column-count: 4;
  column-gap: 24px;
}

.cell {
  break-inside: avoid;
  margin-bottom: 24px;
}
```

其中 `break-inside: avoid` 很重要。

### 详情展示

详情部分，相对而言要更简单一些，实现主要基于一些老朋友：

- display: flex
- object-fit: contain
- backdrop-filter: saturate(200%) blur(40px)

以及一些新朋友：

- [vueuse](https://vueuse.org/) - 目前仅用到了 `useWindowSize`
- [animate.css](https://animate.style/) - 目前仅在 收起/展开 详情时用了 `slideIn/slideOut`

### 适配

此外，同样出于一些没有意义的执着，我还拙劣地做了一些适配。主要包括：

- 屏幕适配，比如：
    ```css
    @media screen and (min-width: 1400px) {
        article {
            column-count: 4;
        }
    }
    ```
- 深浅主题适配，比如：
    ```css
    @media (prefers-color-scheme: dark) {
        .preface {
            background-color: #343434;
            color: rgba(255, 255, 255, .78);
        }
    }
    ```

## 最后

正如前面所言，原图已不易寻觅，目前所得的一些图片大多来自微信朋友圈或微博，很遗憾图片质量已损失太多。

而这些图片拍时多是好天气，所以干脆统称这些照片为 **「一些晴朗的日子」**。
    
图片目前采用 **Github & <a target="_blank" class="link" href="https://vercel.com/">Vercel</a>** 来托管，感谢这个伟大的时代。

相册在[这里](https://fine-weather-gallery.tkzt.cn/)。

That's it.