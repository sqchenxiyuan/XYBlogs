function randomNumData(n){
    return new Array(n).fill(0).map(_ => parseInt(Math.random() * 1000))
}

let arr = randomNumData(16)
console.log(arr.join(","))
console.log(Array.from(arr).sort((a, b) => a - b).join(","))
console.log(selectSort(Array.from(arr)).join(","))
console.log(insertSort(Array.from(arr)).join(","))
console.log(bubbleSort(Array.from(arr)).join(","))
console.log(shellSort(Array.from(arr)).join(","))

//选择排序
function selectSort(arr){
    let len = arr.length
    for (let i = 0; i < len; i++){
        let min = i
        for (let j = i + 1; j < len; j++){
            if (arr[min] > arr[j]){
                min = j
            }
        }
        [arr[i], arr[min]] = [arr[min], arr[i]]
    }
    return arr
}

//插入排序
function insertSort(arr){
    let len = arr.length
    for (let i = 1; i < len; i++){
        let j = i - 1
        
        for (; j >= 0; j--){
            if (arr[j] < arr[i]){
                break
            }
        }
        j++

        let data = arr[i]
        for (; j <= i; j++){
            [data, arr[j]] = [arr[j], data]
        }
    }
    return arr
}

//冒泡排序
function bubbleSort(arr){
    let len = arr.length
    for (let i = 1; i < len; i++){
        for (let j = i - 1; j >= 0; j--){
            if (arr[j] < arr[j + 1]){
                break
            }

            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        }
    }
    return arr
}

//希尔排序
function shellSort(arr){
    let len = arr.length
    let h = 1
    //生成h
    while (h < (len - 1) / 3) h = 3 * h + 1

    while (h >= 1){
        for (let i = 1; i < len; i++){
            let j = i - h
            
            for (; j >= 0; j = j - h){
                if (arr[j] < arr[i]){
                    break
                }
            }
            j = j + h
    
            let data = arr[i]
            for (; j <= i; j = j + h){
                [data, arr[j]] = [arr[j], data]
            }
        }
        h = parseInt(h / 3)
    }
    return arr
}