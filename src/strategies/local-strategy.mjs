import  passport  from "passport";
import {Strategy} from "passport-local"
import mockUsers from "../constants/constants.mjs"
import {User} from "../schema/mongoose-schema.mjs"

// const mockUsers = [
//   { id: 1, username: "caleb", displayname: "Caleb", password: "1234" },
//   { id: 2, username: "anson", displayname: "Anson", password: "1234" },
//   { id: 3, username: "joy", displayname: "Joy", password: "1234" },
//   { id: 4, username: "kylie", displayname: "Kylie", password: "1234" },
// ];


// passport.use(
//   new LocalStrategy((username, password, done) => {
//     const user = mockUsers.find((u) => u.username === username);
//     if (!user) {
//       return done(null, false, { message: "Incorrect username." });
//     }
//     if (user.password !== password) {
//       return done(null, false, { message: "Incorrect password." });
//     }
//     return done(null, user);
//   })
// );

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   const user = mockUsers.find((u) => u.id === id);
//   done(null, user);
// });
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


// unkon commit
// import passport from "passport";
// import { Strategy as LocalStrategy } from "passport-local";
// import { User } from "../schema/mongoose-schema.mjs";
// import { comparePassword } from "../utils/helper.mjs";

// passport.use(new LocalStrategy(
//   async (username, password, done) => {
//     try {
//       const user = await User.findOne({ username });
//       if (!user) {
//         return done(null, false, { message: "Incorrect username." });
//       }
//       const isMatch = await comparePassword(password, user.password);
//       if (!isMatch) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     } catch (err) {
//       return done(err);
//     }
//   }
// ));

// passport.serializeUser((user, done) => {
//   console.log(`Inside serializeUser`);
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     console.log("Inside deserializeUser");
//     const user = await User.findById(id);
//     if (!user) throw new Error("User Not Found");
//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// });
