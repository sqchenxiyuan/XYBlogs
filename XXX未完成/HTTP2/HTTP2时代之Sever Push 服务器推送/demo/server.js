const http2 = require('spdy') 
const logger = require('morgan') 
const express = require('express') 
const path = require('path')
const app = express() 
const fs = require('fs')

app.use(logger('dev'));


app.get('/', function (req, res) { 
  res.send(`hello, http2! go to /pushy`) 
}) 

app.get('/pushy', (req, res) => { 
  var stream = res.push('/main.js', { 
    status: 200, // optional 
    method: 'GET', // optional 
    request: { 
      accept: '*/*' 
    }, 
    response: { 
      'content-type': 'application/javascript' 
    } 
  }) 
  stream.on('error', function() { 
  }) 
  stream.end('alert("hello from push stream!");') 
  res.end('<script src="/main.js"></script>') 
}) 

var options = { 
  key: fs.readFileSync(path.resolve(__dirname ,'./ssl/privateKey.pem')), 
  cert: fs.readFileSync(path.resolve(__dirname,'./ssl/certificate.crt')) 
} 
 
http2 
  .createServer(options, app) 
  .listen(8000, ()=>{ 
    console.log(`Server is listening on https://localhost:8000. 
    You can open the URL in the browser.`) 
  } 
) 