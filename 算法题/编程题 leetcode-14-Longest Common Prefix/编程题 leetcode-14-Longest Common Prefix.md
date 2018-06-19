# 编程题 leetcode 14 Longest Common Prefix

leetcode 14 Longest Common Prefix 解析

## 题目

Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string `""`.

Example 1:
```
Input: ["flower","flow","flight"]
Output: "fl"
```

Example 2:
```
Input: ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.
```
----

找一个数组里面的最长公共前缀

## 解题思路

读取最短的字符串的长度，然后一位一位的进行比对就行了

## AC代码

### Javascript

``` javascript
/**
 * @param {string[]} strs
 * @return {string}
 */
let longestCommonPrefix = function(strs) {
    let minLength = strs[0] && strs[0].length || 0
    strs.forEach(str => {
        minLength = Math.min(minLength, str.length)
    })
    let prefix = ""
    for (let i = 0; i < minLength; i++){
        let c = strs[0][i]
        if (strs.some(str => str[i] !== c)){
            break
        }
        prefix = prefix + c
    }
    return prefix
}
```
## 在线链接

[longest-common-prefix](https://leetcode.com/problems/longest-common-prefix/)

## END

>   2018-06-19    完成

>   2018-06-19  立项