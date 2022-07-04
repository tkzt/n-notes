---
title: ES6 必会总结
titleTemplate: 军体拳
---
# ES6 必会总结

## let & const

众所周知，通过 var 声明的变量没有块级作用域，而 let 有。你比如说：

```javascript
function foo() {
  for (var i = 0; i <= 10; i++) {
    console.log(i);
  }
  console.log(i); // var 的作用域是整个函数，所以哪怕 for 逻辑之外也可以访问到
}

function bar() {
  for (let i = 0; i <= 10; i++) {
    console.log(i); // 而 let 的作用域是块，for 之外无法访问
  }
}
```

此外，let 不可以相同变量重新声明，而 var 可以：

```javascript
var foo = 12;
var foo = 24;
let bar = 12;
let bar = 24; // SyntaxError: Identifier 'bar' has already been declared
```

再外，申明全局变量时，通过 var 申明的变量，会自动成为全局对象 `window `的属性，而 let 则不会。

至于 let 与 const，let 用以声明变量，const 用以声明常量。

## 解构赋值

解构赋值在对象、基本数据类型上均可以使用：

### 基本数据类型

```js
let [a, b] = [12, 13];

// 可以据此进行变量的值交换
let foo = 10,
  bar = ((12)[(foo, bar)] = [bar, foo]);
```

### 对象

```js
// 123 -> foo, "baz" -> bar
let { id: foo, name: bar } = { id: 123, name: "baz" };
let { foo, bar } = { foo: 123, bar: "bar" }; // 此时要求变量名为对象属性名称
```

### 此外

```js
let [foo = 1, bar = 2] = [undefined, undefined]; // 申明时直接初始化，此时最终，foo 为 1，bar 为 2
let [foo = 1, bar = 2] = [null, null]; // 不同于 undefined，null 可用于赋值，则此时 foo、bar 皆为 null
```

## 一些功能扩展

### 字符串的扩展

主要是一系列帮助函数，你比如：

#### includes

顾名思义，等效于其他语言中诸如 contains 的函数：

```js
"foobar".includes("bar"); // true // 特殊地，大家总 includes.("") 总真
```

#### startsWith、endsWith

用于判断某字符串是否以什么什么开头或结尾：

```js
"foobar".startsWith("foo"); // true
"foobar".endsWith("bar"); // true
```

#### repeat

用于生成重复的字符串，你比如说：

```js
"8".repeat(3); // "888"
```

#### padStart

在字符串前添加 “pad”，你比如说：

```js
"8".padStart(3, "8"); // "888"，两个参数分别为 maxLength、fillString
```

#### 模板字符串

模板字符串是与传统 CStyle 先占位后赋值不同的另一种实现动态字符串的方式：

```js
let foo = 10086;
console.log(`${foo} is 10086`); // "10086 is 10086" // 以单反引号包裹，通过 ${} 组合操作符获取变量的值
```

### 数组的扩展

#### map

与 forEach 不同，map 函数返回 由依次执行所传入匿名函数结果组成的新数组，你比如：

```js
[1, 2, 3, 4].map((i) => i + "handled"); // ["1handled", "2handled", "3handled", "4handled"]
```

#### filter

与 map 一样，皆可以遍历可迭代对象的诸项，但其返回的数组是 由满足所传入匿名函数（理想状态下，传入的函数应该是一个可以明确返回真假值的函数（不理想时，则总是返回真））的原对象的各项组成，起到了一个过滤的作用，你比如说：

```js
[1, 2, 3, 4].filter((i) => i > 2); // [3, 4]
```

#### some、every

用于判断各元素是否满足某条件，some 当有元素满足条件时返回 true，而 every 需要各元素都满足：

```js
[1, 2, 3, 4]
  .some((i) => i > 2) // true
  [(1, 2, 3, 4)].every((i) => i > 2); // false
```

#### find

用于找到 第一个使得所传函数返回真 的元素，你比如：

```js
let foo = [1, 2, 3];
foo.find((i) => i === 2); // 2
```

#### fill

用于填充，所谓填充，即用 固定值 替换数组中的 指定的诸元素，你比如：

```js
let foo = [1, 2, 4, 6, 5];
foo.fill(7, 2, 5); // [1,2,7,7,7] // 三个参数分别为 用于替换的固定值、开始索引、结束索引（左闭右开）
```

#### Array.from

用于将任何有 length 属性的对象转化为数组，你比如：

```js
let foo = { 0: "first", 1: "second", length: 2 };
Array.from(foo); // ["first", "second"] // 对象 key 应为数组索引，否则转化成的数组诸项皆为 undefined
```

#### includes

判断是否包含：

```js
let foo = [1, 2, 4];
foo.includes(3); // false
```

#### 遍历方式

花式遍历数组的方式：

