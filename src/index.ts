import { createServer } from "node:http";
import type { User } from './types/User.js';

let users: User[] = [];

function checkUser(value: User | undefined): value is User{
    if( (typeof(value) !== "object") || (typeof(value) === "undefined") ){ return false; }

    if(!("name" in value)){ return false; }

    if(typeof(value.name) !== "string"){ return false; }

    if(!("age" in value)){ return false; }

    if(typeof(value.age) !== "number"){ return false; }

    return true;
}

const server = createServer((req, res) => {
    if(req.url === "/"){

        res.writeHead(200);
        res.end("Hello from backend!");
    
    }else if(req.url === "/users" && req.method === "GET"){

        res.writeHead(200);
        res.end(`List of users: ${JSON.stringify(users)}`);
    
    }else if(req.url === "/users" && req.method === "POST"){

        let body = "";

        req.on("data", (chunk) => {
            body = body + chunk;
        })

        req.on("end", () => {
            try{
                const data = JSON.parse(body);

                if(checkUser(data)){
                    users.push(data);

                    res.writeHead(201);
                    res.end(`User created: ${JSON.stringify(data)}\n actual array of users: ${JSON.stringify(users)}`);
                }else{
                    res.writeHead(400);
                    res.end(`Bad input!`);
                }

            }catch(error){
                console.error(error);
                res.writeHead(400);
                res.end("Invalid JSON");
            }
        })

    }else if(req.url === "/about"){

        res.writeHead(200);
        res.end("About endpoint");

    }else{
        res.writeHead(404);
        res.end("not found!");
    }
});


server.listen(3000);