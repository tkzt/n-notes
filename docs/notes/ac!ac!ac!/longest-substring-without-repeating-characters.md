---
title: 无重复字符的最长子串
titleTemplate: AC!AC!AC!
date: 2022-02-19
---

## 题目

[传送门](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)

## 解题

没什么特别的，大致就是遇到重复的就开始新一轮统计。

```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let result = 0;
  let substr = "";
  for (let i of s) {
    const index = substr.indexOf(i);
    if (index > -1) {
      substr.length > result && (result = substr.length);
      substr = substr.slice(index + 1) + i;
    } else {
      substr += i;
    }
  }

  return result > substr.length ? result : substr.length;
};
```
