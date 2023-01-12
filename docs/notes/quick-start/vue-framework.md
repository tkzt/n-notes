---
title: Vue2 速通
titleTemplate: Quick Start
date: 2020-10-01
---

## Basic example

```html
<div id="app">{{ message }}</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      message: "foo",
    },
  });
</script>
```

和 React 一样，Vue 通过虚拟 DOM 对元素进行更高效管理，而不同于 React 的 JSX，Vue 通过元素、JS 分离的模板语法进行开发。上述是一个简单的 Vue 示例，通过 `el` 绑定元素、通过 `data` 中的 `message` 实现从存储到展示的单向数据流（一旦 `message` 发生变化，元素中的值（即视图）也会立刻变化）。

## data & methods & computed & watch

### data

当一个 Vue 实例被创建时，`data` 中所有的属性将被加到 Vue 的响应式系统中，当属性值发生变化，视图立即会发生响应（作出更新）。

需要注意的是，`data` 总是一个对象，用来存储应用的诸多状态。 可以通过 `$` 前缀访问诸如 data、methods 等的属性：

```javascript
var vm = new Vue({
  el: "#app",
  data: { a: 1 },
});

vm.$data === { a: 1 }; // => true
vm.$el === document.getElementById("app"); // => true

vm.a = 2;
```

### methods

顾名思义，`methods` 用以存放应用中的一些方法，你比如：

```html
<div id="app">
  <div>
    <button v-on:click="increase">{{ counter }}</button>
    <button v-on:click="decrease">{{ counter }}</button>
  </div>
</div>
<script>
  var vm = new Vue({
    el: "#app",
    data: { counter: 0 },
    methods: {
      increase() {
        this.counter += 1;
      },
      decrease() {
        this.counter -= 1;
      },
    },
  });
</script>
```

其中，绑定事件时，也可以 `v-on:click="increase()"`，毕竟是 Vue。

另外，由于用到了 `this`，于是 methods 里的方法不能写箭头函数，除了上述的写法，也可以：

```javascript
methods: {
  increase: function(){this.counter += 1},
  decrease: function(){this.counter -= 1}
}
```

### computed

虽然模板中可以写表达式，但是当逻辑逐渐复杂起来的时候，出于易读、好维护的角度，我们更希望通过 带返回的函数 的形式，将这些逻辑组织起来，`computed` 便是为此而生，你比如：

```html
<div id="app">
  <div>{{ message.split('').reverse().join('') }}</div>
</div>
<script>
  var vm = new Vue({
    el: "#app",
    data: { message: "foo, bar." },
  });
</script>
```

模板中包含了一段关于反转字符串的逻辑，通过 `computed`，虽然本质上一个意思，但不论是复用还是维护的时候，都非常方便：

```html
<div id="app">
  <div>{{ reversedMessage }}</div>
</div>
<script>
  var vm = new Vue({
    el: "#app",
    data: { message: "foo, bar." },
    computed: {
      reversedMessage: function () {
        return this.message.split("").reverse().join("");
      },
    },
  });
</script>
```

另外，不同于 methods 中的方法，computed 基于响应式依赖进行缓存，无需显式调用，当所依赖的状态变量（例子中的 `message` ）发生变化时，自动更新计算值。

比起将 computed 中的属性看做方法，把之理解为与 data 中同等的状态变量更合适。事实上，默认情况下为 computed 中属性提供的方法（上述 reversedMessage 对应的方法），会被作为该属性的 getter 方法（一般也只需要 getter 方法），在必要的时候，我们可以显式地提供（同时或者只一者）setter、getter 方法：

```html
<div id="app">
  <div>
    firstName: {{ firstName }} <br />
    lastName: {{ lastName }} <br />
    fullName: {{ fullName }}
  </div>
</div>
<script>
  var vm = new Vue({
    el: "#app",
    data: { firstName: "Foo", lastName: "Bar" },
    computed: {
      fullName: {
        get: function () {
          return this.firstName + " " + this.lastName;
        },
        set: function (fullName) {
          const nameArr = fullName.split(" ");
          this.firstName = nameArr[0];
          this.lastName = nameArr[1];
        },
      },
    },
  });
  vm.fullName = "Bar Foo";
</script>
```

