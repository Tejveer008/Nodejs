const http = require("http");

const server =http.createServer((req,res)=>{
    if (req.url === "/"){
        res.setHeader("content-Type","text/html")
        res.write("<h1>Here is Your Home Page<h1>");
    res.end();
    }

    if (req.url === "/about"){
        res.setHeader("content-Type","text/html")
        res.write("Here is Your About Page");
    res.end();
    }

    
    if (req.url === "/contact"){
        res.setHeader("content-Type","text/html")
        res.write("Here is Your Contact Page");
    res.end();
    }
})

const PORT = 3000; 
server.listen(PORT,() => {
    console.log(`✅Listening on PORT ${PORT}`);
});