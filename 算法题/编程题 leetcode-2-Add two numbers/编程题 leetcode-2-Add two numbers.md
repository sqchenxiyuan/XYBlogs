# 编程题 leetcode 2 Add Two Numbers

leetcode 2 Add Two Numbers

## 题目

You are given two `non-empty` linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Examples:

```

`Input`: (2 -> 4 -> 3) + (5 -> 6 -> 4)

`Output`: 7 -> 0 -> 8

```

-----

意思是两个用链表构成的数相加，得出一个新的链表构成的数

## 解题思路

模拟即可~~

## AC代码

### Javascript

``` javascript

let addTwoNumbers = function(l1, l2) {
    let result = null;
    let now;
    let newNode;
    let i = l1, 
        j = l2, 
        x, 
        y = 0;

    while (true){
        x = i.val + j.val + y;
        if (x >= 10){
            y = 1;
        } else {
            y = 0;
        }
        
        newNode = new ListNode(x % 10);
        if (result){
            now.next = newNode;
            now = newNode;
        } else {
            result = newNode;
            now = result;
        }
        
        if (y === 0){
            if (!i.next){
                now.next = j.next
                break
            }
    
            if (!j.next){
                now.next = i.next
                break
            }
        }
        
        
        if (i.next) i = i.next
        else i = new ListNode(0)
        if (j.next) j = j.next
        else j = new ListNode(0)
    }
    
    return result
};

```

## 在线链接

[Add Two Numbers](https://leetcode.com/problems/add-two-numbers)

## END

> 2017-9-19 完成

> 2017-9-19 立项
