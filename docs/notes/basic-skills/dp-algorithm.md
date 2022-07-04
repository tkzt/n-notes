---
title: 动态规划
titleTemplate: 军体拳
---
# 动态规划

## 前言

晚饭想吃火鸡面。

## 有个问题

有若干个物体，已知各物体的质量价值、背包最大承重,且物品不可以部分装入，求装入的最大价值。

显然，这是一个自古以来的动态规划入门示例。

## 动态规划

### 简单说来

简单来说，动态规划就是设计出（或者说是发现）一个状态转移关系（是一种递推关系，依此可以列出状态转移方程），从而可以通过许多或许没有意义的过渡状态，找出最优解。（...）

当然，源码讲得会更清楚。

### Show Me The Code

```python
def Run_DP():
    n_w = input().split(' ')
    n,w = int(n_w[0]),int(n_w[1]) # n是物品总个数，w是最大承重
    weight = input().split(' ')
    value = input().split(' ')
    maxValue = [[0 for j in range(w+1)] for k in range(n+1)] # maxValue[m][n]表示第只装入前 m 个物体可得到的最大价值，此时的背包剩余承重为 n。这是一个倒装句。
    for i in range(1,n+1):
        for j in  range(w+1):
            if j+int(weight[i-1])<=w:
                maxValue[i][j] = maxValue[i-1][j+int(weight[i-1])]+int(value[i-1]) if maxValue[i-1][j+int(weight[i-1])]+int(value[i-1])>maxValue[i-1][j] else maxValue[i-1][j]
            else:
                maxValue[i][j] = maxValue[i-1][j]
    print(maxValue[n][0]) # maxValue[n][0]便是最大价值
```

### I/O

#### Input

```python
1
5 100
77 22 29 50 99
92 22 87 46 90
```

#### Output

```python
133
```

## 后语

是日并没有吃到火鸡面。后会有期的东西罢了。

然后是可恶的最短路大礼包。
