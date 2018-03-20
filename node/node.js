var http = require("http")
var url =require("url")
// var query=require("")
var fs=require("fs")

function onRequest(request, response) {

   var urlStr=url.parse(request.url)
    if(urlStr.pathname=="/"){
        
        fs.readFile(__dirname+"/1.html",function(err,data){
            if(err){
                response.writeHead(404, {
                    'content-type' : 'text/html;charset=utf-8'
                });
                response.write("页面不存在")
                response.end()
            }else{
                response.writeHead(200, {
                    'content-type' : 'text/html;charset=utf-8'
                });
                response.write(data)
                response.end()

            }
        })
    }else if(urlStr.pathname=="/node"){
        request.on("data",function(data){
           console.log(data.toString())
        })
    }
}
http.createServer(onRequest).listen(3000)