---
title: 快速幂
titleTemplate: 军体拳
---
# 快速幂

## 简单来说

其实这是一个很精妙的思路，对比一下就可以发现：

## Show Me The Code

### 普通幂

差不多是这样：

```python
# 求 a 的 n 次幂，ans 是结果
baseNum,ans = a,a
for i in range(n-1):
    ans *= baseNum
```

### 快速幂

是这样：

```python
# 求 a 的 n 次幂，ans 是结果
powerNum,ans = a,1
while not n==0:
    if n&1:ans *= powerNum
    powerNum *= powerNum
    n >>= 1
```

另外，快速幂的时间复杂度是 O(log<sub>2</sub><sup>n</sup>)，而普通幂是 O(n)。
