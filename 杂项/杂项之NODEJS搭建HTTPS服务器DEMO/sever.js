var express=require('express'),
    fs=require('fs'),
    http=require('http'),
    https=require('https');

var privateKey  = fs.readFileSync(__dirname+'/ssl/privateKey.pem', 'utf8');
var certificate = fs.readFileSync(__dirname+'/ssl/certificate.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var app=express();

app.get('/',function(req,res,next){
  if(req.protocol === 'https') {
      res.status(200).send('HTTPS!');
  }
  else {
      res.status(200).send('HTTP!');
  }
});

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(3000,function(){
	console.log(' - listening on http://*:'+3000);
});

httpsServer.listen(3001,function(){
	console.log(' - listening on http://*:'+3001);
});
