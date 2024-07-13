var fs = require("fs")

for (let i =0; i < 100000; i++){
    fs.writeFileSync('./content/big.txt',`hello Caleb ${i}\n`, {flag: 'a'})
}