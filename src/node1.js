console.log("hii Caleb Cheru")

const { readFileSync, writeFileSync,readFile,writeFile } = require('fs')
const os = require('os')

const path = require(`path`)

const first = readFileSync('./first.txt','utf-8')

const second = readFileSync('./second.txt','utf-8')


// //info of curent user
const user = os.userInfo()
console.log(user)
 

//method returns the system uptime in seconds
console.log(`The System Uptime is ${os.uptime()} seconds`)


const currentOs = {
    name: os.type(),
    release: os.release(),
    totalMen: os.totalmem(),
    freeMem: os.freemem()

}
console.log(currentOs)

console.log(path.sep)

//this is used to write toa file 
writeFileSync(
    './result-sync.txt',
    `Here is the result : ${first}, ${second}`,
    {flag: 'a'} //this is for appending
)
console.log('\n\ndone with this task')
console.log('starting the next task\n\n')

//this is used to read to a file
//this is just like how u would use an aysnc function
console.log("start")
readFile( './first.txt','utf-8',(err,result) => {
    if (err) {
        console.log(err)
        return
    }
    const first = result
    readFile('./second.txt','utf-8',(err,result) => {
        if (err) {
            console.log(err)
            return
        }
        const second = result
        writeFile(
            './result1-sync.txt1',
            `here is the result : ${first}, ${second}`,
            {flag :'a'}
            ,(err,result) => {
                if (err) {
                    console.log(err)
                    return
                }
                console.log("done with this task")

            })
    }) 
    })
    console.log("starting next task")