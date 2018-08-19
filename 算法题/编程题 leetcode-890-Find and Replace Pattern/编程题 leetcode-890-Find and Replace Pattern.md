# 编程题 leetcode 890 Find and Replace Pattern

leetcode 890 Find and Replace Pattern 解析

## 题目

You have a list of `words` and a `pattern`, and you want to know which words in `words` matches the pattern.

A word matches the pattern if there exists a permutation of letters `p` so that after replacing every letter `x` in the pattern with `p(x)`, we get the desired word.

(Recall that a permutation of letters is a bijection from letters to letters: every letter maps to another letter, and no two letters map to the same letter.)

Return a list of the words in `words` that match the given pattern. 

You may return the answer in any order.

----

找出与给出的模式字符串相符合的字符串

## 解题思路

根据单词不同和出现顺序，将模式翻译出来，然后比对模式字符串就行了

## AC代码

### Javascript

``` javascript
let findAndReplacePattern = function(words, pattern) {
    let p = getPattern(pattern)
    words = words.filter(word => p === getPattern(word))
    return words
}

function getPattern(str){
    let obj = {}
    let p = ""
    let n = 0
    for (let i = 0; i < str.length; i++){
        let c = str.charAt(i)
        if (obj[c]){
            p += obj[c]
        } else {
            obj[c] = String.fromCharCode([n + 97])
            p += obj[c]
            n++
        }
    }
    return p
}
```
## 在线链接

[find-and-replace-pattern](https://leetcode.com/problems/find-and-replace-pattern)

## END

>   2018-08-19  完成
> 
>   2018-08-19  立项