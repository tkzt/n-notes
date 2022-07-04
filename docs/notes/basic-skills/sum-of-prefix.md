---
title: 前缀和
titleTemplate: 军体拳
---
# 前缀和

## 简单来说

前缀和主要是减少了重复的运算，比如有一个问题，每一次处理需要得到 ∑a<sub>i</sub>(i = m->n-1)，其中，n 为定值而 m 不定，那么常规操作是每一次处理都重新对索引 m->n-1 的数求和。但实际上，可以用一个数组来专门存储 m->n-1 的和（比如那个数组叫做 sum，那么 sum[m]则表示 ∑a<sub>i</sub>(i = m->n-1)）。这样，预先构造好 sum 数组，每次处理只需要要直接访问 sum 数组就好（最大可将复杂度从 O(n<sup>2</sup>) 降到 O(n)）。

## Show Me The Code

sum 数组的构造过程大概就是：

```python
sum,sumNums = [0 for i in range(n)],0
for i in range(n-1,-1,-1):
    sumNums += a[i]
    sum[i] = sumNums
```
