---
title: Python 引入函数中，对于全局变量的处理
titleTemplate: 掉落
---
# Python 引入函数中，对于全局变量的处理

## Preface

今天在搞一个[小工具](https://github.com/boring-plans/ddt-sharp-shooter)的时候，发现关于「Python 引入函数中，对于全局变量的处理」的一个知识点。

## 例子

直接上代码。

文件 `test.py`：

```python
from test2 import bar as bar_2
foo = 'xx'


def bar():
    global foo
    foo = 'xxx'


def faz():
    print(foo)


if __name__ == '__main__':
    bar_2()
    print(foo)
```

文件 `test2.py`：

```python
def bar():
    from test import bar as bar_1, faz
    bar_1()
    faz()
```

`test.py` 的打印输出是：

```bash
xxx
xx
```

可以看出，`test2.py` 执行 `test.py` 中 `bar` 函数的时候，所操作的“全局变量”实际是另一个变量（对于 `test.py` 中的 foo 而言）。`test2.py` 中，`bar` 函数在修改 foo 后调用了 `faz` 函数，从反馈来看，foo 这个全局变量被成功修改。但在 `test.py` 上下文中，执行完 `test2.py` 的修改后，foo 值并未改变。有种文件层面闭包的意味。

其实仔细想想，这样是合理的，将 `test2.py` 改成更直白的表达：

```python
def bar():
    from test import foo
    foo = 'xxx'
```

显然 `test.py` 中的 foo 不会因此改变，我们显然无法也不应该在自己的上下文中，去改变另一个上下文的变量。

