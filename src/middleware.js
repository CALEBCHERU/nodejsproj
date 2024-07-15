const express = require('express')
const app = express()
const logger = require('./logger')

// middleware  
app.use(logger)  //this shall apply to all api request/url
app.use('api/',logger) //this shall apply to all url after api/


app.get('/',logger, (req, res) => {
    res.send('Home');
  });


app.listen(3000,() => {
    console.log(`app listening at http://localhost:3000`);
})  