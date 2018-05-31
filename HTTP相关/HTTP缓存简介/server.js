const Koa = require("koa")
const Router = require('koa-router')
const fs = require("fs")
const path = require("path")
const { createHash } = require("crypto")

const app = new Koa()
const router = new Router()

router.get("/", ctx => {
    ctx.response.type = "html"
    ctx.response.body = fs.createReadStream(path.resolve(__dirname, "./index.html"))
})

router.get("/cache-control-test", ctx => {
    let {
        control
    } = ctx.query
    ctx.response.set("Cache-Control", control)
    ctx.response.body = "123"
})

router.get("/last-modified-test", ctx => {
    let {
        control
    } = ctx.query

    let last = ctx.request.header["if-modified-since"]

    //不加会自动缓存
    ctx.response.set("Cache-Control", "no-cache")

    if (new Date(last).getTime() < Date.now()){
        ctx.status = 304
    } else {
        ctx.response.set("Last-Modified", new Date().toUTCString())
        ctx.response.body = new Date().toUTCString()
    }
})

router.get("/etag-test", ctx => {
    let {
        control
    } = ctx.query

    let etag = ctx.request.header["if-none-match"]
    if (etag){
        etag = etag.match(/^"(.*)"$/)[1]
    }

    //不加会自动缓存
    ctx.response.set("Cache-Control", "no-cache")
    let file = fs.readFileSync(path.resolve(__dirname, "./test.txt"))
    let fileHash = createHash("sha256").update(file).digest().toString("hex")

    if (etag === fileHash){
        ctx.status = 304
    } else {
        ctx.response.set("Etag", `"${fileHash}"`)
        ctx.response.body = new Date().toUTCString()
    }
})

app
.use(router.routes())
.use(router.allowedMethods())

app.listen(3000)
console.log("正在监听3000端口")