---
title: 贪心算法
titleTemplate: 军体拳
date: 2018-11-12
---

## 前言

在一个阴森、疲惫的午后，我情不自禁地打开了紫书。

## 有个问题

有若干个物体，已知各物体质量及背包最大承重，求最多可装入几件物体。

显然，这是一个可以使用贪心法解决的问题。

## 贪心法

### 简单来说

依据紫书所言：

> 它只顾眼前，但却能得到最优解。

大概就是，（在某些情况下）通过实现局部的最优化，以达到整体的最优化。

### Show Me The Code

```python
def Greedy():
    n_w = input().split(' ')
    n,w = int(n_w[0]),int(n_w[1])
    weight = []
    for i in range(n):
        weight.append(int(input()))
    weight.sort()
    amt,sum = 0,0
    while len(weight):
        if sum+weight[0]<=w:
            sum += weight[0]
            weight.pop(0)
            amt += 1
        else:
            break
    print('最多可装入：',amt,'件')
```

### I/O

#### Input

```python
4 10
1
10
2
1
```

#### Outout

```python
最多可装入： 3 件
```

## 后语

然后是动态规划。
