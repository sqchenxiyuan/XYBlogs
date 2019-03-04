function randomNumData(n){
    return new Array(n).fill(0).map(_ => parseInt(Math.random() * 1000))
}

let arr = randomNumData(20)
console.log(arr.join(","))
console.log(Array.from(arr).sort((a, b) => a - b).join(","))
console.log(StackSort(arr).join(","))
// console.log(StackSort2(arr).join(","))

function StackSort(arr){
    //上浮
    function swim(arr, p){
        while (p > 1 && arr[p] > arr[parseInt(p / 2)]){
            [arr[p], arr[parseInt(p / 2)]] = [arr[parseInt(p / 2)], arr[p]] 
            len = parseInt(p / 2)
        }
    }

    //下沉--将第一个元素下沉
    function sink(arr, p, len){
        let i = p
        while (true){
            let next
            if (i * 2 <= len && i * 2 + 1 <= len && arr[i * 2 - 1] < arr[i * 2]){
                next = i * 2 + 1
            } else {
                next = i * 2
            }

            if (next <= len && arr[i] < arr[next]){
                [arr[i], arr[next]] = [arr[next], arr[i]]
                i = next
            } else {
                break
            }
        }
    }

    let length = arr.length
    let narr = []
    for (let i = 0; i < length; i++){
        narr[i + 1] = arr[i]
    }

    for (let i = 0; i < length; i++){
        swim(narr, i + 1)
    }

    for (let i = length; i > 1; i--){
        [narr[1], narr[i]] = [narr[i], narr[1]]
        sink(narr, 1, i - 1)
    }

    for (let i = 0; i < length; i++){
        arr[i] = narr[i + 1]
    }

    return arr
}


function StackSort2(arr){
    //下沉--将第一个元素下沉
    function sink(arr, num, len){
        let i = num + 1 //其实从0映射过来
        len++
        while (true){
            let next
            if (i * 2 <= len && i * 2 + 1 <= len && arr[i * 2 - 1] < arr[i * 2]){
                next = i * 2 + 1
            } else {
                next = i * 2
            }

            if (next <= len && arr[i - 1] < arr[next - 1]){
                [arr[i - 1], arr[next - 1]] = [arr[next - 1], arr[i - 1]]
                i = next
            } else {
                break
            }
        }
    }

    let length = arr.length
    for (let i = parseInt(length - 1); i >= 0; i--){
        sink(arr, i, length - 1)
    }

    console.log(arr.join(","))

    for (let i = length - 1; i > 0; i--){
        [arr[0], arr[i]] = [arr[i], arr[0]]
        sink(arr, i - 1)
    }

    return arr
}