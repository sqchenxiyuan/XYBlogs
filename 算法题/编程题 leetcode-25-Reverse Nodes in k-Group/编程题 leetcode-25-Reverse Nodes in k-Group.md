# 编程题 leetcode 25 Reverse Nodes in k-Group

leetcode 25 Reverse Nodes in k-Group 解析

## 题目

Given a linked list, reverse the nodes of a linked list k at a time and return its modified list.

k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes in the end should remain as it is.

Example:

Given this linked list: `1->2->3->4->5`

For k = 2, you should return: `2->1->4->3->5`

For k = 3, you should return: `3->2->1->4->5`

----

上一题的升级版，给定一个链表，交换每K个相邻节点并返回其头。

## 解题思路

读出K个节点，翻转后重排就行了，或者直接交换数据内容

## AC代码

### Javascript

``` javascript
let reverseKGroup = function(head, k) {
    let start = new ListNode(0)
    start.next = head
    let now = start
    
    while (1){
        let arr = []

        let n = now
        let next
        for (let i = 0; i < k; i++){
            n = n.next
            if (n){
                arr.push(n)
            } else {
                break
            }
        }
        n && (n = n.next)

        if (arr.length === k){
            while (arr.length){
                now.next = arr.pop()
                now = now.next
            }
            now.next = n
        } else {
            break
        }
    }

    return start.next
}
```
## 在线链接

[reverse-nodes-in-k-group](https://leetcode.com/problems/reverse-nodes-in-k-group)

## END

>   2018-07-26  完成
> 
>   2018-07-26  立项
