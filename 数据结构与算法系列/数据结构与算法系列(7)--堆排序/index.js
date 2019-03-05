function randomNumData(n){
    return new Array(n).fill(0).map(_ => parseInt(Math.random() * 1000))
}

let arr = randomNumData(20)
console.log(arr.join(","))
console.log(Array.from(arr).sort((a, b) => a - b).join(","))
console.log(StackSort(arr).join(","))
console.log(StackSort2(arr).join(","))

function StackSort(arr){
    //上浮
    function swim(arr, p){
        while (p > 1 && arr[p] > arr[parseInt(p / 2)]){
            [arr[p], arr[parseInt(p / 2)]] = [arr[parseInt(p / 2)], arr[p]] 
            p = parseInt(p / 2)
        }
    }

    //下沉--将第一个元素下沉
    function sink(arr, i, len){
        while (2 * i <= len){
            let j = 2 * i
            if (j < len && arr[j] < arr[j + 1]) j++
            if (arr[i] < arr[j]){
                [arr[i], arr[j]] = [arr[j], arr[i]]
                i = j
            } else {
                break
            }
        }
    }

    let length = arr.length
    for (let i = length - 1; i >= 0; i--){
        arr[i + 1] = arr[i]
    }

    for (let i = 0; i < length; i++){
        swim(arr, i + 1)
    }

    for (let i = length; i > 1; i--){
        [arr[1], arr[i]] = [arr[i], arr[1]]
        sink(arr, 1, i - 1)
    }

    for (let i = 0; i < length; i++){
        arr[i] = arr[i + 1]
    }
    arr.length = length

    return arr
}


function StackSort2(arr){
    //下沉--将第一个元素下沉
    function sink(arr, i, len){
        while (2 * i <= len){
            let j = 2 * i
            if (j < len && arr[j] < arr[j + 1]) j++
            if (arr[i] < arr[j]){
                [arr[i], arr[j]] = [arr[j], arr[i]]
                i = j
            } else {
                break
            }
        }
    }

    let length = arr.length
    for (let i = length - 1; i >= 0; i--){
        arr[i + 1] = arr[i]
    }

    for (let i = parseInt(length / 2); i >= 1; i--){
        sink(arr, i, length)
    }

    for (let i = length; i > 1; i--){
        [arr[1], arr[i]] = [arr[i], arr[1]]
        sink(arr, 1, i - 1)
    }

    for (let i = 0; i < length; i++){
        arr[i] = arr[i + 1]
    }
    arr.length = length

    return arr
}