```js
let foo = [1, 2, 4, 3];
// 1. for in array - 得到索引
for (let i in foo) {
  console.log(i);
} // 0 1 2 3
// 2. for of array - 得到元素
for (let i of foo) {
  console.log(i);
} // 1 2 4 3
// 3. for of array.keys() - keys() 迭代器生成索引
for (let i of foo.keys()) {
  console.log(foo[i]);
} // 1 2 4 3
// 4. for of array.entries() - entries() 迭代器生成 索引-值 键值对
for (let i of foo.entries()) {
  console.log(i);
} // [0, 1] [1, 2] [2, 4] [3, 3]
```

当然，也可以 forEach（以及 map 等）：

```js
let foo = [1, 2, 4, 3];
foo.forEach((i) => console.log(i)); // 1 2 4 3
```

### 函数的扩展

#### 参数缺省值

即为函数参数指定默认值：

```js
function foo(a = 1, b = 1) {
  return a + b;
}
```

其中需要注意，当参数同时有 指定默认值的 和 不指定默认值的混合使用时，需要把指定默认值的参数放到后面，你比如：

```js
function foo(a, b = 1) {
  return a + b;
}
```

#### rest 参数

rest 参数通过 `...` 操作符，将除列出的参数外，剩余的参数赋值给一个参数，你比如：

```js
function foo(a, ...s) {
  console.log(s);
}
foo(1, 4, 3, 2); // [4, 3, 2]
```

另外，`...` 操作符是个好东西，它的作用是将一个某容器（数组、对象等）展开，通过它可以方便地进行数组、对象的深复制，你比如：

```js
let foo = [1, 2, 3, 4];
let bar = [...foo];

let baz = { a: 1 };
let quz = { ...baz };
```

此外，通过 `...` 还可以方便地进行一些操作，你比如：

```js
let foo = [10, 9, 7, 3, 12, 1]
let bar = [8, 11]
// 找最大值
Math.max(...foo) // 12 // 此处 ...foo 从现象上看，可以理解为没有中括号的 10, 9, 7, 3, 12, 1
// 组合数组
[...foo, ...bar] // [10, 9, 7, 3, 12, 1, 8, 11]
```

#### 箭头函数

箭头函数是个好东西，有了它可以更优雅、简洁地写匿名函数：

```js
let foo = [1, 2, 3, 4];
// 1. 通过 function 关键字
foo.map(function (item) {
  return item + "handled";
}); // ["1handled", "2handled", "3handled", "4handled"]
// 2. 箭头函数
foo.map((item) => item + "handled"); // ["1handled", "2handled", "3handled", "4handled"]
```

当需要传入多个参数（以及不传参数）的时候，需要在箭头左侧加上括号，你比如：

```js
(a, b) => a + b;
```

当然，也可以在箭头右侧通过大括号以及显式的返回值，处理更复杂的逻辑：

```js
(a, b) => {
  if (a > 123) {
    return b;
  }
  return 456;
};
```

### 对象的扩展

#### 变量和属性同名

当变量和属性同名时，可以简写：

```js
let name = "foo";
let bar = { name };
console.log(bar); // {name: "foo"}
```

#### 对象的函数属性可以简写

你比如：

```js
let foo = {
  bar() {
    console.log("bar");
  },
};
foo.bar(); // bar
```

函数也可以写成键值对形式：

```js
let foo = {
  bar: function () {
    console.log("bar");
  },
}; // 或者 {bar: ()=>console.log("bar")}
foo.bar(); // bar
```

#### 对象中的属性、方法可以是变量

你比如：

```js
let foo = "name";
let quz = "whatever";
let bar = { [foo]: "baz", [quz]: () => console.log("boom") };
bar.name; // baz
bar.whatever(); // boom
```

#### 对象的比较

通过 Object.is 比较两个对象的地址，等效于 `===`，你比如：

```js
let foo = { a: 1, b: 2 };
let bar = { a: 1, b: 2 };
Object.is(foo, bar); // false
```

#### 对象的遍历

通过 Object.keys() 可以将对象 keys 转化为一个数组，而后遍历之，即可依次取出对象 values，你比如：

```js
let foo = { a: 1, b: 2, c: 3 };
Object.keys(foo).forEach((k) => console.log(foo[k])); // 1 2 3
```

而类似地，Object.values() 可以直接将 values 转化为一个数组，你比如：

```js
let foo = { a: 1, b: 2, c: 3 };
Object.values(foo).forEach((v) => console.log(v)); // 1 2 3
```

另外，通过 Object.entries() 可以将键值对转化为数组，亦可以方便地遍历对象：

```js
let foo = { a: 1, b: 2, c: 3 };
Object.entries(foo); // ["a", 1] ["b": 2] ["c": 3]
```

### 数据结构的扩展

#### set

所谓 set，集合也，主要特征为元素（元素可以为基本类型和对象的混合）不重复：

