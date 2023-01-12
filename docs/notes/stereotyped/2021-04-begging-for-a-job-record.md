---
title: 2021 年 4 月前端造火箭副本掉落
titleTemplate: Stereotyped
date: 2021-04-26
---

## 前言

放飞了近一个月自我后，陶某终于开启了旨在 **begging for a frontend job** 的造火箭副本。而这一过程免不了掉落一些 **知道了可以提升个人信心、装逼法强，不知道倒也无妨** 的八股文。于是在一个温暖的午后，陶某步入星爸爸的大门、在淘宝点了杯朴素的热拿铁、戴上积了许久灰尘的耳机、播放 Mandarin 的《摇篮曲》、着手做些记录。

## JavaScript 基础

### 0.1 + 0.2 问题

众所周知，JavaScript 中，`0.1+0.2=0.30000000000000004`。

JavaScript 中的数字，是按照 IEEE754 标准的 64 位双精度浮点型来实现的。其包含：占 `1` 位的符号 `S`、占 `11` 位的指数、占 `52` 位的尾数。

对于小数而言，其小数点后位数是不定的，为了将任意位数的小数都以二进制妥善存储，我们需周折一番。对于任意正数 x ，我们可以依据 x = a\*2^e 将其科学计数表示为二进制版本，其中 e 表示小数点移动的位数，正往右，负往左。

比如，`30.5` 的二进制表示为 `11110.1`，那么它可以表示为 `1.11101*2^4`。在上述的 64 位双精度表示中，符号位 1 为负、0 为正；指数部分为 e 需要加上固定偏移量 1023 的二进制表示；尾数部分为科学计数后的小数部分（小数部分以前的 1 为固定值，不需在 64 位中体现出来），52 位通过往后补零占满。故，30.5 即为 `0 10000000011 1110100000000000000000000000000000000000000000000000`。

