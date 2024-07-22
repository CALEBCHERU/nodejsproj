import  passport  from "passport";
import {Strategy} from "passport-local"


passport.serializeUser((user,done) => {
    console.log(`Inside Serializer User`)
    //console.log(user) = console.log(req.user) are the same
    console.log(user);
    done(null,user.id)
})

passport.deserializeUser(async(id,done) => {
    try {
        console.log("Inside Deserializer");
        console.log(`Deserializer User Id : ${id}`);
        const findUser = await User.findById(id)
        if (!findUser) 
            throw new Error("User Not Found") 
        done(null,findUser)
    } catch (error) {
        done(error,null)
    }
})

export default passport.use(
    new Strategy( async(username,password,done) => {
        try {
            const findUser = await User.findOne({ username })
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