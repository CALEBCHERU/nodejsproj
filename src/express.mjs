import express from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import { createUserValidationSchema } from "./schema/validationSchemas.mjs";
import { User } from "./schema/mongoose-schema.mjs";
import "./strategies/local-strategy.mjs";
import { hashPassword } from "./utils/helper.mjs";

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost/express-tutorial")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(`Error: ${err}`));

app.use(express.json());
app.use(cookieParser("anyword"));
app.use(session({
  secret: "anyword",
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 6000 * 60 },
}));

app.use(passport.initialize());
app.use(passport.session());

const loggingMiddleware = (req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
};

app.use(loggingMiddleware);

app.post("/api/usermongodb", checkSchema(createUserValidationSchema), async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());

  const data = matchedData(req);
  data.password = hashPassword(data.password);  // Hash the password before saving

  const newUser = new User(data);

  try {
    const savedUser = await newUser.save();
    console.log("New user created");
    return res.status(201).send(savedUser);
  } catch (error) {
    return res.status(400).send(error);
  }
});

app.post("/api/usermongodb/auth", passport.authenticate('local'), (req, res) => {
  console.log('User Authenticated');
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