而，0.1 的二进制表示为，`0.000100010001...`，由于精度有限，最终存储下来用于表示 0.1 的，只好是一个非常近似之的值（`0 01111111011 0001000100010001000100010001000100010001000100010001`）。至于 0.2 亦然，那 ``0.1+0.2=0.30000000000000004` 便很好理解了。

### 利用原型实现继承

在 JavaScript 中，每个实例（包括基础类型的和其他引用类型的）都会对应着一个原型对象，通过 `__proto__` 默认属性可以访问。

相似地，我们每创建一个函数的同时，都会在内存中创建一个对应的原型对象，可以通过函数的 `prototype` 属性访问该原型对象（而函数的 `__proto__` 属性则指向 函数类型 的原型对象 `Function`）反之，可以通过原型对象的 `constructor` 属性访问该函数（即该函数为原型对象的构造函数）。而同时，我们又可以从该原型对象创建实例（通过 new 关键字来创建）。你比如：

```js
const foo = function () {
  console.log("foo");
};
foo.prototype; // foo {} // 函数的原型对象
foo.__proto__; // [Function]
const bar = new foo();
bar.__proto__; // foo {}
```

依此，我们可以实现继承（需要注意的是，在构造函数中，需要通过 this 将属性添加到原型上）：

```js
const animal = function () {
  this.speak = function () {
    console.log("speak");
  };
};
const cat = function () {};
cat.prototype = new animal(); // 将 animal 的原型的实例作为 cat 的原型，是为了继承其属性方法的同时，具备自身的域（或者说独立的状态，这样 cat 原型对象状态的改变不会影响 animal 原型的状态）（即不是简单的原型共用（或者说复制））
cat.prototype.constructor = cat; // 不重新指定构造函数的话，由于此前指定了 prototype，cat 的构造函数将是 animal 方法，这有些许不合理
cat.prototype.speak = function () {
  console.log("meow");
}; // 多态
const myCat = new cat();
myCat.speak(); // meow
```

上述在为 cat 指定新原型时，使用的是 `new animal()` 而非 `animal.prototype`，这有着本质区别：前者会从原原型对象创建一个新的实例作为 cat 的原型（而这个实例的原型是原原型），新的实例和原原型对象互不干扰，而后者则直接把原原型对象作为 cat 原型，这样的话根本称不上继承，仅仅是对象的浅层复制罢了。一例以蔽之：

```js
const foo = function () {};
const bar = new foo();
bar == foo.prototype; // false
bar.__proto__ == foo.prototype; // true
bar.name = "bar";
foo.prototype.name = "foo";
bar.name; // bar
bar.__proto__.name; // foo
```

### 闭包

当我们声明某个函数时，该函数与之依赖的上下文（通常而言指一些外部变量们）组成闭包。简言之，闭包像一个包含了某些外部变量和我们所声明的函数的泡泡，这些变量对于泡泡外来说是不可见的，但是我们通过泡泡内的函数去可以访问这些变量。一例以蔽之：

```js
function foo() {
  let a = 12;
  this.bar = function () {
    return ++a;
  };
}
const quz = new foo(); // 创建函数实例，会将 foo 函数作为构造函数去创建实例
quz.a; // undefined // 实例只能访问到挂在 this 上的属性
quz.bar(); // 13 // 虽然 foo 函数内的上下文似乎已不再，但一个 包含了 a 和 bar 的闭包已经创建，a 会被保留在内存中，通过 bar 可以访问 a
```

通过闭包我们可以封装出类似于常规 oop 语言中的私有变量，以便实现一些需要考量安全性的操作。

### JavaScript 事件循环

#### 宏任务、微任务

众所周知，JavaScript 以单线程机制进行任务执行，而任务又分为宏任务为微任务。

所谓宏任务，诸如 `HTML解析（构建 DOM）`、`定时器`、`执行全局代码`、`键鼠事件` 等；而所谓微任务，是指比宏任务量级更小，方便在重新渲染 UI 之前快速执行、以减少重渲染次数的一些操作，包括 `DOM 变化`、`Promise` 等。

#### 事件循环

基于上述，我们不难得出，事件循环的实现需要至少两个任务队列：`宏任务队列`、`微任务队列`。需要注意的是，每一轮事件循环，会执行一个宏任务（队列头的任务）和微任务队列中全部的微任务。循环流程如下：

![](/event-loop.png)

#### 事件捕获与冒泡

在 JavaScript 中，事件的传播分为两个过程：捕获与冒泡。首先，事件从根元素（window 元素）到目标元素逐层被捕获，而后，事件从目标元素到根元素再逐层冒泡出来。我们可以通过 `addEventListener` 方法的第三个参数（布尔类型，可以理解为是否在事件捕获阶段对事件进行响应，默认否），来决定事件的响应阶段。

![](/event-spread.png)

### 节流、防抖

所谓防抖，即一个时间同一时间（或者极短时间内）多次被触发，只响应一次；所谓节流，即一段时间内只响应一次某事件。二者通常都通过定时器实现。

防抖场景比如，表单提交，我们不希望多次提交表单。

节流场景比如，文字输入加载候选词，有时我们不希望，输入的每个字都检索候选词；再如，拖拽 dom 元素时，为了性能、细节上的优化，我们需要减少部分拖拽事件的响应。

### call、apply、bind

这三者皆用来显式地玩弄上下文。

#### call 与 apply

call 和 apply 的使用较为类似：在函数执行时，为函数指定另一个确切的上下文。你比如：

```js
function foo(...params) {
  this.summary = params.reduce((l, p) => l + p, 0); // 求和
}
const bar = {};
foo.apply(bar, [1, 2, 3]);
console.log(bar.summary); // 6
```

二者主要的区别在于，apply 有两个参数，第二个参数是一个列表，会作为目标函数的参数；call 的参数数量不定，第二个参数起，都会作为目标函数的参数，同样的例子：

```js
function foo(...params) {
  this.summary = params.reduce((l, p) => l + p, 0); // 求和
}
const bar = {};
foo.call(bar, 1, 2, 3);
console.log(bar.summary); // 6
```

#### bind

bind 则用于，基于某个函数创建一个新的、上下文指向传入对象的新函数：

```js
const foo = { text: "foo" };
const bar = function () {
  console.log(this.text);
};
const baz = bar.bind(foo);
bar(); // undefined
baz(); // foo
bar === baz; //false
```

## HTML、CSS 基础

### 继承属性与非继承属性

#### 可继承属性

text-align、font-size、visibility 等

#### 不可继承属性

opacity（虽然子元素由于父元素不足一的 opacity 而变浅，但其本身的 opacity 依然为 1）、background 等

### 半像素宽度的边框

老面试题了。众所周知，border-width 是一个取值为自然数的属性，那怎么实现 0.5px 宽的边框呢？思路很简单：一个边框宽度为 1px 的元素，缩放为 0.5 个他自己，那它的边框便是 0.5px 了。这是说：

```html
<div class="box"></div>
<style>
  .box {
    width: 200px;
    height: 200px;
    border: black 1px solid;
    transform: scale(0.5, 0.5);
    transform-origin: 0 0;
  }
