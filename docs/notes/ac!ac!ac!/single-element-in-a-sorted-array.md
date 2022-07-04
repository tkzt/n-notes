---
title: 有序数组中的单一元素
titleTemplate: AC!AC!AC!
---
# 有序数组中的单一元素

## 题目

[传送门](https://leetcode-cn.com/problems/single-element-in-a-sorted-array/)

## 解题

这题很经典，考察的基础知识：两个相同的数相异或得零、零与其他数相异或得其他数本身。有种消消乐的意思，更巧的在于做题的这一天是 03 月 14 日。

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function(nums) {
    let result = 0;
    for(const i of nums){
        result ^= i;
    }
    return result
};
```




