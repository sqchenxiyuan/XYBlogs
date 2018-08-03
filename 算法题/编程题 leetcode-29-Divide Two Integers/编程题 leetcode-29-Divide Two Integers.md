# 编程题 leetcode 29 Divide Two Integers

leetcode 29 Divide Two Integers 解析

## 题目

Given two integers dividend and divisor, divide two integers without using multiplication, division and mod operator.

Return the quotient after dividing dividend by divisor.

The integer division should truncate toward zero.

Example1:
```
Input: dividend = 10, divisor = 3
Output: 3
```

Example2:
```
Input: dividend = 7, divisor = -3
Output: -2
```
----

不能用除法、乘法、取余运算来求商

## 解题思路

可以先两倍两倍的增加寻找最大的，然后相当于在找二进制

## AC代码

### Javascript

``` javascript
let divide = function(dividend, divisor) {
    let negative = false //是否为负数
    
    if (dividend < 0) {
        dividend = -dividend
        negative = !negative
    }

    if (divisor < 0) {
        divisor = -divisor
        negative = !negative
    }

    let sumarr = [{
        sum: 0,
        num2: 0
    }, {
        sum: divisor,
        num2: 1
    }]
    for (let i = 2;;i++){
        let last = sumarr[i - 1] 
        let obj = {
            sum: last.sum + last.sum,
            num2: last.num2 + last.num2
        }
        if (obj.sum > dividend){
            break
        } else {
            sumarr.push(obj)
        }
    }

    let residue = dividend
    let number = 0
    for (let i = sumarr.length - 1; i > 0; i--){
        let obj = sumarr[i]
        if (residue >= obj.sum){
            number = number + obj.num2
            residue = residue - obj.sum
        }
    }
    if (negative) number = -number

    if (number < -Math.pow(2, 31) || number > Math.pow(2, 31) - 1){
        return Math.pow(2, 31) - 1
    }
    
    return number
}
```
## 在线链接

[divide-two-integers](https://leetcode.com/problems/divide-two-integers)

## END

>   2018-08-03  完成
> 
>   2018-08-03  立项