import { Router} from "express"

import {
    query,
    validationResult,
    checkSchema,
    matchedData,
} from "express-validator"

import { createUserValidationSchema } from "../schema/validationSchemas.mjs"

import { User } from "../schema/mongoose-schema.mjs"
// passport
import passport  from "passport";
// import "./strategies/local-strategy.mjs"
import "../schema/mongoose-schema.mjs"


const RouterMongoose = Router()
// checkSchema >>> point to note is that this doesn't through an error so we introduce validationResult
RouterMongoose.post("/api/usermongodb",checkSchema(createUserValidationSchema),async(req,res)=>{
    const result = validationResult(req)
    if(!result.isEmpty()) return res.send(result.array())
    // const {body} = req
    // const newUser = new User(body)
    // the below is the recommended way  to grab the data
    const data = matchedData(req)
    const newUser = new User(data)
    
    
    try {
        const savedUser = await newUser.save()
        return res.status(201).send(savedUser) 
        console.log("new user created")
    } catch (error) {
        return res.sendStatus(400)
    }
    
    

})

// authetication using passport
RouterMongoose.post("/api/usermongodb/auth",passport.authenticate(), (req,res) => {
    console.log("User Authenticated")
    console.log(req.session.passport)
    // the passport user id is stored in the session
    console.log(`req.session.passport.user: ${req.session.passport.user}`)
    res.sendStatus(200)
  })

RouterMongoose.post("/api/usermongodb/auth/status", (req,res) => {
    console.log("inside the /api/auth/status ")
    console.log(req.user)
    if (!req.user) return res.sendStatus(401)
    return req.user ? res.send(req.user) : res.sendStatus(401)
    
  })


export default RouterMongoose