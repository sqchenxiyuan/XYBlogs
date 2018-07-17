# 编程题 leetcode 19 Remove Nth Node From End of List

leetcode 19 Remove Nth Node From End of List 解析

## 题目

Given a linked list, remove the n-th node from the end of list and return its head.

Examples:

```
Given linked list: 1->2->3->4->5, and n = 2.

After removing the second node from the end, the linked list becomes 1->2->3->5.
```
----

删除链表的倒数第几个节点

## 解题思路

遍历，存储，找

## AC代码

### Javascript

``` javascript
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
let removeNthFromEnd = function(head, n) {
    let arr = []
    while (1){
        arr.push(head)
        head = head.next
        if (!head) break
    }

    if (arr.length === n){
        return arr[1] || null
    } else {
        arr[arr.length - n - 1].next = arr[arr.length - n].next
        return arr[0]
    }
}
```
## 在线链接

[remove-nth-node-from-end-of-list](https://leetcode.com/problems/remove-nth-node-from-end-of-list)

## END

>   2018-07-16  完成

>   2018-07-16  立项