</style>
```

但这样元素中的所有都会被缩放，这不合理，于是我们就会想到伪元素：

```html
<div class="box"></div>
<style>
  .box {
    width: 100px;
    height: 100px;
    position: relative; // 不可以为默认的 static，否则伪元素 absolute 时，会往上找非 static 元素以便进行定位参考（那样伪元素的宽高、位置则可能与预期不符）
  }
  .box::before {
    content: "";
    width: 200%;
    height: 200%;
    border: black 1px solid;
    transform: scale(0.5, 0.5);
    transform-origin: 0 0;
    position: absolute;
  }
</style>
```

另外，多记录一笔，fixed 和 absolute 都是基于一个参考进行定位，只不过 absolue 是网上层找一个非 static 的元素，而 fixed 则始终以视窗（window）作为参考。

### 自动换行

段落过长时，设置自动换行：

```css
<div class="sentence">
    1hw jdkahnd jakmdas klalkdlas ndasjs  ,ndas,d-d，ndljasndns,a dsnadsadsa
</div>
<style>
    .sentence{
        width: 100px;
        background-color: brown;
        /* 顾名思义，换行策略。指定为 break-word 则表示过长时，
        在 断裂 处换行，断裂处 默认指 -（半角）、空格，而指定了断裂策略为 break-all 后，
        则可以为边缘词语断裂的地方 */
        word-wrap: break-word;
        /* 指定单词断裂策略，指定为 keep-all、norml、break-word（指空格、-）时，
        都会保留词语完整性，不直接断开单词（看上去像是填充了若干个空格一直到边缘），
        而指定为 break-all 则在边缘直接断裂*/
        word-break: break-all;
        /* 用于玩弄空格。pre-line 则连续空格成为一个空格；pre-wrap 则保留连续的空格，
        且 html 中的段落前的空格也有效  */
        white-space: pre-line;
    }
