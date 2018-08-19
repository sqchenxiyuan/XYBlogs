# 编程题 leetcode 884 Uncommon Words from Two Sentences

leetcode 884 Uncommon Words from Two Sentences 解析

## 题目

We are given two sentences `A` and `B`.  (A sentence is a string of space separated words.  Each word consists only of lowercase letters.)

A word is uncommon if it appears exactly once in one of the sentences, and does not appear in the other sentence.

Return a list of all uncommon words. 

You may return the list in any order.

Example1:
```
Input: A = "this apple is sweet", B = "this apple is sour"
Output: ["sweet","sour"]
```

Example2:
```
Input: A = "apple apple", B = "banana"
Output: ["banana"]
```
----

寻找A和B字符串中只出现一次的字符串

## 解题思路

用一个MAP来记录每个单词的出现的次数就行了

## AC代码

### Javascript

``` javascript
let uncommonFromSentences = function(A, B) {
    let Awords = A.split(" ").map(w => w.trim()).filter(w => w)
    let Bwords = B.split(" ").map(w => w.trim()).filter(w => w)

    let wordsMap = new Map()
    Awords.forEach(word => {
        if (wordsMap.get(word)){
            wordsMap.get(word).count++
        } else {
            wordsMap.set(word, {
                count: 1
            })
        }
    })

    Bwords.forEach(word => {
        if (wordsMap.get(word)){
            wordsMap.get(word).count++
        } else {
            wordsMap.set(word, {
                count: 1
            })
        }
    })
    let arr = []
    wordsMap.forEach(({count}, key) => {
        if (count === 1) arr.push(key)
    })
    return arr
}
```
## 在线链接

[uncommon-words-from-two-sentences](https://leetcode.com/problems/uncommon-words-from-two-sentences)

## END

>   2018-08-19  更新题号
> 
>   2018-08-13  完成
> 
>   2018-08-12  立项