当为 fullName 赋值时，`set` 内逻辑将被执行，即 firstName、lastName 会同步更新。

### watch

上述 computed 中提到，依赖某个变量的状态自动更新计算值，实际上 Vue 提供了另一种更通用地、对属性值进行监听的方式：`watch`。不似 computed 侧重点在于自动更新计算值，其作用侧重于自动回调。说得更明白些，当一个状态变量（或多个）的改变，引起另一个状态变量的改变时，应优先选用 computed，此外的情景才应当选择 watch。

一个化简为繁的例子如下：

```html
<div id="app">
  <div>{{ fullName }}</div>
</div>
<script>
  var vm = new Vue({
    el: "#app",
    data: { firstName: "Foo", lastName: "Bar", fullName: "" },
    watch: {
      firstName: function () {
        this.fullName = this.firstName + " " + this.lastName;
      },
      lastName: function () {
        this.fullName = this.firstName + " " + this.lastName;
      },
    },
  });
  vm.firstName = "Bar";
  vm.lastName = "Foo";
</script>
```

## 生命周期与生命周期 Hooks

Vue 应用的生命周期如下（官网）：

![生命周期](https://img-blog.csdnimg.cn/img_convert/0ba95bbaba36a87036f7c384f43c10cd.png)

针对不同的阶段，框架提供了一些所谓的生命周期钩子，比如 `created`，可用来在实例被创建后执行一些定制化的初始逻辑。从写法上看，这些钩子们和 `data` 是同级属性，此外还包括 `mounted`、`updated`、`destroyed`。

此间的注意点依然是不要将逻辑写成箭头函数，其原因仍然是 js 中 this 上下文在普通函数、箭头函数中有所差异。

## 基础模板语法

### v-bind

v-bind 用于绑定一些 html attribute，你比如 title、id、class、style、href 等等等等：

```html
<div id="app">
  <div v-bind:title="title">{{ message }}</div>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      title: "this is a title",
      message: "foo",
    },
  });
</script>
```

绑定 class 时：

```html
<div id="app">
  <div v-bind:class="{foo: isFoo, bar: isBar}">{{ message }}</div>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      isFoo: true,
      isBar: true,
      message: "foo",
    },
  });
</script>
<style>
  .foo {
    background-color: bisque;
  }
  .bar {
    color: burlywood;
  }
</style>
```

绑定 style：

```html
<div id="app">
  <div v-bind:style="{color: foo, 'background-color': bar}">{{ message }}</div>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      foo: "burlywood",
      bar: "bisque",
      message: "foo",
    },
  });
</script>
```

`v-bind:attr` 可以缩写为 `:attr`：

```html
<div id="app">
  <button :disabled="foo">click me</button>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      foo: true,
    },
  });
</script>
```

数组语法：

```html
<div id="app">
  <button :style="[foo, bar]">click me</button>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      foo: {
        "background-color": "bisque",
      },
      bar: {
        color: "burlywood",
        display: ["-webkit-box", "-ms-flexbox", "flex"], // 多重值常用于兼容
      },
    },
  });
</script>
```

### v-on

用于监听 DOM 事件，你比如：

```html
<div id="app">
  <button v-on:click="giveResponse">foo</button>
  <button v-on:click="giveResponse()">bar</button>
</div>
<script>
  var app = new Vue({
    el: "#app",
    methods: {
      giveResponse: () => alert("u just click a btn"),
    },
  });
</script>
```

当然，直接写表达式也是支持的：

```html
<div id="app">
  <button v-on:click="btnName==='foo'?btnName='bar':btnName='foo'">
    {{ btnName }}
  </button>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      btnName: "bar",
    },
  });
</script>
```

很多时候，还需要获取到原生 DOM 事件的 event 参数：

```html
<div id="app">
  <button v-on:click="giveResponse($event)">foo</button>
</div>
<script>
  var app = new Vue({
    el: "#app",
    methods: {
      giveResponse: (ev) => alert(ev.clientX),
    },
  });
</script>
```

此外，vue 支持对事件进行修饰：

- .stop - 阻止事件继续传播（`stopPropagation`）
- .prevent - 禁止默认行为（比如 submit 后重载页面）
- .capture - 将由内部元素触发的事件先行处理，而后才交给内部元素
- .self - 只有事件是当前元素本身触发的才处理
- .once - 事件只响应一把
- .passive - 即 addEventListener 中的 passive 参数，可以浅显地理解为通过设置 passive 告诉 js 引擎事件的默认行为（似乎是为 scroll 而生）不想被阻止。默认行为会立刻发生，而不会等到事件绑定的函数执行完成才进行。这个立意本身可能就与 prevent 相反，所以二者连用从逻辑意义上是 confusing 的，从结果上看，会因为 prevent 被忽略掉。

修饰语法是支持串联的，你比如：

```html
<div id="app" v-on:click.once.capture="capture">
  <button v-on:click="giveResponse($event)">foo</button>
</div>
<script>
  var app = new Vue({
    el: "#app",
    methods: {
      giveResponse: (ev) => alert(ev.clientX),
      capture: () => alert("captured"),
    },
  });
</script>
```

特殊地，修饰可以是按键，你比如：

```html
<input id="app" v-on:keyup.arrow-left="pageLeftUp" />
<script>
  var app = new Vue({
    el: "#app",
    methods: {
      pageLeftUp: () => alert("page left is up"),
    },
  });
</script>
```

特殊的特殊地，可以将点击事件与按键（经过探究仅限于系统按键，诸如 meta、shift 等等）事件串联，实现对诸如“在按下 shift 的情况下点击鼠标左键”的响应：

```html
<button id="app" v-on:click.shift.left="shiftLeftClick">foo</button>
<script>
  var app = new Vue({
    el: "#app",
    methods: {
      shiftLeftClick: () => alert("shift and left mouse button"),
    },
  });
</script>
```

其中，值得一提的是，绑定 click 事件时可以修饰以 `.left`、`middle`、`right`，分别用以仅响应鼠标左、中、右键。

此外，2.5.0 新增了 `.exact` 修饰，用于配合系统修饰（meta、ctrl、shift 等）使用，表示目标按键有且仅有。你比如按且仅按下 shift、鼠标左键时才响应可以描述为：

```html
<button id="app" v-on:click.shift.left.exact="shiftLeftClick">foo</button>
<script>
  var app = new Vue({
    el: "#app",
    methods: {
      shiftLeftClick: () => alert("exactly are shift and left mouse button"),
    },
  });
</script>
```

另外，`v-on:event` 可以缩写为 `@event`，你比如：

```html
<button id="app" @click.shift.left.exact="shiftLeftClick">foo</button>
<script>
  var app = new Vue({
    el: "#app",
    methods: {
      shiftLeftClick: () => alert("shift and left mouse button"),
    },
  });
</script>
```

### v-if

`v-if` 用于条件性渲染，当条件为 truthy 值的时候元素才会被渲染。你比如：

```html
<div id="app">
  <div v-if="showFoo">foo</div>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      showFoo: true,
    },
  });
</script>
```

`v-if` 之后可以接 `v-else-if`：

```html
<div id="app">
  <div v-if="showFoo">foo</div>
  <div v-else-if="showBar">bar</div>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      showFoo: false,
      showBar: true,
    },
  });
</script>
```

当然，`v-else` 乃兵家必备：

```html
<div id="app">
  <div v-if="showFoo">foo</div>
  <div v-else-if="showBar">bar</div>
  <div v-else>baz</div>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      showFoo: false,
      showBar: false,
    },
  });
</script>
```

其中需要注意的是，`v-else-if`、`v-else` 需要紧跟着 `v-if` 或者 `v-else-if`。另外，`v-show` 也用来条件渲染，其与 `v-if` 区别在于，`v-show` 实际控制 css 属性 `display`，当条件为 falsy 时，display 设置为 `none`，元素虽不展示，但仍在内存中。相比之下，使用 `v-if` 时，只有当条件为 truthy 时，元素才会被渲染。

```html
<div id="app">
  <div v-show="showFoo">foo</div>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      showFoo: true,
    },
  });
</script>
```

### v-for

通过 `v-for` 可以更直观地实现譬如 react 中：

```jsx
<div id="app">
  {aList.map((item) => (
    <div>{item}</div>
  ))}
</div>
```

为：

```html
<div id="app">
  <div v-for="item in aList">
    <div>{{ item }}</div>
  </div>
</div>
```

若其中，`aList` 为一个朴实无华的字符串列表：`['foo', 'bar', 'baz']`，二者最终都会被渲染成：

```html
<div id="app">
  <div>
    <div>foo</div>
    <div>bar</div>
    <div>baz</div>
  </div>
</div>
```

### v-model

`v-model` 用于诸如 `input`、`textarea`、`select` 等表单元素上，创建双向数据绑定（内存里值的改变 会引起 展示的更新，而因为交互产生的组件状态的变化 也会使得 内存中值的更新）。

不似 React，Vue 通过数据双向绑定（语法糖），为开发者屏蔽了组件事件、属性上的差异，你比如说在 React 中为 checkbox、textarea 分别建立双向数据流需要这样：

```html
<div>
  <input type="checkbox" checked={checked === "foo"} onChange={() =>
  setChecked(checked === "foo" ? "" : "foo")} />
  <br />
  <textarea value={theText} onChange={(ev: { target: { value: string } }) =>
  setTheText(ev.target.value) } />
</div>
```

相应地，要声明两个状态变量：

```javascript
const [checked, setChecked] = useState < string > "";
const [theText, setTheText] = useState < string > "";
```

而 Vue 中：

```html
<div id="app">
  <input type="checkbox" v-model="checked" value="foo" />
  <br />
  <textarea v-model="theText"></textarea>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      checked: false,
      theText: "",
    },
  });
</script>
```

相比之下，Vue 更加简洁，同时不需要开发者自行处理诸如 `onChange` 等的事件，开发体验更加友好。

> - 在使用 `v-model` 时，元素原生的 value、checked、selected 属性的值将会被忽略，元素经渲染后，属性的真实值仅来源于 Vue 实例（更具体而言，data 中）。
> - 而示例中，由于 input 的类型是 checkbox，故此时 value 属性，原生意义上本该不起什么作用，但 Vue 将之利用起来，用以判断 checkbox 是否被勾选。

Vue 在很多情况下会显得更加方便，主要是因为框架很多时候不仅实现了原子性的功能，还会在此基础上再兼容更多一些的情况。比如上述例子中，需要的是一组 checkbox，这时，在 React 中，可能需要这样做：

```html
<div>
  <input type="checkbox" checked={checkedList.includes("foo")} onChange={() =>
  setCheckedList( checkedList.includes("foo") ? checkedList.filter((checked:
  string) => checked !== "foo") : checkedList.concat("foo") ) } /> <input
  type="checkbox" checked={checkedList.includes("bar")} onChange={() =>
  setCheckedList( checkedList.includes("bar") ? checkedList.filter((checked:
  string) => checked !== "bar") : checkedList.concat("bar") ) } /> <input
  type="checkbox" checked={checkedList.includes("baz")} onChange={() =>
  setCheckedList( checkedList.includes("baz") ? checkedList.filter((checked:
  string) => checked !== "baz") : checkedList.concat("baz") ) } />
</div>
```

相应地，需要声明的状态变量变为（另一种做法是，声明三个状态变量，三个 input 分别处理事件，两种本质上是一个意思）：

```typescript
const [checkedList, setCheckedList] = useState<string[]>([]);
```

而 Vue 中，则：

```html
<div id="app">
  <input type="checkbox" v-model="checkedList" value="foo" />
  <input type="checkbox" v-model="checkedList" value="bar" />
  <input type="checkbox" v-model="checkedList" value="baz" />
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      checkedList: [],
    },
  });
</script>
```

语法糖万岁。

另外，也可以对 `v-model` 进行一些修饰：

- `.lazy` - 由交互产生的元素值的变化，不立即更新到相关状态变量（比如汉字输入时，有拼音这个过程，而通过 lazy 可以忽略该过程，这样可以减少更新的次数，减少开销）。
- `.number` - 事实上即便将 input 的 type 设为 number，读取元素值的时候，得到的依然是字符串。通过 `.number` 可以将元素值自动转化成数值（当值无法被 parseInt 的时候，则得到的仍然是原本的值）。
- `.trim` - 该修饰用以过滤输入首尾的空白字符。

### v-once

表示元素只会被渲染一把，此后状态变量的变化不会引起之展示的更新。

### v-html

表示与元素绑定的变量，是一段可解析的 html 字符串，进而渲染时会用解析后的该 html 替换使用 `v-html` 的元素。你比如：

```html
<div id="app">
  <div v-html="theValue"></div>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      theValue: '<span style="color:red;">foo</span>',
    },
  });
</script>
```

div 部分会被渲染成：

```html
<div id="app">
  <span style="color:red;">foo</span>
</div>
```

## 通过 key 阻止复用

Vue 在更新展示时，本着提升效率以及减小开销的原则，会复用一些元素。而有的时候，我们不希望元素被复用（或者说我们希望它更新），此时便可以使用 key。你比如说：

```html
<div id="app">
  <div v-if="loginType === 'username'">
    <label>Username</label>
    <input placeholder="Enter your username" />
  </div>
  <div v-else>
    <label>Email</label>
    <input placeholder="Enter your email address" />
  </div>
  <button
    v-on:click='loginType==="username"?loginType="email":loginType="username"'
  >
    toggle login type
  </button>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
      loginType: "username",
    },
  });
</script>
```

这样当切换登录方式时，会发现此前的输入仍然在 input 元素中，这是不合理的，于是加入 key：

```html
<div v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username" />
</div>
<div v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email" />
</div>
```

## 组件化

### 何为 Vue 组件

所谓 Vue 组件，即一个可复用的 Vue 实例，一个基本的组件声明示例如下：

```html
<div id="app">
  <button-counter></button-counter>
</div>
<script>
  Vue.component("button-counter", {
    data: function () {
      return {
        count: 0,
      };
    },
    template: '<button v-on:click="count++">{{count}}</button>',
  });
  new Vue({ el: "#app" });
</script>
```

### 复用

上述组件，复用起来就像这样：

```html
<div id="app">
  <button-counter></button-counter>
  <button-counter></button-counter>
  <button-counter></button-counter>
</div>
<script>
  Vue.component("button-counter", {
    data: function () {
      return {
        count: 0,
      };
    },
    template: '<button v-on:click="count++">{{count}}</button>',
  });
  new Vue({ el: "#app" });
</script>
```

值得注意的是，组件的 data 不似普通实例那样直接是一个对象，组件的 data 应当是一个函数，通过返回值提供出一个对象。这是因为组件每复用一把，就相当于增加一个该组件的实例，data 直接对应一个对象会导致诸个组件的实例共用同一个响应状态，其中一个实例的状态变化会同步作用到其他组件上，大多数情况下这显然是不合理的。而通过函数，每个实例会维护各自的状态，互相独立。

### 组件的 Props

有时，在实例化某个组件的时候，我们希望传入一些定制化的内容，一个简单的例子是某个用于表示问候的组件，在实例化时可能需要传入不同的问候语：

```javascript
Vue.component("greeting", {
  template: "<div> Hello, Vue :) </div>",
});
```

props 便是为此而生的：

```html
<div id="app">
  <greeting msg="Foo"></greeting>
</div>
<script>
  Vue.component("greeting", {
    props: ["msg"],
    template: "<div> Hello, {{ msg }} :) </div>",
  });
  new Vue({ el: "#app" });
</script>
```

此外，我们可以在实例化组件时，借助 `v-bind` 将传入的内容绑定为动态变量。

### 监听组件内事件

有时，我们需要为组件内的一些元素（比如说 button ）绑定一些方法，而这些方法通常又是与外层状态紧密相关的，这时我们可以使用 `$emit`：

```html
<div id="app">
  <button-counter @on-click="onClick" :count="count"></button-counter>
</div>
<script>
  Vue.component("button-counter", {
    props: ["count"],
    template:
      '<button @click="$emit(`on-click`)"> Click Me {{ count }} Times </button>',
  });
  new Vue({
    el: "#app",
    data: {
      count: 0,
    },
    methods: {
      onClick() {
        this.count += 1;
      },
    },
  });
</script>
```

其中，需要注意的是，`$emit` 函数的实参可以说是字符串模板里的字符串模板，传入其中的函数名不能是驼峰式的命名，需要变成 `kebab-case` 的命名方式（短横线分隔命名法）。

而当我们监听到事件后，不只是想调用函数，还想向函数中传入一些由组件抛出的固定值（变化步长等）的时候，可以这样：

```html
<div id="app">
  <button-counter @on-click="onClick($event)" :count="count"></button-counter>
</div>
<script>
  Vue.component("button-counter", {
    props: ["count"],
    template:
      '<button @click="$emit(`on-click`, 2)"> Click Me {{ count }} Times </button>',
  });
  new Vue({
    el: "#app",
    data: {
      count: 0,
    },
    methods: {
      onClick(step) {
        this.count += step;
      },
    },
  });
</script>
```

### 组件上使用 `v-model`

前文中有说到，`v-model` 通过语法糖为开发者屏蔽了各种表单元素属性、事件上的差异与细节，实际上，一般情况下（不修饰以 `.lazy`），`v-model` 主要粘合的是元素的 `value` 以及 `input` 事件，这意思是：

```html
<input v-model="searchText" />
```

与：

```html
<input
  v-bind:value="searchText"
  v-on:input="searchText = $event.target.value"
/>
```

等价。

同理，只要我们的自定义组件暴露出了 value、以及 input 事件，那么我们便可以将 `v-model` 作用在之上：

```html
<div id="app">
  <button-counter v-model="count"></button-counter>
</div>
<script>
  Vue.component("button-counter", {
    props: ["value"],
    template:
      '<button @click="$emit(`input`, value + 1)"> Click Me {{ value }} Times </button>',
  });
  new Vue({
    el: "#app",
    data: {
      count: 0,
    },
  });
</script>
```

### 插槽

#### 何为插槽

有时，我们想要动态地向自定义的组件中再塞点什么，但在没有和组件商量好的情况下， 组件是不会答应的，你比如：

```html
<div id="app">
  <simple-div> Want To Add More </simple-div>
</div>
<script>
  Vue.component("simple-div", {
    template: "<div> Only This Sentence </div>",
  });
  new Vue({
    el: "#app",
  });
</script>
```

`Want To Add More` 是不会被渲染出来的。这时我们可以通过 `slot`（插槽）实现想要的效果：

```html
<div id="app">
  <simple-div> More Added </simple-div>
</div>
<script>
  Vue.component("simple-div", {
    template: `
      <div> 
        More Than This Sentence
        <br/>
        <slot></slot>
  		</div>
		`,
  });
  new Vue({
    el: "#app",
  });
</script>
```

#### 缺省值

`slot` 标签间的内容，将作为缺省值，当未提供具体内容时，直接显示：

```html
<div id="app">
  <simple-div></simple-div>
</div>
<script>
  Vue.component("simple-div", {
    template: `
      <div> 
        More Than This Sentence
        <br/>
        <slot>Default Content</slot>
      </div>
    `,
  });
  new Vue({
    el: "#app",
  });
</script>
```

此时，`DefaultContent` 将被显示。

#### 具名插槽

顾名思义，具名插槽即是有名字的插槽。在某个自定义组件内，我们可能想在后继多处补充内容，为了让内容归到相应位置，我们需要给插槽一个名称。最典型的是 Web 中的 header、content 以及 footer。你比如：

```html
<div id="app">
  <simple-div>
    <template v-slot:header>header</template>
    <p>content 1</p>
    <p>content 2</p>
    <template v-slot:footer>footer</template>
    <p>content 3</p>
  </simple-div>
</div>
<script>
  Vue.component("simple-div", {
    template: `
<div> 
<header>
<slot name="header"></slot>
  </header>
<content>
<slot></slot>
  </content>
<footer>
<slot name="footer"></slot>
  </footer>
  </div>
`,
  });
  new Vue({
    el: "#app",
  });
</script>
```

其中，没有被 `template` 包裹的部分不论与其他 `template` 的位置关系，会被归到默认插槽（也就是组件模板中，插槽标签中没有提供 name 属性的插槽）中，当然显式把这些元素归到默认插槽中也是可以的：

```html
<template v-slot:default>
  <p>content 1</p>
  <p>content 2</p>
  <p>content 3</p>
</template>
```

此外，动态指令参数也可以用在 v-slot 上：

```html
<template v-slot:[dynamicSlotName]>
  <p>content 1</p>
  <p>content 2</p>
  <p>content 3</p>
</template>
```

再外，具名插槽也是可以缩写的，用 `#`：

```html
<template #header> header </template>
```

而 default 插槽缩写时必须带上 default：

```html
<template #default> header </template>
```

### 插槽 Props

通过插槽的 Props，我们可以在外部访问组件的内部状态，其声明需要在 slot 元素上使用 `v-bind`。与 `v-bind` 紧接的是我们在外部可使用的、该状态的别称，`v-bind` 其后的引号内为该状态在内部的名称：

```html
<div id="app">
  <simple-div>
    <template v-slot:default="slotProps">
      {{ slotProps.userProp.lastName }}
    </template>
  </simple-div>
</div>
<script>
  Vue.component("simple-div", {
    data: function () {
      return {
        user: {
          firstName: "Foo",
          lastName: "Bar",
        },
      };
    },
    template: `
<div> 
<slot v-bind:userProp='user'>{{ user.firstName }}</slot>
  </div>
`,
  });
  new Vue({
    el: "#app",
  });
</script>
```

当然，`slotProps` 是随便起名称，可以替换成任意名称，也完全可以解构使用：

```html
<template v-slot:default="{ userProp }"> {{ userProp.lastName }} </template>
```

甚至也可以为读取不到内部属性的情况准备一个默认值：

```html
<template v-slot:default="{ userProp = { lastName: 'foo'} }">
  {{ userProp.lastName }}
</template>
```

#### 独占默认插槽

当组件中只有默认插槽时，可以将 `v-slot` 放在组件中（不必借助 template）使用，用于绑定一些动态变量，除了这种情况，`v-slot` 只能用在 `template` 元素上：

```html
<div id="app">
  <simple-div v-slot:default="msg">{{ msg }}</simple-div>
</div>
<script>
  Vue.component("simple-div", {
    data: function () {
      return {
        msg: "Hello",
      };
    },
    template: `
<div> 
<slot v-bind:message="msg"></slot>
  </div>
`,
  });
  new Vue({
    el: "#app",
  });
</script>
```

或者直接不写 default 也是 Okay 的：

```html
<simple-div v-slot="slotProps">{{ slotProps.message }}</simple-div>
```

#### 通过 is 变身

##### component 中

有时，我们希望某处是个动态的组件（根据状态切换之实质），这时，我们可以使用 `is`：

```html
<div id="app">
  <component :is="isNormal?`span`:`simple-div`"></component>
</div>
<script>
  Vue.component("simple-div", {
    template: `
<div> 
<slot> Hello </slot>
  </div>
`,
  });
  new Vue({
    el: "#app",
    data: {
      isNormal: false,
    },
  });
</script>
```

上述例子也表明 is 也可用于普通 HTML 元素之上（虽然有一些特殊之处，暂且不论）。

##### 一些限制元素中

另外，在一些特殊 HTML 元素，诸如 ul、ol、table、select，从语法上来看，其中的元素的类型是有严格限制的，比如 ul 中 只能是 li 元素，此时也可以通过 is 来瞒天过海：

```html
<ul id="app">
  <li :is="`simple-div`"></li>
</ul>
<script>
  Vue.component("simple-div", {
    template: `
      <div> 
        <slot> Hello </slot>
      </div>
    `,
  });
  new Vue({
    el: "#app",
    data: {
      isNormal: false,
    },
  });
</script>
```

但这个限制烦恼，在以下的 Vue 编程中遇不到：

- 字符串模板中（比如，`template:'...'`）
- 单文件组件（即 xxx.vue 中）
- `<script type="text/x-template"></script>`