</style>
```

效果：

![](/wrap.png)

### input 自适应宽度

可以在 input 标签外套一层 div 标签，设置 input 的宽度为 100%，此后通过控制 div 的宽度，便可以间接控制 input 宽度。

### display none 和 visibility hidden

虽然都可以控制元素的显示与否，但 visibility hidden 时，元素所占空间仍然保留，仍会影响布局。

### BFC

所谓 BFC 即 `Block Formatting Context`，可以生硬地翻译为 `处于格式化中的块上下文`。这是 html 的一个特性，每个 BFC 间互不干扰。

你比如：

```html
<div style="background: #f00; width: 100px; height: 10px; float: left"></div>
<div style="background: #00f; width: 200px; height: 20px"></div>
```

将被解析为：

![](/bfc1.png)

即，浮动元素将不浮动的元素给遮挡住了。我们可以将第二个 div 变成一个 BFC（实际上第一个 div 因为被设置了 float 已然 BFC，这种遮挡实为 BFC 本意），比如添加 overflow 属性，以消除这种遮挡：

```html
<div style="background: #f00; width: 100px; height: 10px; float: left"></div>
<div style="background: #00f; width: 200px; height: 20px; overflow: auto"></div>
```

则：

![](/bfc2.png)

将元素变为 BFC，可以通过以下手段：

- 设置 float，比如 left、right
- 设置 overflow，比如 hidden、auto、scroll
- 设置 position，比如 fixed、absolute
- 设置 display，比如 inline-block、table-cell、flex

## 框架基础

### Vuex、Redux、Flux

众所周知，前端页面展示出来的纷繁复杂的信息，实则依赖内存里的诸多状态。在状态管理框架中，我们把状态称为 state，集中管理状态的地方叫做 store，而前端页面则是 view。

Flux 是一种前端状态管理思想。按 Flux 的理念，view 想要更新 store，要经过几个步骤：view —> action —> dispatcher —> store。其最大特点为 `数据的单向流动`。action、dispatcher 的提出是为了更好地追溯状态的改变过程，以便对状态进行更从容的管理。

而 Redux 是 Flux 的一种实现，它是一个泛用的状态管理框架（不在乎 view 层面通过什么框架实现）。特别地，它规定了单一数据源（只有一个 store）、state 是只读的，其改变要通过纯函数 reducer 进行。其流转大致为：view —> action —> store —> reducer —> store。

而 Vuex 则参考了 Redux 的设计理念，是一个为 Vue 专用的状态管理框架，其中状态更新通过 mutation 进行，流转过程为：view -> action -> mutation ->store。简单来说就是，在组件中 dispatch action，在 action 中 commit mutation，而 mutation 应该非常纯粹，只对状态进行更新，不包含其他复杂逻辑。因为大家总会念叨，action 中可以放入异步逻辑而 mutation 则不能~~（简直是废话）~~。

### vue 与 react 对比

#### 相似

- 为了避免频繁操作 DOM 影响性能，都采用 Virtual DOM（本质为能反映 DOM 树结构的一个复杂的 JS 对象）。元素的改变首先发生在虚拟 DOM 中，而后通过 Diff 算法找到需要更新的元素，高效更新 DOM。

- 组件化开发哲学

#### 相异

- 虚拟 DOM 的更新策略不同，React 会连同子组件一起更新（除非重写了 shouldComponentUpdate）；而由于 Vue 会追踪每个组件的依赖关系，故可以更精确地更新 DOM。
- JSX 与 模板语法的不同
- Vue 配套了 Vuex、Vue-router，而 React 相关框架则依赖社区力量
- React 的 state 只读（不可以直接修改），需要通过 setState 更新；Vue 相对应地，则通过双向绑定（Object.defineProperty、数据劫持&发布订阅模式）

## 其他

### Webpack 打包优化

### 速度

- 去除无效引用、循环引用
- 改全量构建为增量构建

### 体积

- 提取公共逻辑代码逻辑
- CDN 方式引用核心库

### 前端路由

前端路由的使命在于，不经由后端，直接通过前端技术实现页面的切换。

#### Hash 模式

监听 url 中 hash（window.location.hash，`#` 之后的便是所谓的 hash） 的变化，响应 window.onhashchange 事件，然后渲染不同的内容。再手动刷新浏览器页面时，这种路由 # 后的部分，不会用以请求服务端，故不需要服务端的配合。

#### History 模式

监听 url 中的路径变化，在刷新时，url 会完整地用以请求服务端，故通常需要服务端或者 nginx 等工具进行一番关于 404 异常的配置。值得一提的是，H5 History API 提供了诸多方法，比如可以通过 go（go(-1)、go(1)、go(0)、go('/certain-route')）、back、forward 方法进行跳转。

### 观察者模式

其核心在于，当一个对象发生更新时，所有依赖它的对象会得到通知，进而更新。该设计模式属于行为型模式。

该模式中，有两种身份：观察者与被观察者。简单来说，被观察者认识一堆观察者（被观察者实例中维护了一个观察者实例列表），当自身状态更新时，主动通知观察者们（观察者们实现同一个借口，具有公共的更新方法）。

而较为相似的，发布、订阅模式，则有三个身份：发布者、代理者、订阅者，且代理者手中掌管着不同的主题。简单来说，发布者将更新推至代理者的某个主题中，代理者再将更新告知订阅了该主题的订阅者们。较之于观察者、被观察者的松耦合，这种模式下的发布者、订阅者则完全解耦。

## References

- [好好学习 JS 异步原理](https://zhuanlan.zhihu.com/p/108652323)
- [快速搞懂 call，apply 和 bind](https://zhuanlan.zhihu.com/p/109123248)
- [完美解决 CSS 移动端半像素边框](https://zhuanlan.zhihu.com/p/88129547)
- 《JavaScript 忍者秘籍（第二版）》
- [观察者模式 vs 发布订阅模式](https://zhuanlan.zhihu.com/p/51357583)
- [Redux 和 Vuex 的对比](https://zhuanlan.zhihu.com/p/102069350)
