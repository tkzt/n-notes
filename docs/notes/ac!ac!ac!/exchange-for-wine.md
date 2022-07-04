---
title: LeetCode-1518 换酒问题
titleTemplate: AC!AC!AC!
---
# LeetCode-1518 换酒问题

## [题目](https://leetcode-cn.com/problems/water-bottles/submissions/)

![在这里插入图片描述](https://img-blog.csdnimg.cn/8278eea3ae1f469d903ac2f59c447ef4.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zm26Iqx5byA,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/08c75090d70742b49da3aaad5a91d955.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zm26Iqx5byA,size_20,color_FFFFFF,t_70,g_se,x_16)

## 分析

酒 -> 空瓶 -> 酒 -> 空瓶 这太递归了。

## 代码

```python
class Solution(object):
    def numWaterBottles(self, numBottles, numExchange):
        """
        :type numBottles: int
        :type numExchange: int
        :rtype: int
        """
        exchange = numBottles//numExchange
        if exchange==0:
            return numBottles
        else:
            left = numBottles%numExchange
            return numBottles + self.numWaterBottles(left+exchange, numExchange) - left
```
