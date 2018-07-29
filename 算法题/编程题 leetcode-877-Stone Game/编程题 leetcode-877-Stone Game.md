# 编程题 leetcode 877 Stone Game

leetcode 877 Stone Game 解析

## 题目

Alex and Lee play a game with piles of stones.  There are an even number of piles arranged in a row, and each pile has a positive integer number of stones `piles[i]`.

The objective of the game is to end with the most stones.  The total number of stones is odd, so there are no ties.

Alex and Lee take turns, with Alex starting first.  Each turn, a player takes the entire pile of stones from either the beginning or the end of the row.  This continues until there are no more piles left, at which point the person with the most stones wins.

Assuming Alex and Lee play optimally, return `True` if and only if Alex wins the game.

Example1:
```
Input: [5,3,4,5]
Output: true
Explanation: 
Alex starts first, and can only take the first 5 or the last 5.
Say he takes the first 5, so that the row becomes [3, 4, 5].
If Lee takes 3, then the board is [4, 5], and Alex takes 5 to win with 10 points.
If Lee takes the last 5, then the board is [3, 4], and Alex takes 4 to win with 9 points.
This demonstrated that taking the first 5 was a winning move for Alex, so we return true.
```
----

一个博弈游戏，有两个人Alex和Lee，Alex先手，有偶数个数组，只能从数组两段取，最后和值最多的人获胜，求Alex是否必胜

## 解题思路

使用`db[i][j]`来表示`i`和`j`区间Alex的最多可以胜多少子，然后从`db[0][length - 1]`开始递归求值即可。每次需要两人同时选择，当alex取的时候选最多的，lee取得时候选最少的。

## AC代码

### Javascript

``` javascript
let stoneGame = function(piles) {
    let len = piles.length
    let map = new Array(len).fill(0).map(_ => new Array(len))
    function x(map, i, j){
        if (map[i][j]) return map[i][j]

        if (i + 1 === j){
            map[i][j] = Math.abs(piles[i] - piles[j]) //alex比lee多拿多少
        } else {
            //取i
            map[i][j] = Math.max(
                Math.min(piles[i] - piles[i + 1] + x(map, i + 2, j), piles[i] - piles[j] + x(map, i + 1, j - 1)),
                Math.min(piles[j] - piles[j - 1] + x(map, i, j - 2), piles[j] - piles[i] + x(map, i + 1, j - 1))
            )
        }
        return map[i][j]
    }
    return x(map, 0, len - 1) > 0
}
```
## 在线链接

[stone-game](https://leetcode.com/problems/stone-game)

## END

>   2018-07-29  完成
> 
>   2018-07-29  立项
