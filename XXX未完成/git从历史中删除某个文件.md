# git从历史中删除某个文件

git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch node_module/*' --prune-empty --tag-name-filter cat -- --all

## END

>   2019-02-07  立项