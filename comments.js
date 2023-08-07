// create web server
// 1. load modules
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
// 2. create web server
var server = http.createServer(function(request,response){
    var parsedUrl = url.parse(request.url);
    var resource = parsedUrl.pathname;
    console.log('resource='+resource);
    // if client request '/hello'
    if(resource == '/hello'){
        // 3. read hello.html
        fs.readFile('hello.html','utf-8',function(error,data){
            if(error){
                response.writeHead(500,{'Content-Type':'text/html'});
                response.end('500 Internal Server '+error);
            }else{
                response.writeHead(200,{'Content-Type':'text/html'});
                response.end(data);
            }
        });
    }else if(resource == '/comment'){
        // 4. read comment.html
        fs.readFile('comment.html','utf-8',function(error,data){
            if(error){
                response.writeHead(500,{'Content-Type':'text/html'});
                response.end('500 Internal Server '+error);
            }else{
                response.writeHead(200,{'Content-Type':'text/html'});
                response.end(data);
            }
        });
    }else if(resource == '/comment/list'){
        // 5. read comment list
        fs.readFile('comment.list','utf-8',function(error,data){
            if(error){
                response.writeHead(500,{'Content-Type':'text/html'});
                response.end('500 Internal Server '+error);
            }else{
                response.writeHead(200,{'Content-Type':'text/html'});
                response.end(data);
            }
        });
    }else if(resource == '/comment/insert'){
        // 6. read comment insert
        // 6.1 read form data
        request.on('data',function(data){
            var comment = qs.parse(data.toString());
            console.log(comment);
            // 6.2 save comment
            fs.appendFile('comment.list',JSON.stringify(comment),function(error){
                if(error){
                    response.writeHead(500,{'Content-Type':'text/html'});
                    response.end('500 Internal Server '+error);
                }else{
                    response.writeHead(200,{'Content-Type':'text/html'});
                    response.end('success');
                }
            });
        });
    }else{
        response.writeHead(404,{'Content-Type':'text/html'});
        response.end('404 Page Not Found');
    }
}