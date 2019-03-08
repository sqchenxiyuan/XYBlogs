function randomNumData(n){
    return new Array(n).fill(0).map(_ => parseInt(Math.random() * 1000))
}

let arr = randomNumData(20)
console.log(arr.join(","))
console.log(Array.from(arr).sort((a, b) => a - b).join(","))
console.log(CountSort(arr).join(","))
console.log(BaseSort(arr).join(","))
console.log(BucketSort(arr, 10).join(","))

function CountSort(arr){
    let min = Infinity
    let max = 0
    let len = arr.length
    for (let i = 0; i < len; i++){
        if (arr[i] < min) min = arr[i]
        if (arr[i] > max) max = arr[i]
    }

    let countarr = new Array(max - min + 1).fill(0)

    for (let i = 0; i < len; i++){
        countarr[arr[i] - min]++
    }

    let p = 0
    for (let i = 0; i <= max - min; i++){
        for (let j = 0; j < countarr[i]; j++){
            arr[p] = i + min
            p++
        }
    }

    return arr
}


function BaseSort(arr){
    let len = arr.length

    let max = 0
    for (let i = 0; i < len; i++){
        if (arr[i] > max) max = arr[i]
    }

    let x = 1
    while (true){
        let baseArr = new Array(10).fill(0).map(_ => new Array())

        for (let i = 0; i < len; i++){
            let j = parseInt(arr[i] / x) % 10
            baseArr[j].push(arr[i])
        }

        let p = 0
        baseArr.forEach(base => {
            base.forEach(data => {
                arr[p] = data
                p++
            })
        })

        x = x * 10
        if (x > max) break
    }

    return arr
}

function BucketSort(arr, bukectSize = 10){
    let min = Infinity
    let max = 0
    let len = arr.length
    for (let i = 0; i < len; i++){
        if (arr[i] < min) min = arr[i]
        if (arr[i] > max) max = arr[i]
    }

    let bucketNum = parseInt((max - min) / bukectSize) + 1
    let buckets = new Array(bucketNum).fill(0).map(_ => new Array())

    for (let i = 0; i < len; i++){
        let b = parseInt((arr[i] - min) / bukectSize)
        let bucket = buckets[b]
        let len = bucket.length
        bucket[len] = arr[i]
        for (let j = len - 1; j >= 0; j--){
            if (bucket[j] < arr[i]){
                bucket[j + 1] = bucket[j]
            } else {
                bucket[j + 1] = arr[i]
                break
            }
        }
    }

    let p = 0
    for (let i = 0; i < buckets.length; i++){
        for (let j = 0; j < buckets[i].length; j++){
            arr[p] = buckets[i][j]
            p++
        }
    }

    return arr
}