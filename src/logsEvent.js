const fs = require("fs").promises;
const path = require('path')

const logEvents = async (message) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`
    console.log(logItem)
    try {
        if (!fs.existsSync(path.join(__dirname, "logs"))) {
            await fs.mkdir(path.join(__dirname, 'logs'))
            
        }
        await fs.appendFile(path.join(__dirname, "logs", "eventLog.txt"),logItem)
    } catch (error) {
        console.log(error)
    }
}