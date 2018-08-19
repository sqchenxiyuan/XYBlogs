# 编程题 leetcode 891 Sum of Subsequence Widths

leetcode 891 Sum of Subsequence Widths 解析

## 题目

Given an array of integers `A`, consider all non-empty subsequences of `A`.

For any sequence S, let the width of S be the difference between the maximum and minimum element of S.

Return the sum of the widths of all subsequences of A. 

As the answer may be very large, **return the answer modulo 10^9 + 7**.

----

找出所有子序列的宽度(最大减去最小)

## 解题思路

最开始想到的是找出每种最大最小的组合，然后计算这种组合的出现次数(其实就是排序后内部长度的所有子串数量，也就是 `2 ^ (j - i - 1)`，但是找组合的过程是双重循环，在大数据量的情况下会超时

``` javascript
for(let i = 0; i < A.length; i++){
    for(let j = i + 1; j < A.length; j++){
        let data = A[j] - A[i]
        sum = (sum + data * pow2(j - i - 1) % 1000000007) % 1000000007
    }
}
```

后来想到了可以每个数据单独计算他成为最大值和最小值的情况，就可以避免双重循环了

``` javascript
for(let i = 0; i < A.length; i++){
    sum = (sum + A[i] * pow2(i)) % 1000000007 //计算所有最大值的情况
    sum = (sum - A[i] * pow2(l - i - 1)) % 1000000007 //计算所有最小值的情况
}
```

## AC代码

### Javascript

``` javascript
let sumSubseqWidths = function(A) {
    A.sort((a, b) => a - b)

    let pow2Map = {}
    function pow2(l){
        if (l === 0) return 1
        if (pow2Map[l]) return pow2Map[l]
        pow2Map[l] = (pow2(l - 1) * 2) % 1000000007
        return pow2Map[l]
    }

    let sum = 0
    let l = A.length
    for (let i = 0; i < A.length; i++){
        sum = (sum + A[i] * pow2(i)) % 1000000007
        sum = (sum - A[i] * pow2(l - i - 1)) % 1000000007
    }

    return (sum + 1000000007) % 1000000007
}
```
## 在线链接

[sum-of-subsequence-widths](https://leetcode.com/problems/sum-of-subsequence-widths)

## END

>   2018-08-19  完成
> 
>   2018-08-19  立项