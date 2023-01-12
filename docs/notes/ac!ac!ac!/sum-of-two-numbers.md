---
title: 两数之和
titleTemplate: AC!AC!AC!
date: 2019-09-10
---

## 题曰

给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
示例:

```python
给定 nums = [2, 7, 11, 15], target = 9
因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
```

## 解

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        for i in range(len(nums)):
            if target-nums[i] in nums:
                for j in range(i+1,len(nums)):
                    if target-nums[i] == nums[j]:
                        return [i,j]
        return [-1,-1]
```
