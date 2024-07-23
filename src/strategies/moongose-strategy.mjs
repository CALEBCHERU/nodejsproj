import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../schema/mongoose-schema.mjs";
import { comparePassword } from "../utils/helper.mjs";

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  console.log(`Inside serializeUser`);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    console.log("Inside deserializeUser");
    const user = await User.findById(id);
    if (!user) throw new Error("User Not Found");
    done(null, user);
  } catch (err) {
    done(err);
  }
});
