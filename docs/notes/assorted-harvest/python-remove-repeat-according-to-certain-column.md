---
title: Python 依据对象某一属性去重
titleTemplate: 掉落
---
# Python 依据对象某一属性去重

## 前言

利用 `reduce` 函数实现。

### 需求如下

对于如下对象列表：

```python
[
    {'name':'black','foo':123},
    {'name':'black','foo':456},
    {'name':'white','foo':789},
]
```

期望得到：

```python
[
    {'name':'black','foo':123}, # 或保留 {'name':'black','foo':456}，这不重要
    {'name':'white','foo':789},
]
```

## Show Me The Code

当时思索了一通，实现压缩到最简，如下：

```python
a = [
    {'name':'black','foo':123},
    {'name':'black','foo':456},
    {'name':'white','foo':789}
]
result = reduce(lambda y,x:y if (x['name'] in [i['name'] for i in y]) else (lambda z,u:(z.append(u),z))(y,x)[1],a,[])
```

## 此外

`reduce` 函数在 `functools` 模块中：

```python
from functools import reduce
```
