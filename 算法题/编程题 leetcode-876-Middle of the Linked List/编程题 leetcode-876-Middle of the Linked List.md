# 编程题 leetcode 876 Middle of the Linked List

leetcode 876 Middle of the Linked List 解析

## 题目

Given a non-empty, singly linked list with head node `head`, return a middle node of linked list.

If there are two middle nodes, return the second middle node.

Example1:
```
Input: [1,2,3,4,5]
Output: Node 3 from this list (Serialization: [3,4,5])
The returned node has value 3.  (The judge's serialization of this node is [3,4,5]).
Note that we returned a ListNode object ans, such that:
ans.val = 3, ans.next.val = 4, ans.next.next.val = 5, and ans.next.next.next = NULL.
```

Example2:
```
Input: [1,2,3,4,5,6]
Output: Node 4 from this list (Serialization: [4,5,6])
Since the list has two middle nodes with values 3 and 4, we return the second one.
```
----

获取链表中间的节点

## 解题思路

遍历链表并计数，同时有个当前遍历的中间节点的引用，每次检查中间节点是否会变化，变化则向下移动一位

## AC代码

### Javascript

``` javascript
let middleNode = function(head) {
    let center = head
    let now = head.next
    let count = 1
    while (now){
        if (Math.floor(count / 2) !== Math.floor((count + 1) / 2)){
            center = center.next
        }
        now = now.next
        count++
    }

    return center
}
```
## 在线链接

[middle-of-the-linked-list](https://leetcode.com/problems/middle-of-the-linked-list)

## END

>   2018-07-29  完成
> 
>   2018-07-29  立项
