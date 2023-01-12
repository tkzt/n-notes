---
title: 0029 - 两数相除
titleTemplate: AC!AC!AC!
date: 2022-08-15
---

两数家族 +1。

## 题目

![](https://s1.ax1x.com/2022/08/15/vawwa6.png)

## 分析

第一反应，考察的是[前缀和](https://tkzt.cn/n-notes/notes/basic-skills/sum-of-prefix.html#VPSidebarNav)，但动手后很快发现这更多体现的是幂逐步增加，考察的应该是 `二分` & [`快速幂`](https://tkzt.cn/n-notes/notes/basic-skills/quick-power.html#VPSidebarNav)。

## 代码

```python
class Solution:
    def divide(self, dividend: int, divisor: int) -> int:
        sign = 1
        if dividend < 0:
            sign = -sign
            dividend = -dividend
        if divisor < 0:
            sign = -sign
            divisor = -divisor

        if dividend == 0 or dividend < divisor:
            return 0

        if divisor == 1:
            result = dividend
        else:
            result = 1
            sum = divisor
            while True:
                if sum + sum <= dividend:
                    result <<= 1
                    sum += sum
                else:
                    if dividend-sum >= 0:
                        result += self.divide(dividend - sum, divisor)
                    break

        if sign<0:
            result = -result

        if result >= 1<<31:
            result = (1<<31)-1
        elif result < -1<<31:
            result = -1<<31

        return result
```

需要注意的是：

```python
1<<31-1 # 1073741824
(1<<31)-1 # 2147483647
```
