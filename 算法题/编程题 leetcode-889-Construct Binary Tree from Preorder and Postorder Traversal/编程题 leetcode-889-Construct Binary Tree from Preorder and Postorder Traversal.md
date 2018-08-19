# 编程题 leetcode 889 Construct Binary Tree from Preorder and Postorder Traversal

leetcode 889 Construct Binary Tree from Preorder and Postorder Traversal 解析

## 题目

Return any binary tree that matches the given preorder and postorder traversals.

Values in the traversals pre and post are distinct positive integers.

Example1:
```
Input: pre = [1,2,4,5,3,6,7], post = [4,5,2,6,7,3,1]
Output: [1,2,3,4,5,6,7]
```

----

根据二叉树的前序遍历序列和后序遍历序列，给出树

## 解题思路

很简单的二叉树题，但是很久没弄不熟悉了，后序会详细写一篇关于树遍历的文章

## AC代码

### Javascript

``` javascript
let constructFromPrePost = function(pre, post) {
    if (pre.length === 0) return null
    let head = new TreeNode(pre[0])
    let left = null
    let leftlength = 0

    for (let i = 0; i < post.length; i++){
        if (post[i] === pre[1]){
            leftlength = i + 1
            left = constructFromPrePost(pre.slice(1, 1 + leftlength), post.slice(0, leftlength))
            break
        }
    }
    let right = constructFromPrePost(pre.slice(1 + leftlength), post.slice(leftlength, -1))

    head.left = left
    head.right = right

    return head
}
```
## 在线链接

[construct-binary-tree-from-preorder-and-postorder-traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal)

## END

>   2018-08-19  完成
> 
>   2018-08-19  立项