import express from "express";

// express validator
import { query,validationResult,body, matchedData , checkSchema} from "express-validator";

import {createUserValidationSchema} from "./schema/validationSchemas.mjs"

// router
import Router from "./routes/users.mjs"
import RouterMongoose from "./routes/mongoose.mjs"
// cookies
import cookieParser from "cookie-parser"

// session
import session  from "express-session";

// passport
import passport  from "passport";
// import "./strategies/local-strategy.mjs"
import "./schema/mongoose-schema.mjs"


import  mongoose  from "mongoose";
// import mongodb from "./database/mongodb.js"


// storing session in a mongo db
import Mongostore from "connect-mongo"

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost/express-tutorial")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(`Error: ${err}`));

app.use(express.json());
app.use(cookieParser("anyword"));
app.use(session({
  secret: "anyword",   //this is used to decrepte and encryte the session so it shouldn't be something that someone can geus
  saveUninitialized: false, //this is used to prevent session and cokies from saving itself even when their is no sessions or cookies provided to prevent it from taking more space
  resave: false, //this shall resave the session or cookies every time 
  cookie: {
    maxAge : 6000*60,
  },
  // // storing session in a mongo db
  store: Mongostore.create({
    client: mongoose.connection.getClient()
  }) 
    

}))

// passport
app.use(passport.initialize())  //enabling passport
app.use(passport.session())

const mockUsers = [
  { id: 1, username: "caleb", displayname: "Caleb",password : "1234" },
  { id: 2, username: "anson", displayname: "Anson",password : "1234"  },
  { id: 3, username: "joy", displayname: "Joy",password : "1234"  },
  { id: 4, username: "kylie", displayname: "Kylie",password : "1234"  },
];

// Middleware
// Also point to note is that where u place the loggingMiddleware
// Really matters…if u place the loggingMiddleware above any other function is shall not apply to the above function

const loggingMiddleware = (req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
};

app.use(loggingMiddleware);

const loggingMiddleware1 = (req, res, next) => {
  console.log("Hii Express");
  console.log(`${req.method} - ${req.url}`);
  next();
};

// loggingMiddleware1  this Middleware shall only apply to this url
app.get("/", loggingMiddleware1, (req, res) => {
  res.status(200).send("<h1>Express</h1>");
});


// router
app.use(Router)
app.use(RouterMongoose)


// authetication using passport
app.post("/api/auth",passport.authenticate("local"), (req,res) => {
  console.log("User Authenticated")
  console.log(req.session.passport)
  // the passport user id is stored in the session
  console.log(`req.session.passport.user: ${req.session.passport.user}`)
  res.sendStatus(200)
})
app.post("/api/auth/status", (req,res) => {
  console.log("inside the /api/auth/status ")
  console.log(req.user)
  if (!req.user) 
    return res.sendStatus(401)
  else {
    return req.user ? res.send(req.user) : res.sendStatus(401)
  }
  
  
})
app.post("/api/auth/logout", (req,res) => {
  console.log("logout ")
  console.log(req.user)
  req.logout((err) => { 
    if (!req.user) return res.sendStatus(400)
    res.send(200)
  })
  
})
app.get("/express", (req, res) => {
  // console.log("\n\nstart")
  // console.log(req)
  // console.log(req.query)
  res.status(200).send("<h1>Express</h1>");
});

// json
app.get("/express/json", (req, res) => {
  res.status(200).send({ msg: "Hello!" });
});
app.get("/api/users", (req, res) => {
  res.status(200).send([
    { id: 1, username: "caleb", displayname: "Caleb" },
    { id: 2, username: "anson", displayname: "Anson" },
    { id: 3, username: "joy", displayname: "Joy" },
    { id: 4, username: "kylie", displayname: "Kylie" },
  ]);
});

// params
app.get("/api/user/:id", (req, res) => {
  // console.log(req.params)
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId)) return res.status(400).send({ msg: "bad request" });

  const findUser = mockUsers.find((user) => user.id === parsedId);

  // if the field doesn't exsist it shall send a 404 error
  if (!findUser) return res.sendStaus(404);
  return res.send(findUser);
});

// query and validation
// validation   >>>  query('filter').isString().notEmpty()
// this messgae shall only appl to the  pervious function that is...(.notEmpty()) not  .withMessage("Must not be empty")
// this code doesn't work
app.get("/api/users/q", query('filter').isString().notEmpty().withMessage("Must not be empty"), (req, res) => {
  const {
    query: { filter, value },
  } = req;

  const result = validationResult(res)
  console.log(result)
  // const {filter, value} = req.query
  console.log(req.query)

  if (!filter && !value) {
    return res.send(mockUsers);
  }

  if (filter && value) {
    return res.send(mockUsers.filter((user) => user[filter].includes(value)));
  }
});

// post
// [ ] ...if u pass the validation function  as an array it shall apply to all the dataa in the body ..i.e username,displayname 

// or use  check schema for validation   checkSchema(createUserValidationSchema) 
// app.post("/api/users",checkSchema(createUserValidationSchema) , (req, res) => {
app.post("/api/users", [body("username").notEmpty().withMessage("username must not be empty").isString()], (req, res) => {
  
  console.log(req.body);
  const {body} = req

  const result = validationResult(req)
  console.log(result)
  if (!result.isEmpty()){
    return res.status(400).send({errors: result.array()})
  }

  const data = matchedData(req)
  console.log(data)

  const newUser = {id: mockUsers[mockUsers.length - 1].id + 1,...body}
  mockUsers.push(newUser)
// storing sessions in a database
  req.sessionStore.get(req.session.id, (err,sessionData) => {
    if (err) {
      console.log(err)
      throw err
    }
    console.log("Inside Session store Get")
    console.log(sessionData)
  })
  

  return res.status(201).send(newUser);
});

// PUT >>>this is use for update but this u upadate the whole data
app.put("/api/user/:id", (req, res) => {
  // console.log(req.params)
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.status(400).send({ msg: "bad request" });

  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);

  // if the field doesn't exsist it shall send a 404 error
  if (findUserIndex === -1) return res.sendStatus(404);

  mockUsers[findUserIndex] = { id: parsedId, ...body };
  return res.sendStatus(200);
});

app.post("/api/usermongodb/auth/status", (req, res) => {
  console.log("Checking authentication status");
  if (!req.user) return res.sendStatus(401);
  return res.send(req.user);
});

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
