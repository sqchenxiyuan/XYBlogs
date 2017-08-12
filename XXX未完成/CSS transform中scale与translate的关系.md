# CSS transform中scale与translate的关系

``` js

 let scale = this.wWidth / this.wTWidth
            let scaleTranslate = 1 / scale / 2 * 100
            // console.log(this.wWidth,scale,scaleTranslate)
            // console.log(`scale(${scale*100}%) translate(${-50-scaleTranslate}%,${-50-scaleTranslate}%)`)
            return {
                width:`${this.wTWidth}px`,
                height:`${this.wTWidth / this.wProportion}px`,
                transform: `scale(${scale}) translate(${-scaleTranslate}%,${-scaleTranslate}%)`
            }

```


## END

>   2017-6-6    立项
