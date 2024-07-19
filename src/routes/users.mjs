import { Router} from "express"
import {query} from "express-validator"

const router = Router()

router.get("/api/products", (req,res) => {
    // cookies
    res.status(201).send([{id: 123, name: "chicken breast", price: 12.99}])
} )
router.get("/api/cookie", (req,res) => {
    // cookies
    res.cookie('name', "Caleb",{maxAge: 60})
    console.log(req.headers.cookie)
    console.log(req.cookies)
    if (req.cookies.name === "Caleb")
        return res.status(201).send([{id: 123, name: "chicken breast", price: 12.99}])
    return res.status(403).send({msg: "Sorry You need the correct coolie "})
} )
router.get("/api/cookiesigned", (req,res) => {
    // cookies signed
    res.cookie('name', "Caleb",{maxAge: 60})
    console.log(req.headers.cookie)
    console.log(req.signedcookies)
    if (req.signedcookies.name === "Caleb")
        return res.status(201).send([{id: 123, name: "chicken breast", price: 12.99}])
    return res.status(403).send({msg: "Sorry You need the correct coolie "})
} )

export default router