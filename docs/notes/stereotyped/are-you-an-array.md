---
title: Are you an array ?
titleTemplate: Stereotyped
date: 2022-11-06
---

## Preface

最近要年度总结，穿梭在各个 Confluence 文档之中，忽逢一《02_07 面试题》，阅读之，乃一“如何判断一个变量是数组”问题是也。

由于只知道其中部分方法，这意味着法强不够，特此记录。

- Array.isArray(foo)

- toString.call(foo) === '[object Array]'

- Object.prototype.toString.call(foo) === '[object Array]'

- foo instanceof Array

- foo.constructor === Array

- foo.constructor.name === 'Array'

## What's More

另外顺便贴一下昨晚偶然看到的八股文：

```js
const foo = ["1", "2", "3"];
const bar = foo.map(parseInt);
```

`bar` 的值是：

```
[1, NaN, NaN]
```

这是因为，`parseInt` 的第二个参数是 `radix`，理论上取值 `2-36`，ES 5 规定传 0 或不传按 10 进制来转换。
