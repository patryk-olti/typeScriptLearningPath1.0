import { createServer } from "node:http";

const server = createServer((req, res) => {
    if(req.url === "/"){
        res.end("Hello from backend!");
    }else if(req.url === "/users" && req.method === "GET"){
        res.writeHead(200);
        res.end("Users endpoint");
    }else if(req.url === "/about"){
        res.end("About endpoint");
    }else{
        res.writeHead(404);
        res.end("not found!");
    }

});


server.listen(3000);