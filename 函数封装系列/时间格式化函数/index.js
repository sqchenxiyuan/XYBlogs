let date = Date.now()

console.log(formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss'))

function formatDate(date, formatString){
    if (typeof date === 'string' || typeof date === 'number'){
        date = new Date(date)
    }
    if (!(date instanceof Date)){
        throw new TypeError("时间格式不规范")
    }

    if (typeof formatString !== 'string'){
        throw new TypeError("格式化字符串类型错误")
    }

    const RegEs = [
        {reg: "YYYY", data: date.getFullYear()}, //年份
        {reg: "YY", data: date.getFullYear()}, //年份
        {reg: "MM", data: date.getMonth() + 1}, //月份
        {reg: "DD", data: date.getDate()}, //日期
        {reg: "D", data: date.getDay()}, //星期
        {reg: "HH", data: date.getHours()}, //小时24小时制
        {reg: "hh", data: date.getHours() % 12}, //小时12小时制
        {reg: "mm", data: date.getMinutes()}, //分钟
        {reg: "ss", data: date.getSeconds()}, //秒
    ]
    RegEs.forEach(RegE => {
        let regExp = new RegExp(`${RegE.reg}`, 'g')
        while (1){
            let result = regExp.exec(formatString)
            if (!result) break

            formatString = formatString.replace(result[0], (new Array(result[0].length).fill('0').join('') + RegE.data).substr(-result[0].length))
        }
    })

    return formatString
}