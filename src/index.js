const sayhii = require('./app')

const logEvents = require('./logsEvent')

const EventEmitter = require('events ')

const customEmitter = new EventEmitter()

customEmitter.on('log',(msg) => {
    logEvents(msg)
    setTimeout (() => {
        myEmitter.emit('log', 'log event emmited!')
    },2000)
} )
 

customEmitter.emit('response')