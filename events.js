const EventEmitter = require('events')

const customEmitter = new EventEmitter()

customEmitter.on('response',() => {
    console.log("hey this is an event")
} )


customEmitter.emit('response')