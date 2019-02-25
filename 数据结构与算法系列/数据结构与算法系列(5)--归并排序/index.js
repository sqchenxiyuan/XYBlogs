function randomNumData(n){
    return new Array(n).fill(0).map(_ => parseInt(Math.random() * 1000))
}

let arr = randomNumData(21)
console.log(arr.join(","))
console.log(Array.from(arr).sort((a, b) => a - b).join(","))
console.log(mergeSort_top2bottom(arr).join(","))
console.log(mergeSort_bottom2top(arr).join(","))

function mergeSort_top2bottom(arr, start, end){
    if (start === undefined && end === undefined){
        start = 0
        end = arr.length - 1
    }

    let cha = []
    function merge(arr, left, mid, right){
        let i = left, j = mid + 1

        for (let q = left; q <= right; q++){
            cha[q] = arr[q]
        }

        for (let q = left; q <= right; q++){
            if (i > mid) arr[q] = cha[j++]
            else if (j > right) arr[q] = cha[i++]
            else if (cha[i] <= cha[j]) arr[q] = cha[i++]
            else arr[q] = cha[j++]
        }
    }
    
    let len = end - start
    if (len <= 0) return

    let mid = parseInt((end + start) / 2)
    mergeSort_top2bottom(arr, start, mid)
    mergeSort_top2bottom(arr, mid + 1, end)
    merge(arr, start, mid, end)

    return arr
}

function mergeSort_bottom2top(arr){
    let cha = []
    function merge(arr, left, mid, right){
        let i = left, j = mid + 1

        for (let q = left; q <= right; q++){
            cha[q] = arr[q]
        }

        for (let q = left; q <= right; q++){
            if (i > mid) arr[q] = cha[j++]
            else if (j > right) arr[q] = cha[i++]
            else if (cha[i] <= cha[j]) arr[q] = cha[i++]
            else arr[q] = cha[j++]
        }
    }

    let length = arr.length
    for (let base = 1; base >= arr.length; base *= 2){
        for (let i = 0; i < length; i = i + base * 2){
            merge(arr, i, i + base, Math.min(i + base * 2 - 1, length - 1))
        }
    }

    return arr
}