# 编程题 leetcode 9 Palindrome Number

leetcode 9 Palindrome Number 解析

## 难度 1/10

## 题目

Determine whether an integer is a palindrome. Do this without extra space.

---

意思是判断一个整数是否为回文数字。额外要求没有其他的空间

## 解题思路

如果只是简单的判断一下是否为回文那么很简单

``` javascript

let isPalindrome = function(x) {
    let str = String(x);
    return str === str.split('').reverse().join('');
};

```

这样就可以了。所以有了一个要求 `Do this without extra space.` ，意思就是使用o(1)空间利用率来实现。这样就需要通过除、取余的方式来了。

## AC代码

### Javascript

``` javascript

let isPalindrome = function(x) {
    if (x < 0) return false;//负数不是回文数字
    if (x < 10) return true;//个位数必定为回文数字

    let l = 0;
    let data = x;
    while (data){
        data = Math.floor(data / 10);
        l++;
    }

    let head = l;
    let end = 1;

    while (head > end){
        if (getNumberPdata(x, head) !== getNumberPdata(x, end)){
            return false;
        }
        head--;
        end++;
    }

    return true;
};

function getNumberPdata(num, p){
    if (p !== 1){
        num = Math.floor(num / Math.pow(10, p - 1));
    }
    return num % 10;
}
```
## 在线链接

[leetcode 9 Palindrome Number](https://leetcode.com/problems/palindrome-number)

## END

>   2017-5-21    完成

>   2017-5-21    立项
