const http = require("http")

let server = http.createServer(function(request, response){
    response.setHeader("Cache-Control", "max-age=3600")
    response.write("223")
    response.end()
})

server.on("listening", e => {
    if (e) throw e
    console.log("正在监听3000端口")
})

server.listen(3000)