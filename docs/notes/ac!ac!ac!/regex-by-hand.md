---
title: 手撕正则
titleTemplate: AC!AC!AC!
date: 2019-09-10
---

## 题曰

给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '\*' 的正则表达式匹配。

```python
'.' 匹配任意单个字符
'*' 匹配零个或多个前面的那一个元素
```

所谓匹配，是要涵盖 整个 字符串 s 的，而不是部分字符串。
<b>说明:</b>

```python
s 可能为空，且只包含从 a-z 的小写字母。
p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *。
```

<b>示例 1:</b>

```python
输入:
s = "aa"
p = "a"
输出: false
解释: "a" 无法匹配 "aa" 整个字符串。
```

<b>示例 2:</b>

```python
输入:
s = "aa"
p = "a*"
输出: true
解释: 因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
```

## 解

很显然用回溯法，但为了干掉 s: `aaaaaaaaaaaab`，p: `a*a*a*a*a*a*a*a*a*c` 这种拦路虎，还需要多考虑许多。

```python
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        return self.withRecalling(s,p)

    # sp means 'start point'
    def withRecalling(self,s,p,charLast='sp'):
        if len(s)>0:
            if len(p)>0:
                if p[-1]!='.' and p[-1]!='*' and p[-1]!=s[-1]:return False
            else:return False
            # certain character
            if s[0]==p[0]:
                resCertain = self.withRecalling(s[1:],p[1:],p[0])
                if resCertain:return True
            # dot
            if p[0]=='.':
                resDot = self.withRecalling(s[1:],p[1:],p[0])
                if resDot:return True
            # star
            if p[0]=='*':
                if charLast==s[0] or charLast=='.':
                    resStarRepeat = self.withRecalling(s[1:],p[0:],charLast)
                    if resStarRepeat:return True
                if len(p)>1:
                    resStar = self.withRecalling(s[:],p[1:],charLast)
                    if resStar:return True
            # lots of times or none
            if 1<len(p) and p[1]=='*':
                resLater = self.withRecalling(s[:],p[1:],p[0])
                if resLater:return True
        else:
            #
            if s==p:
                return True
            elif p[0]=='*':
                resLater = self.withRecalling(s[:],p[1:],p[0])
                if resLater:return True
            elif len(p)>1 and p[1]=='*':
                resLater = self.withRecalling(s[:],p[2:],p[0])
                if resLater:return True
            else:return False
        return False
```

后来看大佬们还有用动规的<span class="text-line-through">，有缘的话再折腾</span>。
