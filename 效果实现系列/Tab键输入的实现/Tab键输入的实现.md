# Tab键输入的实现

最近弄博客的编辑器，发现Tab键无法直接输入，比较尴尬，为此用这篇文章来记录实现的方式。

## 实现过程

1.  监听 `keydown` 事件,并屏蔽默认事件(`preventDefault`)

    ``` javascript

    function inputTab(dom){
        dom.addEventListener('keydown',function(e){
            if(e.keyCode === 9){
                //处理
                e.preventDefault();
            }
        })
    }

    ```
    这时候就已经按Tab键不会切换了

2.  在光标位置添加需要键入的内容，比如：`Tab` `空格`
    ``` javascript

    function inputTab(dom){
        dom.addEventListener('keydown',function(e){
            if(e.keyCode === 9){
                let start = this.selectionStart;
                let l = this.selectionEnd - this.selectionStart;
                let value = this.value.split('');
                value.splice(start,l,'\t')
                this.value = value.join('');
                //处理
                e.preventDefault();
            }
        })
    }

    ```
    主要利用 `selectionStart` 和 `selectionEnd` 来确定光标的位置,然后插入内容就可以了

## 扩展

同理当然还可以不止监听 `Tab` 键，可以还对其他的键位进行控制

这样改一改就可以实现了啦

``` javascript

function changeInput(dom,keyCode,input){
    dom.addEventListener('keydown',function(e){
        if(e.keyCode === keyCode){
            let start = this.selectionStart;
            let l = this.selectionEnd - this.selectionStart;
            let value = this.value.split('');
            value.splice(start,l,input)
            this.value = value.join('');
            //处理
            e.preventDefault();
        }
    })
}

```

### 事件版

这个函数将提供一个用于监听时间的函数，同时支持传入字符，自动判断keyCode

``` javascript

function changeKeyDownInput(keyCode,input){
    if(typeof keyCode === 'string'){
        keyCode = keyCode.charCodeAt(0)
    }

    return function(e){
        if(e.keyCode === keyCode){
            let start = this.selectionStart;
            let l = this.selectionEnd - this.selectionStart;
            let value = this.value.split('');
            value.splice(start,l,input)
            this.value = value.join('');
            //处理
            e.preventDefault();
        }
    }
}

```

## 参考资料

[MDN_HTMLTextAreaElement](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLTextAreaElement)

## END

>   2017-5-16   完成

>   2017-5-12   立项
