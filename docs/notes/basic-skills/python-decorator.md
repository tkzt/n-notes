---
title: Python 装饰器
titleTemplate: 军体拳
---

# Python 装饰器

简单再记下 Python 装饰器，记忆不太可信，它会随意删除、更改一些内容。

```python
def decorator(fn):

    def inner(*args, **kwargs):
        return fn(*args, **kwargs)

    return inner


def decorator_keep_origin(fn):
    from functools import wraps

    @wraps(fn)
    def inner(*args, **kwargs):
        return fn(*args, **kwargs)

    return inner


def decorator_with_param(*args, **kwargs):
    print(args, kwargs)
    return decorator_keep_origin


@decorator
def func_1(foo: str, bar: str):
    return foo + bar


@decorator_keep_origin
def func_2(foo: str, bar: str):
    return foo + bar


@decorator_with_param(200, message="message")
def func_3(foo: str, bar: str):
    return foo + bar


print(func_1.__name__)
print(func_2.__name__)
print(func_3('foo', 'bar'))
```

Console Output:

```
(200,) {'message': 'message'}
inner
func_2
foobar
```

其中：

- 因为 `@decorator_with_param(200, message="message")` 实际是立即调用了一次 `decorator_with_param` 函数，所以先输出
- 通过 `functools.wraps` 可以保留已装饰的函数的名称、描述等信息