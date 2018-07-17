# 编程题 leetcode 20 Valid Parentheses

leetcode 20 Valid Parentheses 解析

## 题目

Given a string containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.

An input string is valid if:

1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.

Note that an empty string is also considered valid.

Example1:
```
Input: "()"
Output: true
```

Example2:
```
Input: "()[]{}"
Output: true
```

Example3:
```
Input: "(]"
Output: false
```

Example4:
```
Input: "([)]"
Output: false
```

Example5:
```
Input: "{[]}"
Output: true
```
----

判断是否闭合，

## 解题思路

堆栈

## AC代码

### Javascript

``` javascript
let BEAFOR_CHAR = {
    "(": ")",
    "{": "}",
    "[": "]"
}

/**
 * @param {string} s
 * @return {boolean}
 */
let isValid = function(s) {
    let stack = []
    for (let i = 0; i < s.length; i++){
        let c = s[i]
        if (BEAFOR_CHAR[c]){
            stack.push(BEAFOR_CHAR[c])
        } else {
            let rc = stack.pop()
            if (rc !== c){
                return false
            }
        }
    }

    if (stack.length === 0){
        return true
    } else {
        return false
    }
}
```
## 在线链接

[valid-parentheses](https://leetcode.com/problems/valid-parentheses)

## END

>   2018-07-17  完成
> 
>   2018-07-17  立项
