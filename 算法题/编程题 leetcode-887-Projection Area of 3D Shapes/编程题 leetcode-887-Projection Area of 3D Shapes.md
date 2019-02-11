# 编程题 leetcode 887 Projection Area of 3D Shapes

leetcode 887 Projection Area of 3D Shapes 解析

## 题目

On a `N * N` grid, we place some `1 * 1 * 1` cubes that are axis-aligned with the x, y, and z axes.

Each value `v = grid[i][j]` represents a tower of v cubes placed on top of grid cell `(i, j)`.

Now we view the projection of these cubes onto the xy, yz, and zx planes.

A projection is like a shadow, that maps our 3 dimensional figure to a 2 dimensional plane. 

Here, we are viewing the "shadow" when looking at the cubes from the top, the front, and the side.

Return the total area of all three projections.

Example1:
```
Input: [[2]]
Output: 5
```

Example2:
```
Input: [[1,2],[3,4]]
Output: 17
Explanation: 
Here are the three projections ("shadows") of the shape made with each axis-aligned plane.
```
![](http://blog-cdn.chenxiyuan.fun/18-8-5/31724229.jpg)

Example3:
```
Input: [[1,0],[0,2]]
Output: 8
```

Example4:
```
Input: [[1,1,1],[1,0,1],[1,1,1]]
Output: 14
```

Example5:
```
Input: [[2,2,2],[2,1,2],[2,2,2]]
Output: 21
```

----

求一个立方体的三视图的面积

## 解题思路

遍历，取x,y,z的面积就行了，注意的是x,y取得是哪一列的最大

## AC代码

### Javascript

``` javascript
let projectionArea = function(grid) {
    let zCount = 0
    let xCountArr = []
    let yCountArr = []
    for (let i = 0; i < grid.length; i++){
        let xarr = grid[i] || []
        xCountArr[i] = 0
        for (let j = 0; j < xarr.length; j++){
            if (!yCountArr[j]) yCountArr[j] = 0
            let h = xarr[j]
            if (h > 0){
                zCount++
            }
            if (h > xCountArr[i]){
                xCountArr[i] = h
            }
            if (h > yCountArr[j]){
                yCountArr[j] = h
            }
        }
    }

    let sum = xCountArr.reduce((sum, x) => sum + x, 0) + yCountArr.reduce((sum, y) => sum + y, 0) + zCount
    return sum
}
```
## 在线链接

[projection-area-of-3d-shapes](https://leetcode.com/problems/projection-area-of-3d-shapes)

## END

>   2018-08-05  完成
> 
>   2018-08-05  立项