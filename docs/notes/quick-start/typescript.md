---
title: Typescript 速通
titleTemplate: Quick Start
date: 2021-03-17
---

## 前言

这几月与诸多妖魔鬼怪打架，`ts` 便是其一，期间也掉落了许多东西，特此总结。

## 关于 TypeScript

众所周知，TypeScript 是 JavaScript 的超集，它可以编译为纯粹的 js。说的直白些，它为自由的 js 带来了静态类型，赢得生前身后名。

于是，它带来了许多好处：

- 属性获取（可以直接依据指定的类型，在编码时提示出变量所包含的属性）

- 非逻辑错误规避（在赋予非法类型时，进行提醒）

- 提升代码可读性

- 提升团队协作效率（一般而言，自己写的模块的各变量类型理应无比清晰，而他人书写的则需要分析，ts 辅助了分析这一过程）

  ...

但实际开发过程中，为各变量增加静态类型难免增加或多或少的心智负担，所以人常言， ts 的价值能最佳体现在**中大型项目、平均水平相对较高的团队中**。

## 简单例子

举个简单的例子，为了让某个函数诸参数的类型清晰明了，在 js 中，我们会这样做：

```js
/**
 * @param {number} a 第一个数字
 * @param {number} b 第二个数字
 */
function foo(a, b) {
  return a + b;
}
```

而使用 ts 则：

```ts
function foo(a: number, b: number) {
  return a + b;
}
```

## 记录些干的

### ts 基础类型

ts 中类型申明形如 `let/const 变量名:类型 = 值`，其基础类型包括：

- boolean - 布尔
- number - 数字
- string - 字符串
- void / null / undefined / unknown / never - 各式零值
- bigint - 大 int，比如 `let foo = BigInt(12)` （string、number 等简单类型申明同时赋值，可以自行推导，不必显式书写）
- symbol - 唯一类型
- tuple - 元组，比如 `let foo: [string, number] = ['a', 12]`
- enum - 枚举类型
- any - 魔鬼中的天使的万能的任意类型
- Array - 数组，比如 `let foo: Array<number> = []` 或者 `let foo: number[] = []`
- object - 对象

其中比较好玩地

- never 表示 `永不存在的值的类型`，比如：

```ts
let foo: never = (() => {
  throw new Error("msg");
})(); // 由于直接抛出异常，故函数无执行结果返回
```

- unknown 可以申明给，`不确定类型，但总归有类型的变量` ，一个合理的场景：

```ts
function(x: unknown){
  if(typeof x === 'string'){
    // 当 x 是字符串
  }else if(typeof x === 'number'){
    // 当 x 是数字
  }
}
```

### 自定义类型

在 RESTful web 开发中，我们更多的是要和一些自定义的复杂数据结构打交道，这时，就可以对先对类型进行申明，而后使用：

```ts
interface Foo {
  name: string;
  age: number;
  gender: boolean;
}
const bar: Foo = {
  name: "xiaoming",
  age: 12,
  gender: true,
};
```

以上的申明方式是当类型无需复用时，直接将类型申明在逻辑代码同文件中，而当需要复用时，可以将申明放在 `xxx.d.ts` 文件中，此种申明方式，通过 `export declare global` 将类型导出，通过 `namespace` 关键字（不为 namespace 所限的全局有效（因为 global））来区分类型所属的不同模块：

```ts
export declare global {
  interface Foo {
    name: string;
    age: number;
    gender: boolean;
  }
  namespace Bar {
    interface Baz {
      data: { [key: string]: string }; // 这表示一个 key、value 都为 string 的对象
    }
  }
}
```

使用时，比如 `let foo: Bar.Baz`。

### 另外

- 申明时不赋值：`let foo!:string`

- 类型属性可以省却时：

  ```ts
  interface Foo {
    name?: string;
  }
  ```

## 参考

- [TypeScript 中文网](https://www.tslang.cn/)
