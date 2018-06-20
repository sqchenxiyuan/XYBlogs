# 编程题 leetcode 16 3Sum Closest

leetcode 16 3Sum Closest 解析

## 题目

Given an array `nums` of n integers and an integer target, find three integers in `nums` such that the sum is closest to `target`. Return the sum of the three integers. You may assume that each input would have exactly one solution.

Examples:

```

Given array nums = [-1, 2, 1, -4], and target = 1.

The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).

```
----

意思就是3个数的和与目标最近的组合

## 解题思路

排序后，遍历就行了，然后可以通过一些情况（当3个数的和大于目标时就没必要增加了）来加速

## AC代码

### Javascript

``` javascript
let threeSumClosest = function(nums, target) {
    nums.sort((a, b) => a - b)
    let close = Infinity
    let closeSum = 0
    for (let i = 0; i < nums.length - 2; i++){
        let a = nums[i]
        let b = nums[i + 1]
        let c = nums[i + 2]
        
        
        for (let j = i + 1; j < nums.length - 1; j++){
            let b = nums[j]
            let c = nums[j + 1]
            
            for (let q = j + 1; q < nums.length; q++){
                let c = nums[q]
                let sum = a + b + c
                let d = Math.abs(target - sum)
                if (d < close){
                    // console.log(a, b, c, sum)
                    close = d
                    closeSum = sum
                }

                if (target < a + b + c){
                    break
                }
            }

            if (target < a + b + c ){
                break
            }
        }

        if (target < a + b + c ){
            break
        }
    }
    return closeSum
}
```
## 在线链接

[3sum-closest](https://leetcode.com/problems/3sum-closest/)

## END

>   2018-06-20  完成

>   2018-06-20  立项
