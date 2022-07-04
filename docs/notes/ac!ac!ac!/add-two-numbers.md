---
title: 两数相加
titleTemplate:  AC!AC!AC!
---
# 两数相加

## 题目

![](https://img-blog.csdnimg.cn/a7647c0b61144ce4ba5db7d452b727f1.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zm26Iqx5byA,size_20,color_FFFFFF,t_70,g_se,x_16)


## 分析

没啥

## 代码

```python
# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution(object):
    def addTwoNumbers(self, l1, l2):
        """
        :type l1: ListNode
        :type l2: ListNode
        :rtype: ListNode
        """
        overflow = False
        result = ListNode()
        current = result
        last = None
        node1, node2 = l1, l2

        while True:
            item1 = node1.val if node1 and node1.val else 0
            item2 = node2.val if node2 and node2.val else 0
            sum = item1+item2+overflow
            overflow = sum//10
            current.val = sum%10
            current.next = ListNode()

            if node1:
                node1 = node1.next
            if node2:
                node2 = node2.next
            last = current
            current = current.next

            if not node1 and not node2:
                break
        if overflow:
            current.val = overflow
        else:
            last.next = None
        return result
```
