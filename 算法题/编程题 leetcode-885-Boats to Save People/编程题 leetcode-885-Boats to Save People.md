# 编程题 leetcode 885 Boats to Save People

编程题 leetcode 885 Boats to Save People 解析

## 题目

The i-th person has weight `people[i]`, and each boat can carry a maximum weight of `limit`.

Each boat carries at most 2 people at the same time, provided the sum of the weight of those people is at most `limit`.

Return the minimum number of boats to carry every given person.  (It is guaranteed each person can be carried by a boat.)

Example1:
```
Input: people = [1,2], limit = 3
Output: 1
Explanation: 1 boat (1, 2)
```

Example2:
```
Input: people = [3,2,2,1], limit = 3
Output: 3
Explanation: 3 boats (1, 2), (2) and (3)
```

Example3:
```
Input: people = [3,5,3,4], limit = 5
Output: 4
Explanation: 4 boats (3), (3), (4), (5)
```
----

有i个人要过河people[i]代表每个人的重量，有一个船，可以载limit的重量，每次最多两人，求全部搬过去的最小次数

## 解题思路

一开始想复杂了，最后总结就是最大的和最小的进行组合，是最好的，因为只能两个人，所以只需要排序后，向中间遍历组合就行了

## AC代码

### Javascript

``` javascript
let numRescueBoats = function(people, limit) {
    people.sort((a, b) => a - b)

    let count = 0
    let i = 0
    let j = people.length - 1
    while (i <= j){
        count++
        if (i === j) break
        if (people[i] + people[j] <= limit) i++
        j--
    }
    return count
}
```
## 在线链接

[boats-to-save-people](https://leetcode.com/problems/boats-to-save-people)

## END

>   2018-08-05  完成
> 
>   2018-08-05  立项