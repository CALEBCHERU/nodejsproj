import { Router} from "express"
import {query} from "express-validator"

const router = Router()

router.get("/api/products", (req,res) => {
    console.log("SessionID: " + req.session.id)
    res.status(201).send([{id: 123, name: "chicken breast", price: 12.99}])
} )
router.get("/api/cookie", (req,res) => {
    // cookies
    res.cookie('age', "18",{maxAge: 360000})
    // res.cookie('age', "18")
    console.log(req.headers.cookie)
    console.log(req.cookies)
    if (req.cookies.age === "18")
        return res.status(201).send([{id: 123, name: "chicken breast", price: 12.99}])
    return res.status(403).send({msg: "Sorry You need the correct coolie "})
} )
router.get("/api/cookiesigned", (req,res) => {
    // cookies signed
    res.cookie('name', "Caleb",{maxAge: 10000, signed: true})
    console.log(req.headers.cookie)
    console.log(req.cookies)
    console.log(req.signedCookies)
    return res.status(201).send([{id: 123, name: "chicken breast", price: 12.99}])
} )
//sessions
router.get("/api/session", (req,res) => {
    res.cookie('name', "Caleb",{maxAge: 10000, signed: true}) //this cookie used to illustrate the sessin id
    console.log(req.headers.session)
    console.log(req.session)
    req.session.visited = true
    console.log("SessionID: " + req.session.id)
    return res.status(201).send([{id: 123, name: "chicken breast", price: 12.99}])
} )
router.get("/api/session-store", (req,res) => {
    console.log("SessionID: " + req.session.id)
    req.sessionStore.get(req.session.id,(err,sessionData) => {
        if (err) {
            throw err 
        }
        console.log(sessionData)
    })
    res.status(201).send([{id: 123, name: "chicken breast", price: 12.99}])
} )
export default router