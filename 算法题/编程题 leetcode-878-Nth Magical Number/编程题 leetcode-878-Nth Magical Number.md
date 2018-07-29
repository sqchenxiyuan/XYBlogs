# 编程题 leetcode 878 Nth Magical Number

leetcode 878 Nth Magical Number 解析

## 题目

A positive integer is magical if it is divisible by either A or B.

Return the N-th magical number.  Since the answer may be very large, return it modulo 10^9 + 7.

Example1:
```
Input: N = 1, A = 2, B = 3
Output: 2
```

Example2:
```
Input: N = 4, A = 2, B = 3
Output: 6
```

Example3:
```
Input: N = 5, A = 2, B = 4
Output: 10
```

Example4:
```
Input: N = 3, A = 6, B = 4
Output: 8
```
----

求可以被给出的两个数整除的自然数中的第N个

## 解题思路

直接计算出两个数和合数内的所有组合，然后以这个数组为整体，合数的循环内可被两个数整除的个数是固定的，所以可以直接将N除以数组的长度，取证获取循环数，取余获取循环内的序号

是不是很暴力~~~

## AC代码

### Javascript

``` javascript
let nthMagicalNumber = function(N, A, B) {
    let set = new Set()
    for (let i = 1; i <= A; i++){
        set.add(B * i)
    }
    for (let i = 1; i <= B; i++){
        set.add(A * i)
    }
    let arr = [...set].sort((a, b) => a - b)
    
    let x = A * B
    let n = arr.length

    let scale = Math.floor(N / n)
    let nth = N % n

    return ((x * scale) % 1000000007 + (nth > 0 && arr[nth - 1])) % 1000000007
}
```
## 在线链接

[nth-magical-number](https://leetcode.com/problems/nth-magical-number)

## END

>   2018-07-29  完成
> 
>   2018-07-29  立项