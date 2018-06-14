# 编程题 leetcode 10 Regular Expression Matching

leetcode 10 Regular Expression Matching解析

## 题目

Given an input string (s) and a pattern (p), implement regular expression matching with support for '.' and '*'.

```
'.' Matches any single character.
'*' Matches zero or more of the preceding element.
```

The matching should cover the entire input string (not partial).

Note:

+ `s` could be empty and contains only lowercase letters `a-z`.
+ `p` could be empty and contains only lowercase letters `a-z`, and characters like `.` or `*`.

-----

其实就是写个支持`*`和`.`符号的正则表达式检测函数

## 解题思路

JS的话直接一个正则上去就行了，但是这就没意义了，我采用的构建状态机的方式，首先读取正则字符串构建一个状态机，然后运行就行了，但是效率比较低。

还有一种就是使用动态规划的方式来，可以将问题分化为更短的串和更短的正则来进行匹配。

## AC代码

### Javascript

构建状态机版本:
``` javascript
let isMatch = function(s, p) {
    //构建有限状态机
    let statuses = []
    let status = {
        ways: []
    }
    statuses.push(status)

    for (let i = 0; i < p.length; i++){
        let c = p[i]
        if (p[i + 1] === "*"){
            status.ways.push({
                limit: "",
                to: statuses.length
            })

            status = {
                ways: []
            }

            status.ways.push({
                limit: c,
                to: statuses.length
            })

            i++
        } else {
            status.ways.push({
                limit: c,
                to: statuses.length
            })

            status = {
                ways: []
            }
        }
        statuses.push(status)
    }
    status.isEnd = true

    return checkStr(statuses, 0, s)
}

function checkStr(regStatuses, status, str){
    let regStatus = regStatuses[status]

    let ways = regStatus.ways
    let char = str[0]
    for (let i = 0; i < regStatus.ways.length; i++){
        let way = ways[i]
        if (char && (char === way.limit || way.limit === ".")){
            if (checkStr(regStatuses, way.to, str.slice(1))){
                return true
            }
        } else if (way.limit === ""){
            if (checkStr(regStatuses, way.to, str)){
                return true
            }
        }
    }

    if (str.length === 0){
        return regStatuses[status].isEnd || false
    }

    return false
}
```

动态规划版本:
``` javascript
let isMatch = function(s, p) {
    let cache = new Array(s.length + 1)
    return dp(cache, 0, 0, s, p)
}

function dp(cache, i, j, s, p){
    if (cache[i] && cache[i][j] !== undefined){
        return cache[i][j] === true
    }
    let answer = false
    if (j === p.length){
        answer = i === s.length 
    } else {
        let currentMatch = s[i] === p[j] || s[i] && p[j] === "." || false
        if (p[j + 1] === "*"){
            answer = currentMatch && dp(cache, i + 1, j, s, p) || dp(cache, i, j + 2, s, p)
        } else {
            answer = currentMatch && dp(cache, i + 1, j + 1, s, p)
        }
    }

    cache[i] = cache[i] || new Array(p.length + 1)
    cache[i][j] = answer
    return answer
}
```

偷懒版本:
``` javascript
let isMatch = function(s, p) {
    return new RegExp(`^${p}$`).test(s)
}

```

## 在线链接

[regular-expression-matching](https://leetcode.com/problems/regular-expression-matching)

## END

>   2018-06-14  完成

>   2018-06-14  立项
