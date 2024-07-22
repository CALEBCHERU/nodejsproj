import  mongoose  from "mongoose";

function mongodb() {
    
    mongoose.connect("mongodb://localhost/express-tutorial").then(() => console.log("connected to Mongodb")).catch((err) => (console.log(`Error : ${err}`)))
}
mongodb()

export default mongodb
