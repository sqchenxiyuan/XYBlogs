const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const dirpath = path.resolve(__dirname, 'files');

//自己设置header和流
app.get('/bySelf/:filename', function(req, res) {
    let filename = req.params.filename;
    let filepath = path.resolve(dirpath, filename);

    req.on('data', function(x){
        console.log(x);
    })

    req.on('end', function(x){
        console.log(x);
    })

    fs.stat(filepath, function(err, stat) {
        if (err || !stat.isFile()){
            res.status(404).send('<h1>404 not Found</h1>');
            return;
        }
        res.set({
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': 'attachment; filename=' + filename,
            'Content-Length': stat.size
        });
        fs.createReadStream(filepath).pipe(res);
    })
})

//res.sendFile() is supported from Express v4.8.0 onwards
app.get('/bySendFile/:filename', function (req, res) {
    let filename = req.params.filename;
    let options = {
        root: dirpath,
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    res.sendFile(filename, options, function (err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }
        else {
            console.log('Sent:', filename);
        }
    });
})

app.listen(3000)