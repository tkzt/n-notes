---
title: 最长回文子串
titleTemplate: AC!AC!AC!
---
# 最长回文子串

## 题目

[传送门](https://leetcode-cn.com/problems/longest-palindromic-substring/)

## 解题

很显然，回文子串首尾加相同字母依然是回文子串，这一点很动态规划。

```js
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    const dp = new Array(s.length).fill(null).reduce((pre)=>[...pre, new Array(s.length).fill(false)], []);
    let result='';

    for(let i=0; i<s.length; i++){
        for(let j=0; j<s.length; j++){
            if(j+i < s.length){
                if(i===0){
                    dp[j][j+i] = true
                }else if(i===1){
                    dp[j][j+i] = s[j]===s[j+i]
                }else{
                    dp[j][j+i] = dp[j+1][j+i-1] && s[j]===s[j+i]
                }
                
                if(dp[j][j+i] && result.length<i+1){
                    result = s.slice(j, j+i+1)
                }
            }else{
                break;
            }
        }
    }

    return result;
};
```

### Note That

一个 JS 知识点，直接：

```js
new Array(s.length).fill(new Array(s.length).fill(false))
```

得到的二维数组的第二维其实是同一个对象，显然不妥。




