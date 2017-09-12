# 编程题 leetcode-1-Two Sum

leetcode 1 Two Sum解析

## 题目

Given an array of integers, return indices of the two numbers such that they add up to a specific target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Examples:

```

Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].

```

-----

意思就是找数组中和为目标值得2个数，输出它们的下标

## 解题思路

JS可以利用对象作为hash表，利用和目标的差值快速判断是否过去的一个数满足和值为目标

## AC代码

### Javascript

``` javascript

let twoSum = function(nums, target) {
    let hash = {}
    for(let i = 0; i < nums.length; i++){
        if(hash[target - nums[i]] !== undefined){
            return [hash[target - nums[i]], i]
        }else{
            hash[nums[i]] = i
        }
    }
};

```

## 在线链接

[two-sum](https://leetcode.com/problems/two-sum)

## END

> 2017-9-12 完成

> 2017-9-12 立项
