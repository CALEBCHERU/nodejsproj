const fs = require("fs")

for (let i =0; i < 100000; i++){
    fs.writeFileSync('./content/big.txt',`hello Caleb ${i}\n`, {flag: 'a'})
}


// strem
const rs = fs.createReadStream('./content/lorem.txt', {TextEncoderStream :'utf8'})

const ws = fs.createWriteStream('./content/new-lorem.txt')

// rs.on('data', (dataChunk) => {
//     ws.write(dataChunk)
// })

// this two are just the same  but the below is the more professional way

rs.pipe(ws)