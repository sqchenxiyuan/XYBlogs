# 编程题 leetcode 17 Letter Combinations of a Phone Number

leetcode 17 Letter Combinations of a Phone Number 解析

## 题目

Given a string containing digits from `2-9` inclusive, return all possible letter combinations that the number could represent.

A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

Examples:

```
Input: "23"
Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
```
----

意思就是求9键输入的组合

## 解题思路

就是个拼接组合的问题。没啥难度

## AC代码

### Javascript

``` javascript
let NUM_MAP = {
    2: ["a", "b", "c"],
    3: ["d", "e", "f"],
    4: ["g", "h", "i"],
    5: ["j", "k", "l"],
    6: ["m", "n", "o"],
    7: ["p", "q", "r", "s"],
    8: ["t", "u", "v"],
    9: ["w", "x", "y", "z"],
}

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    let data = digits.split("").map(str => str.charCodeAt(0) - 48)
    if(data.length === 0) return []

    let currentarr = [""]

    data.forEach(num => {
        let numarr = NUM_MAP[num]

        let newarr = []
        currentarr.forEach(str => {
            numarr.forEach(c => {
                newarr.push(str + c)
            })
        })

        currentarr = newarr
    })

    return currentarr
}
```
## 在线链接

[letter-combinations-of-a-phone-number](https://leetcode.com/problems/letter-combinations-of-a-phone-number)

## END

>   2018-07-11  完成

>   2018-07-11  立项
