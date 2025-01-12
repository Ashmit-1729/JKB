const http = require("node:http");
const fs = require("node:fs");
const server = http.createServer((req, res) => {

    if(req.url == "/")
    {
        const output = fs.readFileSync("index.html");
        res.writeHead(200, {"Content-type": "text/html"});
        res.end(output.toString());
    }
    else if(req.url === "/index.js")
    {
        const output = fs.readFileSync("index.js");
        res.writeHead(200, {"Content-type": "text/javascript"});
        res.end(output.toString());
    }
    else if(req.url === "/products.html")
    {
        const output = fs.readFileSync("products.html");
        res.writeHead(200, {"Content-type": "text/html"});
        res.end(output.toString());
    }
    else if(req.url === "/products.js")
    {
        const output = fs.readFileSync("products.js");
        res.writeHead(200, {"Content-type": "text/javascript"});
        res.end(output.toString());
    }
    else if(req.url === "/popup.css")
    {
        const output = fs.readFileSync("popup.css");
        res.writeHead(200, {"Content-type": "text/css"});
        res.end(output.toString());
    }
    else if(req.url === "/images/search.svg")
    {
        const output = fs.readFileSync("images/search.svg");
        res.writeHead(200, {"Content-type": "image/svg+xml"});
        res.end(output.toString());
    }
    else if(req.url === "/images/shopping-bag-svgrepo-com.svg")
    {
        const output = fs.readFileSync("images/shopping-bag-svgrepo-com.svg");
        res.writeHead(200, {"Content-type": "image/svg+xml"});
        res.end(output.toString());
    }
    else{
        res.writeHead(404);
        res.end("Page not found");
    }
});

server.listen(3000,()=>{
    console.log("Server is running on port http://localhost:3000");
})