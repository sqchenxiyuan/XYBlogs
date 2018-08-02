# 编程题 leetcode 28 Implement strStr()

leetcode 28 Implement strStr() 解析

## 题目

Implement strStr().

Return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

Example1:
```
Input: haystack = "hello", needle = "ll"
Output: 2
```

Example2:
```
Input: haystack = "aaaaa", needle = "bba"
Output: -1
```

----

返回匹配的字符串的开始坐标

## 解题思路

一个字符串匹配问题，可以使用相关的算法，这道题我使用了sunday算法来实现，字符串算法将会在博客中专门详细列举的讲述一下

## AC代码

### Javascript

``` javascript
let strStr = function(haystack, needle) {
    //sunday算法

    //计算偏移表
    let p = needle.length
    let shift = {}
    for (let i = 0; i < p; i++){
        shift[needle[i]] = p - i
    }

    //匹配
    let i1 = 0 //主串标识
    let i2 = 0 //子串标识
    for (; i1 < haystack.length;){
        i2 = 0
        while (i2 < p && haystack[i1 + i2] === needle[i2]){ i2++ }
        if (i2 === p) break
        i1 = i1 + (shift[haystack[i1 + p]] || p + 1)
    }
    if (i2 === p) return i1
    return -1
}
```
## 在线链接

[implement-strstr](https://leetcode.com/problems/implement-strstr)

## END

>   2018-08-02  完成
> 
>   2018-08-02  立项