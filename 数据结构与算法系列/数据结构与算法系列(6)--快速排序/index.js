function randomNumData(n){
    return new Array(n).fill(0).map(_ => parseInt(Math.random() * 1000))
}

let arr = randomNumData(21)
console.log(arr.join(","))
console.log(Array.from(arr).sort((a, b) => a - b).join(","))
console.log(fastSort(arr).join(","))
console.log(fastSort_3(arr).join(","))


function fastSort(arr, start = 0, end = arr.length - 1){
    if (end - start <= 0) return arr

    let k = arr[start]
    let i = start + 1, j = end
    while (true){
        while (arr[i] < k) i++

        while (k < arr[j]) j--

        if (i >= j) break
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    [arr[start], arr[j]] = [arr[j], arr[start]]

    fastSort(arr, start, j - 1)
    fastSort(arr, j + 1, end)

    return arr
}


function fastSort_3(arr, start = 0, end = arr.length - 1){
    if (end - start <= 0) return arr

    let k = arr[start]
    let left = start, mid = start + 1, right = end
    while (mid <= right){
        if (arr[mid] < k){
            [arr[left], arr[mid]] = [arr[mid], arr[left]]
            left++
            mid++
        } else if (arr[mid] > k){
            [arr[right], arr[mid]] = [arr[mid], arr[right]]
            right--
        } else {
            mid++
        }
    }

    fastSort_3(arr, start, left - 1)
    fastSort_3(arr, right + 1, end)

    return arr
}