const express = require('express');
const app = express();

const port = 3000;

const path = require('path')

const persons = require("../source.json")

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.use(express.static('./public'))
app.get('/homepage', (req, res) => {
    res.readFile(path.resolve(__dirname, './navbar-app/index.html'));
  });

app.get('/info', (req, res) => {
  const newPerson =  persons.map((person) => {
    const {id,name,age} = person
    return {id,name,age}
  })
  res.json(newPerson);
});
app.get('/info/:personID', (req, res) => {
  // console.log(req)
  // console.log(req.params)
  const {personID} = req.params;

  const singlePerson = persons.find((person) => person.id === Number(personID))
  if (!singlePerson){
    return res.status(404).send("<h1>Page Not Found 404 error</h1> ")
  }
  res.json(singlePerson)
});

// querry
app.get('/info/api/v1/query', (req, res) => {
  // console.log(req.query)

  const {search, limit} = req.query
  let sortedpersons = [...persons]
  
  if(search){
    sortedpersons = sortedpersons.filter((person) => {
      return(person.name.startsWith(search))
       
    })
  }

  if(limit){
    sortedpersons = sortedpersons.slice(0,Number(limit))

  }
  res.status(200).json(sortedpersons)

  // res.send('<h1>hello Caleb</h1>')
  

  
});

app.get('/about', (req, res) => {
    res.send('About page');
  });
  app.all('*', (req, res) => {
    res.status(404).send('About page');
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
