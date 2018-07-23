# 编程题 leetcode 22 Generate Parentheses

leetcode 22 Generate Parentheses 解析

## 题目

Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

For example, given n = 3, a solution set is:

```
[
  "((()))",
  "(()())",
  "(())()",
  "()(())",
  "()()()"
]
```
----

给出n个括弧对，输出所有可能

## 解题思路

相当于出栈入栈的顺序，可以用递归的思路实现

## AC代码

### Javascript

``` javascript
/**
 * @param {number} n
 * @return {string[]}
 */
let generateParenthesis = function(n) {
    return getNextChoice("", n, n)
}

function getNextChoice(str, left, right){
    if (left === 0 && right === 0) return [str]

    let arr = []

    if (left > 0){
        arr = arr.concat(getNextChoice(str + "(", left - 1, right))
    }

    if (left < right){
        if (left === 0){
            arr.push(str + new Array(right).fill(")").join(""))
        } else {
            arr = arr.concat(getNextChoice(str + ")", left, right - 1))
        }
    }

    return arr
}
```
## 在线链接

[generate-parentheses](https://leetcode.com/problems/generate-parentheses/)

## END

>   2018-07-23  完成
> 
>   2018-07-23  立项
