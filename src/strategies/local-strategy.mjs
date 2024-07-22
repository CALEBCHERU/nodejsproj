import  passport  from "passport";
import {Strategy} from "passport-local"
import mockUsers from "../constants/constants.mjs"
import {User} from "../schema/mongoose-schema.mjs"

passport.serializeUser((user,done) => {
    console.log(`Inside Serializer User`)
    //console.log(user) = console.log(req.user) are the same
    console.log(user);
    done(null,user.id)
})

passport.deserializeUser((id,done) => {
    try {
    } catch (error) {
        done(error,null)
    } 
})

export default passport.use(
    new Strategy(  (username,password,done) => {
        console.log(`Username: ${username }`)
        console.log(`Password : ${password}`)
        try {
            const findUser = mockUsers.find((user) => user.username === username )
            if (!findUser) 
                throw new Error('User not found')
            if (findUser.password !== password)
                throw new Error("Invalid credentials") //throws the error to the catch
            done(null, findUser)
        } catch (error) {
            done(error,null)
            
        }
    })
)