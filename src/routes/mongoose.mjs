
import { Router} from "express"

import express from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import { createUserValidationSchema } from "../schema/validationSchemas.mjs";
import { User } from "../schema/mongoose-schema.mjs";
import "../strategies/moongose-strategy.mjs";
import { hashPassword } from "../utils/helper.mjs";



const RouterMongoose = Router()
// checkSchema >>> point to note is that this doesn't through an error so we introduce validationResult
RouterMongoose.post("/api/usermongodb", checkSchema(createUserValidationSchema), async (req, res) => {
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

RouterMongoose.post("/api/usermongodb/auth", passport.authenticate('local'), (req, res) => {
  console.log('User Authenticated');
  return res.status(200).send({msg : "You are autheticated"});
});

RouterMongoose.post("/api/usermongodb/auth/status", (req, res) => {
  // storing sessions in a database
  req.sessionStore.get(req.session.id, (err,sessionData) => {
    if (err) {
      console.log(err)
      throw err
    }
    console.log("Inside Session store Get")
    console.log(sessionData)
  })
  console.log("Checking authentication status");
  if (!req.user) return res.sendStatus(401);
  return res.send(req.user);
});




export default RouterMongoose