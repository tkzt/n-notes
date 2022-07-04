---
title: 2021 年 5 月前端造火箭副本掉落
titleTemplate: Stereotyped
---
# 2021 年 5 月前端造火箭副本掉落


## JavaScript 基础

### 存储函数实现 sum

::: info 实现如下 sum 函数:
sum(1)(2)(3)() => 6
:::

```js
function sum(n) {
  if (this.m) {
    this.m += n || 0;
  } else {
    this.m = n;
  }
  if (!n) {
    const res = this.m;
    this.m = 0;
    return res;
  } else {
    return sum;
  }
}
console.log(sum(1)(2)(3)(4)(5)(6)()); // 21
```

## HTML&CSS 基础

### Flex 布局

#### 基本概念

Flex 布局是 2009 年 W3C 提出的一种新的布局方式，通过它，可以实现传统的 `display+position+float` 不易实现的一些布局。

所谓 Flex 是 Flexible Box 的简写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。在 Flex 布局中，父元素被称为 container，其中子元素被称为 item，Flex 布局中的其他基本概念如下：

![](/flex.png)

#### Container 的属性

##### flex-direction

该属性决定主轴的方向，即 container 内 item 的排列方向，它可以取值：

- `row` ( default ) - 主轴为水平方向，起点在左端
- `row-reverse` - 主轴为水平方向，起点在右端
- `column` - 主轴为垂直方向，起点在上沿
- `column-reverse` - 主轴为垂直方向，起点在下沿

##### flex-wrap

该属性决定了，contianer 内 item 的换行策略（默认情况下，items 排布成一排），它可以取值：

- `nowrap` ( default ) - 不换行
- `wrap` - 向下换行，常规意义上的换行
- `wrap-reverse` - 向上换行，新的一行在旧行上方

##### flex-flow

该属性是 `flex-direction` 和 `flex-wrap` 的简写，它的取值可以表示为 `<flex-direction> || <flex-wrap>`

##### justify-content

该属性决定了，items 在主轴（一般来说即水平方向）的对齐策略，它可以取值：

- `flex-start` ( default ) - 左对齐
- `flex-end` - 右对齐
- `center` - 居中对齐
- `space-between` - 两端的 item 分别靠在边上，items 等间隔分布（多余的空间平均分配在 items 间隙中）
- `space-around` - 将多余的空间平均分配到每个 item 周围，items 均衡地分布在 container 中

##### align-items

该属性决定了，items 在交叉轴（一般来说即竖直方向）的对齐策略，它可以取值：

- `flex-start` - 上对齐
- `flex-end` - 下对齐
- `center` - 居中对齐
- `baseline` - 依据 items 内，第一行文字底部（基线）对齐
- `stretch` ( default ) - 如果 items 未设置高度或设为 auto，将占满整个容器的高度

##### align-content

顾名思义，每一行的 items 我们可以把它们看做竖直方向上的一个 content，由此，我们可以知道 `align-content` 属性决定了 container 中多行 items 的竖直方向的对齐策略。它可以取值：

- `flex-start` - 上对齐
- `flex-end` - 下对齐
- `center` - 居中对齐
- `space-between `- 可以类比于 justify-content 的同名值
- `space-around` - 可以类比于 justify-content 的同名值
- `stretch` ( default ) - 可以类比于 align-items 的同名值，通过扩展每一行的方式，去均分竖直方向上多出来的空间

#### Item 的属性

##### order

顾名思义，该属性决定了 item 在 container 中的顺序，它取值数字。

##### flex-basis、flex-grow、flex-shrink

首先，`flex-basis` 决定了 item 在主轴上占据的空间（或者说长度）。

当 item 需要扩展以撑满剩余空间的时候，若所有 items 的 flex-grow 都是 `1` 则大家平分剩余空间；若某一个 item 的 flex-grow 是 2，其余的为 1，则该 item 分得的空间是其余 items 的 2 倍；若某一个 item 的 flex-grow 为 0，则其不参与剩余空间的平分。而 0 为 flex-grow 的默认值。

而 flex-shrink 则用于当 items 的 flex-basis 综合起来超过主轴最大长度时，反映 items 间缩小比例。其取值情况与 flex-grow 类似，默认为 1，即 items 同比缩小。

##### flex

`flex` 属性是上述三个属性的简写，其取值 `<flex-grow> <flex-shrink> || <flex-basis> `。

##### align-self

该属性可以使某个（些） item(s) 的交叉轴对齐方式，不遵守 container 的 align-items 值，其可以取值：`auto | flex-start | flex-end | center | baseline | stretch`。其默认值为 auto，即遵守 container 的 align-items 值。当没有 container 时，该属性取值 auto 等同于 stretch。

### div 魔改三角形

```html
<div class="foo"></div>
<style>
  .foo {
    width: 0px;
    height: 0px;
    border-top: 100px solid blue;
    border-left: 100px solid transparent;
    border-right: 100px solid transparent;
    border-bottom: 100px solid transparent;
  }
</style>
```

## 其他

### 跨域请求

#### 何为跨域

之所以讨论跨域问题，其本质是因为现代浏览器出于安全性考量，对资源请求存在 `同源策略`。只有当 `协议（http/https）、域名、端口` 均一致时，才能联通资源。跨域请求并不是无法发出，跨域请求请求到的资源返回回来时，由于不同源，被浏览器拦截了。

同源策略限制包括：

- cookie、LocalStorage 等存储性质的资源
- DOM 元素
- AJAX 请求需同源才可以发送

但 `img` 、`link` 、`script` 三个标签是允许跨域加载的。

#### 跨域解决方案

- 通过 jsonp 跨域（本质是利用 script 标签无同源策略限制，通过动态添加 script 元素方式实现跨域，这种方式只能实现 get 请求（因为参数需要直接传递））
- 跨域资源共享（CORS），即服务端设置 `Access-Control-Allow-Origin` 即可。若要带 cookie 请求，则前后端都需要设置
- nginx 配置反向代理

### get 与 post

最直观的区别就是 GET 把参数包含在 URL 中，POST 通过 request body 传递参数。

细说的话，GET 在向服务端请求时，将请求头和数据一并发送， POST 则先发送请求头，而后 Request Body。

### 分别从前端、后端、数据库阐述 web 项目的性能优化

#### 前端优化

- 减少 http 请求
- 优先渲染 html/css，js 最后执行

#### 后端优化

- 缓存存储读写次数高的数据
- 耗时操作异步方式执行
- 代码优化，避免循环和判断次数太多，如果多个 if else 判断，有限判断最有可能先发送的情况

#### 数据库优化

- 选择合适的数据库，如果有条件，数据可以存放于 redis，读取速度块。
- 建立索引、外键等

## Reference

- [分别从前端、后端、数据库阐述 web 项目的性能优化](https://blog.csdn.net/weixin_40576010/article/details/88975571)
- [Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?ivk_sa=1024320u)
- [前端常见跨域解决方案（全）](https://segmentfault.com/a/1190000011145364)