```js
// 从数组创建 集合
let foo = new Set([1, 1, 2, 2]);
foo; // Set(2) {1, 2}
```

带有的主要方法包括：`add`、`delete`、`has`、`clear`，你比如：

```js
let foo = new Set([1, 1, 2, 2]);
foo.add(3); // Set(3) {1, 2, 3}
foo.delete(3); // Set(2) {1, 2}
foo.has(3); // false
foo.clear(); // Set(0) {}
```

集合的遍历可以通过其 keys()、values() 函数，二者返回值相同：

```js
let foo = new Set([1, 1, 2, 2]);
foo.keys(); // SetIterator {1, 2}
foo.values(); // SetIterator {1, 2}
```

此外，通过 set 可以实现对数组的去重，你比如：

```js
let foo = [1, 2, 2, 3];
let bar = new Set(foo);
foo = [...bar.values()]; // [1, 2, 3]
```

#### map

所谓 map，键值对也，即每个元素为一对数据，包括键、值，你比如：

```js
let foo = new Map([["a", 1]]); // 按理说一个 map 中应该有很多对键值，因此从现象上看，如同一个二维数组
foo; // Map(1) {"a" => 1}
```

map 的操作函数包括：`set `、`get`、`delete`、`size` 、`clear`，你比如：

```js
let foo = new Map([["a", 1]]);
foo.get("a"); // 1
foo.set("a", 2); // Map(1) {"a" => 2}
foo.set("b", 3); // Map(2) {"a" => 2, "b" => 3}
foo.delete("a"); // true, 此时 foo: Map(1) {"b" => 3}
foo.size; // 1 // 为一个属性而不是方法
foo.clear(); // 此时 foo: Map(0) {}
```

### class 语法糖

Es6 中声明一个类如下：

```js
class foo {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
}
```

其中，类内可省略 `function` 关键字，且通过 `this` 可实现类属性的申明。

另外，类可以通过 extends 实现集成，通过 super 调用父类的方法或者构造函数。你比如：

```js
class foo {
  constructor(a) {
    this.a = a;
  }
  saySth() {
    console.log(this.a);
  }
}

class bar extends foo {
  constructor(a, b) {
    super(a); // 调用父类构造函数
    this.b = b;
  }
  saySth() {
    super.saySth();
    console.log(this.b);
  }
}

let quz = new bar(1, 2);
quz.saySth();
```

### Symbol

所谓 symbol，象征、代号也，其生而为了独一无二，以解决属性名称重复的冲突。即便是相同的描述，对应的 Symbol 也不同，你比如：

```js
Symbol("foo") === Symbol("foo"); // false
```

通过 Symbol，我们可以安全地为某个对象动态添加属性：

```js
let foo = {};
foo[Symbol("bar")] = "bar";
foo[Symbol("bar")] = "bar";
foo; // Symbol(bar): "bar", Symbol(bar): "bar"}
```

另外，我们也可以通过 Symbol.for() 的方式生成 symbol，但是这种方式生成 symbol 时，会先全局判断是否有相同描述的 symbol 已经被申明过，若是返回旧有的，否则才生成新的。这意思是：

```js
Symbol.for("foo") === Symbol.for("foo"); // true
```

### Promise

Promise 是异步编程的解决方案，可以将 Promise 对象 理解为保存了未来结果的对象。

Promise 对象有三种状态，包括 `pending`、`fulfilled`、`rejected`，分别表示 进行中（阻塞中）、成功、失败，后二者会分别执行 `resolve`、`reject` 回调，一个用于示意的基本例子如下：

```js
// 假定有一个请求函数 request
// 其返回是形如 {status:200, data: ""} 的标准的 http请求返回
const foo = new Promise((resolve, reject) => {
  const req = request();
  if (req.status === 200) {
    resolve(req.data);
  } else {
    reject(req.message); // 或者说直接 reject("失败！") 等
  }
});
```

由上述可见，通过 resolve 将状态由 pending 转为 `fulfilled`，通过 reject 将状态由 pending 转为 `rejected`。得到了 Promise 实例后，我们可以通过 then、catch 链式分别获取到 resolve、reject 的值。接着上述示例，你比如：

```js
foo
  .then((data) => console.log(data)) // 链式得到的返回值依旧是一个 promise
  .catch((err) => console.log(err))
  .finally(() => {
    // 做一些收尾操作
  });
```

而 ECMAScript 2017 标准提出了 `async/await` 语法糖，使得异步编程更为简洁。上述例子的基本逻辑也可以写成：

```js
async function foo() {
  const req = await request();
  if (req.status === 200) {
    console.log(req.data);
  } else {
    console.log(req.message);
  }

  // 而后一些收尾操作
}
```

其中，`async` 用于装饰 函数，`await`用于装饰异步请求，这样一来程序逻辑只要顺序书写即可。
