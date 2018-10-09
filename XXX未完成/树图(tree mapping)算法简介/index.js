class TreeMapAlgorithms{
    static squarified(width, height, blocks){
        if (blocks.length === 0) return []

        //数据排序
        blocks.sort((a, b) => b.weight - a.weight)

        //全部数据量以及与展示区域大小比例
        let allWeight = blocks.reduce((sum, block) => sum + block.weight, 0)
        let p = width * height / allWeight

        //截取当前剩余的大小
        let minSide = Math.min(width, height)

        let row = []
        for (let i = 0; i < blocks.length; i++){
            let block = blocks[i]
            if (maxProportion(row) >= maxProportion(row.concat([block]))){
                row.push(block)
            } else {
                break
            }
        }

        //计算这一行中最大(最坏)的长宽比
        function maxProportion(row){
            if (row.length === 0) return Infinity
            let rowData = row.reduce((sum, data) => sum + data.weight, 0)
            let s2 = rowData * rowData
            let w2 = minSide * minSide
            return row.reduce((max, data) => Math.max((w2 * data.weight) / (s2 * p), (s2 * p) / (w2 * data.weight), max), 0)
        }

        let otherBlocks = blocks.slice(row.length)
        let rowWeight = row.reduce((sum, data) => sum + data.weight, 0)
        let l = rowWeight * p / minSide

        //方向
        if (width === minSide){
            let y = 0
            row.forEach(block => {
                block.width = l
                block.height = minSide * block.weight / rowWeight
                block.y = y
                y = y + block.height
            })

            let blocks = TreeMapAlgorithms.squarified(width, height - l, otherBlocks)
            blocks.forEach(block => {
                block.x += l
            })
            row = row.concat(blocks)
        } else {
            let x = 0
            row.forEach(block => {
                block.height = l
                block.width = minSide * block.weight / rowWeight
                block.x = x
                x = x + block.width
            })

            let blocks = TreeMapAlgorithms.squarified(width - l, height, otherBlocks)
            blocks.forEach(block => {
                block.y += l
            })
            row = row.concat(blocks)
        }
        return row
    }
}

class TreeMapBlock{
    constructor(weight, metadata){
        this.width = 0
        this.height = 0
        this.x = 0
        this.y = 0
        this.weight = weight || 0
        this.metadata = metadata || {}
    }
}

let datas = [
    {name: "1", size: 6},
    {name: "2", size: 6},
    {name: "3", size: 4},
    {name: "4", size: 3},
    {name: "5", size: 2},
    {name: "6", size: 2},
    {name: "7", size: 1}
]

let dataBlocks = datas.map(d => new TreeMapBlock(d.size, {name: d.name}))
let blocks = TreeMapAlgorithms.squarified(400, 500, dataBlocks)
blocks.forEach(block => {
    let div = document.createElement("div")
    div.classList.add("block")
    div.style = `top:${block.y}px;left:${block.x}px;width:${block.width}px;height:${block.height}px`
    div.innerHTML = block.weight
    document.body.appendChild(div)
})