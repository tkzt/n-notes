---
title: 找三元组
titleTemplate: AC!AC!AC!
date: 2019-09-10
---

## 题曰

给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。
注意：答案中不可以包含重复的三元组。

```python
例如, 给定数组 nums = [-1, 0, 1, 2, -1, -4]，
满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]
```

## 解

看到题目，首先想到 ab 剪枝，于是作答如下：

```python
class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        res = []
        dictDeleteRepeat = {}
        lastNum = None
        for i in range(len(nums)-2):
            if lastNum!=nums[i]:
                # 剪枝
                leftValue = 0-nums[i]
                lastNumInner = None
                if leftValue<=nums[-1]+nums[-2] and leftValue>=nums[i + 1]+nums[i + 2]:
                    for j in range(i+1,len(nums)-1):
                        if lastNumInner!=nums[j]:
                            # 再剪
                            leftValueInner = leftValue-nums[j]
                            if leftValueInner<=nums[-1] and leftValueInner>=nums[j + 1]:
                                if leftValueInner in nums[j+1:]:
                                    tempList = [nums[i],nums[j],leftValueInner]
                                    listStr = ''.join([str(item) for item in tempList])
                                    if listStr not in dictDeleteRepeat:
                                        res.append(tempList)
                                        dictDeleteRepeat[listStr] = True
                            lastNumInner = nums[j]
                lastNum = nums[i]
        return res
```

无奈超时，后加以思索，优化第三数是否存在于数组之中的查询，遂 AC。优化后如下：

```python
class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        res = []
        dictDeleteRepeat = {}
        dictNums = {}
        for item in nums:
            dictNums[item] = True
        lastNum = None
        for i in range(len(nums)-2):
            if lastNum!=nums[i]:
                # 剪枝
                leftValue = 0-nums[i]
                lastNumInner = None
                if leftValue<=nums[-1]+nums[-2] and leftValue>=nums[i + 1]+nums[i + 2]:
                    for j in range(i+1,len(nums)-1):
                        if lastNumInner!=nums[j]:
                            # 再剪
                            leftValueInner = leftValue-nums[j]
                            if leftValueInner<=nums[-1] and leftValueInner>=nums[j + 1]:
                                if leftValueInner in dictNums:
                                    tempList = [nums[i],nums[j],leftValueInner]
                                    listStr = ''.join([str(item) for item in tempList])
                                    if listStr not in dictDeleteRepeat:
                                        res.append(tempList)
                                        dictDeleteRepeat[listStr] = True
                            lastNumInner = nums[j]
                lastNum = nums[i]
        return res
```
