# 编程题 leetcode 888 Fair Candy Swap

leetcode 888 Fair Candy Swap 解析

## 题目

Alice and Bob have candy bars of different sizes:` A[i]` is the size of the `i`-th bar of candy that Alice has, and `B[j]`is the size of the `j`-th bar of candy that Bob has.

Since they are friends, they would like to exchange one candy bar each so that after the exchange, they both have the same total amount of candy.  (The total amount of candy a person has is the sum of the sizes of candy bars they have.)

Return an integer array `ans` where `ans[0]` is the size of the candy bar that Alice must exchange, and `ans[1]` is the size of the candy bar that Bob must exchange.

If there are multiple answers, you may return any one of them.  It is guaranteed an answer exists.

Example1:
```
Input: A = [1,1], B = [2,2]
Output: [1,2]
```

Example2:
```
Input: A = [1,2], B = [2,3]
Output: [1,2]
```

Example3:
```
Input: A = [2], B = [1,3]
Output: [2,3]
```

Example4:
```
Input: A = [1,2,5], B = [2,4]
Output: [5,4]
```

----

爱丽丝和鲍勃有一堆糖，求交换一次后双方糖的总大小相等，至少各自需要交换多大的糖

## 解题思路

刚开始以为是可以多个进行交换想复杂了，只是一次就很简单了，找出差异，然后遍历找到刚好满足需求的最小的两个糖就行了

## AC代码

### Javascript

``` javascript
let fairCandySwap = function(A, B) {
    let sumA = A.reduce((sum, x) => sum + x, 0)
    let sumB = B.reduce((sum, x) => sum + x, 0)
    A.sort((a, b) => a - b)
    B.sort((a, b) => a - b)

    let d = sumA - sumB
    let i = 0, j = 0
    while (i < A.length && j < B.length){
        let x = A[i] - B[j]
        if (2 * x === d){
            break
        } else if (2 * x < d){
            i++
        } else {
            j++
        }
    }

    return [A[i], B[j]]
}
```
## 在线链接

[fair-candy-swap](https://leetcode.com/problems/fair-candy-swap)

## END

>   2018-08-19  完成
> 
>   2018-08-19  立项