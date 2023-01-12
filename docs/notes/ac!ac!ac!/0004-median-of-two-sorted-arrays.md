---
title: 0004 - 寻找两中序数组中位数
titleTemplate: AC!AC!AC!
date: 2022-08-16
---

这题为啥属于困难。

## 题目

[![](https://s1.ax1x.com/2022/08/16/vwUcqI.png)](https://leetcode.cn/problems/median-of-two-sorted-arrays/description/)

## 分析

首先二分。由于有序，所以合并时，前面比较过的不必再比较，于是再加个索引缓存。

## 代码

```python
class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        merged = nums1+[]
        start_index = 0

        for index, num in enumerate(nums2):
            the_index = self.get_insert_index(merged[start_index:], num)
            merged = merged[:start_index+the_index] + [num] + merged[start_index+the_index:]
            start_index += the_index + 1

        merged_len = len(merged)
        mid = merged_len//2

        if merged_len%2 == 0:
            return (merged[mid]+merged[mid-1])/2
        else:
            return merged[mid]


    def get_insert_index(self, nums, num):
        nums_len = len(nums)

        if nums_len==0:
            return 0

        if nums_len==1:
            return 0 if nums[0]>num else 1
        else:
            mid = nums_len//2
            if nums[mid]==num:
                return mid
            elif nums[mid]<num:
                return mid + 1 + self.get_insert_index(nums[mid+1:], num)
            else:
                return self.get_insert_index(nums[:mid], num)
```
