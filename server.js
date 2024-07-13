var fs = require('fs')
// http://localhost:5000/

const http = require('http')

const index = fs.readFileSync('./navbar-app/index.html')
const style = fs.readFileSync('./navbar-app/styles.css')
const js = fs.readFileSync('./navbar-app/browser-app.js')

console.log("Server Started")

const server = http.createServer((req, res) =>{
    console.log('request event')
    if(req.url === '/'){
        res.end('<h1>welcome to our page</h1>  ')
    }
    else if(req.url === '/home'){
        res.writeHead(200,{'content-type' : 'text/html'})
        res.write(index)
        res.end()
    }
    else if(req.url === '/styles.css'){
        res.writeHead(200,{'content-type' : 'text/css'})
        res.write(style)
        res.end()
    }
    else if(req.url === '/browser-app.js'){
        res.writeHead(200,{'content-type' : 'text/svg+xml'})
        res.write(js)
        res.end()
    }
    else if(req.url === '/logo.svg'){
        res.writeHead(200,{'content-type' : 'text/javascript'})
        res.write(js)
        res.end()
    }
    else if(req.url === '/about'){
        res.end( "<h1>This is the about page</h1>")
        // async(() =>{
        //     for (let i = 0; i < 1000; i++) {
        //         for(let j = 0; j < 1000; j++){
        //             console.log(`${i} ${j}`)
    
        //         }
        //     }

        // })
        
        // res.end()
    } 
    else if(req.url === '/error'){
        res.end(
            `
            <h1>Oops!</h1>
            <p>The page was not found</p>
            <a href="/">Back to home page</a>
            `
        )

    }
    // stream 
    else if(req.url === '/content'){
        // const text = fs.readFileSync(('./content/big.txt'))
        // res.end(`<h1>${text}<br></br> </h1>`)
        const fileStream =fs.createReadStream('./content/big.txt')
        fileStream.on('open', () =>{
            fileStream.pipe(res)
        })
        
    }
    else {
        res.writeHead(404,{'content-type' : 'text/html'})
        res.write("<h1>Page Not Found 404 error</h1>")
        res.end()
    }
        
})

server.listen(5000, () => {
    console.log('server listening on port :5000....')
})



