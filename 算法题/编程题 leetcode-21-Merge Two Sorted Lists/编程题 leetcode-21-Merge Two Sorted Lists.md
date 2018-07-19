# 编程题 leetcode 21 Merge Two Sorted Lists

leetcode 21 Merge Two Sorted Lists 解析

## 题目

Merge two sorted linked lists and return it as a new list. The new list should be made by splicing together the nodes of the first two lists.

Example:
```
Input: 1->2->4, 1->3->4
Output: 1->1->2->3->4->4
```
----

合并两条按顺序排序的链

## 解题思路

很简单的合并

## AC代码

### Javascript

``` javascript
let mergeTwoLists = function(l1, l2) {
    let l3 = null
    let l3end = null
    while (l1 || l2){
        let node
        if (l1 && l2 && l1.val < l2.val || !l2){
            node = l1
            l1 = l1.next
        } else {
            node = l2
            l2 = l2.next
        }

        if (l3end){
            l3end.next = node
        } else {
            l3 = node
        }
        l3end = node
    }

    return l3
}
```
## 在线链接

[merge-two-sorted-lists](https://leetcode.com/problems/merge-two-sorted-lists)

## END

>   2018-07-19  完成
> 
>   2018-07-19  立项
