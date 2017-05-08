# 编程题 leetcode 8 String to Integer (atoi)

leetcode 8 String to Integer (atoi) 解析

## 难度 3/10

## 题目

Implement `atoi` to convert a string to an integer.

---

这破题其实很简单，String转Number,但是压根没给你说明有什么奇葩情况，下面总结需要处理的情况

1.  单符号： '+','-'  为0
2.  多段：   '+-2' -> 0, '+20-1+2' -> 20 只取最前面的一个满足要求的
3.  限制：   数值不能超过32为有符号整形    
4.  前后空格：   前后会出现空格

## 解题思路

只要知道了会有哪些奇葩情况就好弄多了，先去字符串首尾空格，然后找出第一段数值，弄出数值，判断大小完事。

## AC代码

### Javascript

``` javascript

let myAtoi = function(str) {
    str = str.trim().match(/^[\+-]?\d*/g)[0];
    let num = Number(str + '0') / 10;

    if (num > 2147483647){
        num = 2147483647
    }

    if (num < -2147483648){
        num = -2147483648
    }

    return num;
};

```
## 在线链接

[leetcode 8 String to Integer (atoi)](https://leetcode.com/problems/string-to-integer-atoi)

## END

>   2017-5-8    完成

>   2017-5-8    立项
