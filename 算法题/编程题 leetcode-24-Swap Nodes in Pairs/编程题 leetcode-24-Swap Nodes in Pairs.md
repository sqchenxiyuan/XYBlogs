# 编程题 leetcode 24 Swap Nodes in Pairs

leetcode 24 Swap Nodes in Pairs 解析

## 题目

Given a linked list, swap every two adjacent nodes and return its head.

Example:
```
Given 1->2->3->4, you should return the list as 2->1->4->3.
```
----

给定一个链表，交换每两个相邻节点并返回其头。

## 解题思路

读出两个节点，翻转后重排就行了，或者直接交换数据内容

## AC代码

### Javascript

``` javascript
let swapPairs = function(head) {
    let now = head
    while (now && now.next){
        let n1 = now
        let n2 = now.next

        let v = n1.val
        n1.val = n2.val
        n2.val = v

        now = n2.next
    }

    return head
}
```
## 在线链接

[swap-nodes-in-pairs](https://leetcode.com/problems/swap-nodes-in-pairs)

## END

>   2018-07-25  完成
> 
>   2018-07-25  立项
