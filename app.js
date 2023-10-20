var http = require('http');
var fs = require("fs")
var querystring = require('querystring');
var signUpAsset = require('./module')
const port = 5000;
var subpage = require('./test')
// var regex=/^[a-z0-9]*$/;
// var regey=/^[A-Z0-9]*$/;
// var exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

http.createServer(function(req, res) {
  //get방식으로 파일 조회//
    if(req.url==='/'){
    fs.readFile('index.html'  ,'utf8' ,function(error, data) {
        res.writeHead(200, {'Content-Type' : 'text/html' });
        res.end(data);
    })}else if (req.url === '/css/main.css') {
      fs.readFile('/css/main.css','utf-8', function (err, data)  {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.write(fs.readFileSync('./css/main.css'));
        return res.end();
      })};
    if(req.url==="/sub.css"){
        fs.readFile('sub.css','utf-8', function (err, data)  {
          res.writeHead(200, { 'Content-Type': 'text/css' });
          res.write(fs.readFileSync('sub.css'));
          return res.end()
        })}
  //post방식으로 파일 수정//
    if(req.method === 'POST'&& req.url==="/login"){
      fs.readFile('index2.html','utf8' ,function(error, data) {
        res.writeHead(200, {'Content-Type' : 'text/html' });
        res.end(data);})
        
        var body = '';
        req.on('data', (chunk)=>{
            body +=chunk.toString()
        })
        req.on('end', () => {
            // res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'});
            var data = querystring.parse(body);
            Object.assign(signUpAsset, data)
            console.log(signUpAsset);
          res.end(subpage(signUpAsset.id))
      
        })}
        if(req.method == 'POST'&& req.url==="/send"){
          var head = '';
        req.on('data', (free)=>{
            head +=free.toString()
        })
        req.on('end', () => {
          res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'});
          var meta = querystring.parse(head);
          console.log(meta);
          res.end("love")
        })
      }
        
    }).listen(port, function() {
    console.log('Serve');
});