# 编程题 leetcode 7 Reverse Integer

leetcode 7 Reverse Integer 解析

## 难度 1/10

## 题目

Reverse digits of an integer.

Example1: `x = 123, return 321`
Example2: `x = -123, return -321`

The input is assumed to be a 32-bit signed integer. Your function should return 0 when the reversed integer overflows.

---

就是把数字反过来啦。。。大于32位有符号整型范围的就返回0。

## 解题思路

这道题很简单只需要将数字转化为字符串，判断一下正负翻过来就是啦。用脚本语言分分钟就搞定了=、=

## AC代码

### Javascript

``` javascript

let reverse = function(x) {
    let flag = 1;
    x = String(x).split('');
    if (x[0] === '-'){
        flag = -1;
        x.shift();
    }
    x = parseInt(x.reverse().join(''))
    if (x > Math.pow(2, 31)){
        return 0;
    }
    return x * flag;
};

```
## 在线链接

[leetcode 6 Reverse Integer](https://leetcode.com/problems/reverse-integer)

## END

>   2017-5-7    完成

>   2017-5-7    立项
