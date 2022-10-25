---
title: 0006 - Z 字形变换
titleTemplate: AC!AC!AC!
---

# Z 字形变换

不是说 Z 形变换，就真的要 Z 形变换。

## 题目

将一个给定字符串 `s` 根据给定的行数 `numRows` ，以从上往下、从左到右进行 `Z` 字形排列。

比如输入字符串为 "PAYPALISHIRING" 行数为 3 时，排列如下：

```
P   A   H   N
A P L S I I G
Y   I   R
```

之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如：`"PAHNAPLSIIGYIR"`。

请你实现这个将字符串进行指定行数变换的函数：

```
string convert(string s, int numRows);
```

**示例 1：**

```
输入：s = "PAYPALISHIRING", numRows = 3
输出："PAHNAPLSIIGYIR"
```

**示例 2：**

```
输入：s = "PAYPALISHIRING", numRows = 4
输出："PINALSIGYAHRPI"
解释：
P     I    N
A   L S  I G
Y A   H R
P     I
```

**示例 3**

```
输入：s = "A", numRows = 1
输出："A"
```

**提示**

- `1 <= s.length <= 1000`
- `s` 由英文字母（小写和大写）、`','` 和 `'.'` 组成
- `1 <= numRows <= 1000`

<!-- <font size=1> -->

_来源：力扣（LeetCode）<br>
链接：[zigzag-conversion](https://leetcode.cn/problems/zigzag-conversion)_
<!-- </font> -->

## 分析

第一反应是树的 N 序遍历，但是对不上，随即像每次手动算旋转后图片坐标那般硬上，AC 了。

## 代码

```python
class Solution:
    def convert(self, s: str, numRows: int) -> str:
        str_len = len(s)

        if numRows > 2:
            result = ''
            batch = numRows + numRows - 2
            cols = str_len // batch
            left = str_len - cols * batch
            cols = cols*2 + (2 if left>numRows else 1)
            for r in range(numRows):
                for c in range(cols):
                    if c%2 and (r==0 or r==numRows-1):
                        continue
                    else:
                        col = (c+1)//2
                        target_index = col*batch - 1

                        if c % 2:
                            target_index -= r - 1
                        else:
                            target_index += r + 1

                        if target_index>=0 and target_index<str_len:
                            result += s[target_index]
            return result
        elif numRows==2:
            return s[::2]+s[1::2]
        else:
            return s
```
