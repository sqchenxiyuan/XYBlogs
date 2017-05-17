let arr = render(`<% for(let i = 0 ;i< this.l;i++){ %>
                    <li><%= i%></li>
                <% } %>`, {l:2})

console.log(arr)

function render(str, data = {}, options = {}){
    let {
        startSign = "<%",
        endSign = "%>"
    } = options;


    str = str.replace('\n', '');
    let arr = [str];
    while (true){
        let str = arr.pop();

        let start = str.search(startSign);
        let end = str.search(endSign);

        if (start === -1){
            arr.push(str)
            break
        } else if (end === -1){
            throw "no close !"
        }

        let bstr = str.substring(0, start);
        let instr = str.substring(start + startSign.length, end);
        str = str.substring(end + endSign.length);

        arr.push(bstr)
        arr.push(instr)
        arr.push(str)
    }

    let renderBuf = `let renderout = ''\n`;
    arr.forEach((data, index) => {
        if (index % 2 === 0 && data){
            renderBuf += `renderout += "${data.trim()}"\n`
        } else {
            if (data[0] === '='){
                renderBuf += `renderout += ${data.substr(1).trim()}\n`
            } else {
                renderBuf += `${data.trim()}\n`
            }
        }
    })
    renderBuf += `return renderout`;

    let renderFun = new Function('locals', renderBuf);
    return renderFun.call(data)
}
