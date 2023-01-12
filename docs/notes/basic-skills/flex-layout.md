---
title: Flex 布局新认知
titleTemplate: 军体拳
date: 2021-11-08
---

## Preface

在[上次](/notes/stereotyped/2021-05-begging-for-a-job-record)详细看了一波 Flex 布局之后，在项目中一直有使用 Flex 布局，但是过程中，对 `justify-items`、`justify-content`、`align-items`、`align-content` 偶有困惑，于是针对着解了一把心结。

## justify-items & justify-content

### justify-items

简单来说（摘自[developer.mozilla.org](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-items)）：

> CSS 的 justify-items 属性为所有盒中的项目定义了默认的 justify-self ， 可以使这些项目以默认方式沿适当轴线对齐到每个盒子。

而需要注意的是，在弹性盒子中，justify-items 属性会被忽略。

### justify-content

有了对 `justify-items` 的上述认识后，`justify-content` 则很容易拎得清，但由于 `flex-grow` 默认都是 0，所以想要 `justify-content` 生效，还需要指定元素的 `flex-grow`，你比如：

```html
<div
  style="display: flex; height: 50px; width: 400px; background-color: brown; justify-content: stretch;"
>
  <div
    style="height: 40px; flex-basis: 40px; background-color: rgb(182, 143, 143);margin: 5px; flex-grow: 2;"
  >
    1
  </div>
  <div
    style="height: 40px; flex-basis: 40px; background-color: rgb(182, 143, 143);margin: 5px; flex-grow: 1;"
  >
    2
  </div>
  <div
    style="height: 40px; flex-basis: 40px; background-color: rgb(182, 143, 143);margin: 5px;"
  >
    3
  </div>
  <div
    style="height: 40px; flex-basis: 40px; background-color: rgb(182, 143, 143);margin: 5px;"
  >
    4
  </div>
  <div
    style="height: 40px; flex-basis: 40px; background-color: rgb(182, 143, 143);margin: 5px;"
  >
    5
  </div>
</div>
```

效果如下：

<div style="display: flex; height: 50px; width: 400px; background-color: brown; justify-content: stretch;">
    <div style="height: 40px; flex-basis: 40px; background-color: rgb(182, 143, 143);margin: 5px; flex-grow: 2;">1</div>
    <div style="height: 40px; flex-basis: 40px; background-color: rgb(182, 143, 143);margin: 5px; flex-grow: 1;">2</div>
    <div style="height: 40px; flex-basis: 40px; background-color: rgb(182, 143, 143);margin: 5px;">3</div>
    <div style="height: 40px; flex-basis: 40px; background-color: rgb(182, 143, 143);margin: 5px;">4</div>
    <div style="height: 40px; flex-basis: 40px; background-color: rgb(182, 143, 143);margin: 5px;">5</div>
</div>

## align-items & align-content

在某个弹性盒子内，在设置了 `flex-wrap: wrap` 后，有多行 items，`align-content` 可用于决定在竖直方向如何分空间，可以是：

- start - 多行都分布在盒子上方，不管剩余的空间
- end - 多行都分布在盒子下方，不管剩余的空间
- center - 多行都分布在盒子中间，不管剩余的空间
- space-between - 剩余空间分布在多行之间，头、尾的上、下没有空间
- space-around - 剩余空间分布在多行四周，头、尾的上、下也有空间
- stretch - 各行均匀地吃掉剩余空间，这是默认效果

而 `align-items` 则决定了每一行在分到的空间内的对齐方式，可以是 start、end、center、stretch（默认）。由此可见，只有当 `align-content` 为 stretch 时，`align-items` 的 `flex-start`、`center`、`flex-end` 效果才能出来。

有了以上认知，则可以很好理解为何：

```html
<div
  style="display: flex; height: 200px; width: 400px; background-color: brown; flex-wrap: wrap; align-items: stretch; align-content: stretch;"
>
  <div
    style="flex-basis: 390px; min-height: 40px; background-color: rgb(182, 143, 143);margin: 5px;"
  >
    1
  </div>
  <div
    style="flex-basis: 390px; background-color: rgb(182, 143, 143);margin: 5px;"
  >
    2
  </div>
  <div
    style="flex-basis: 390px; background-color: rgb(182, 143, 143);margin: 5px;"
  >
    3
  </div>
</div>
```

长这样：

<div
  style="display: flex; height: 200px; width: 400px; background-color: brown; flex-wrap: wrap; align-items: stretch; align-content: stretch;"
>
  <div style="flex-basis: 390px; min-height: 40px; background-color: rgb(182, 143, 143);margin: 5px;">1</div>
  <div style="flex-basis: 390px; background-color: rgb(182, 143, 143);margin: 5px;">2</div>
  <div style="flex-basis: 390px; background-color: rgb(182, 143, 143);margin: 5px;">3</div>
</div>

而：

```html
<div
  style="display: flex; height: 200px; width: 400px; background-color: brown; flex-wrap: wrap; align-items: flex-end; align-content: stretch;"
>
  <div
    style="flex-basis: 390px; height: 40px; background-color: rgb(182, 143, 143);margin: 5px;"
  >
    1
  </div>
  <div
    style="flex-basis: 390px; background-color: rgb(182, 143, 143);margin: 5px;"
  >
    2
  </div>
  <div
    style="flex-basis: 390px; background-color: rgb(182, 143, 143);margin: 5px;"
  >
    3
  </div>
</div>
```

长这样：

<div
  style="display: flex; height: 200px; width: 400px; background-color: brown; flex-wrap: wrap; align-items: flex-end; align-content: stretch;"
>
  <div style="flex-basis: 390px; min-height: 40px; background-color: rgb(182, 143, 143);margin: 5px;">1</div>
  <div style="flex-basis: 390px; background-color: rgb(182, 143, 143);margin: 5px;">2</div>
  <div style="flex-basis: 390px; background-color: rgb(182, 143, 143);margin: 5px;">3</div>
</div>
