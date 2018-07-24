# 编程题 leetcode 23 Merge k Sorted Lists

leetcode 23 Merge k Sorted Lists 解析

## 题目

Merge k sorted linked lists and return it as one sorted list. Analyze and describe its complexity.

Example:
```
Input:
[
  1->4->5,
  1->3->4,
  2->6
]
Output: 1->1->2->3->4->4->5->6
```
----

21题的升级版

## 解题思路

和21题解法差不多，但是多了一次循环

## AC代码

### Javascript

``` javascript
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
let mergeKLists = function(lists) {
    if (lists.length === 0) return null
    if (lists.length === 1) return lists[0]

    let arr = []
    for (let i = 0; i < lists.length; i = i + 2){
        if (i === lists.length - 1){
            arr.push(lists[i])
        } else {
            let head = new ListNode(0)
            let current = head
            let listA = lists[i]
            let listB = lists[i + 1]

            while (listA && listB){
                if (listA.val > listB.val){
                    current.next = listB
                    current = listB
                    listB = listB.next
                } else {
                    current.next = listA
                    current = listA
                    listA = listA.next
                }
            }

            if (listA){
                current.next = listA
            } else {
                current.next = listB
            }

            arr.push(head.next)
        }
    }

    return mergeKLists(arr)
}
```
## 在线链接

[generate-parentheses](https://leetcode.com/problems/merge-k-sorted-lists)

## END

>   2018-07-24  完成
> 
>   2018-07-24  立项
