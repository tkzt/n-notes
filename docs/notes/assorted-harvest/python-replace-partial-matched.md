---
title: Python re.sub 仅替换匹配到内容中的一部分
titleTemplate: 掉落
date: 2020-05-09
---

## 需求

最终实现的效果如下：

替换

```txt
everything is alright.
```

为

```txt
everybody is alright.
```

## Show Me The Code

实现如下：

```python
import re

src = 'everything is alright.'

re.sub('(every).*?(\\s.*\\.)',r'\1body\2',src) # everybody is alright.
```

## 后语

就这。
