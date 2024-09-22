//connects to the database;

import { connect } from 'mongoose';
import dotenv from 'dotenv';
import mongoose, {Schema, model} from 'mongoose';

dotenv.config();
const connection = {}; //1. create a variable to store a connection
const uri = "mongodb+srv://eprdelapena:7JI29XGiphM2zO0a@cluster0.oq4uq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const messageTemplate = new Schema({
    message: {
        type: String,
        required: true,
    },
}, {timestamps: true, strict: false});

const newMessageSchema = model("chatdbs", messageTemplate);

const connectDB = async () => {
    try{
        if((connection).isConnected){ //2. if connection exists do nothing
            console.log("using existing connection");
            return;
        }
        else{ //3. else create a connection
            console.log("connecting...")
            const db = await connect(`${uri}`);
            (connection).isConnected = db.connections[0].readyState; 
            console.log("Database connected"); 
        }
    }
    catch(error){
        console.error(error);
    }
}

await connectDB();

const newUser = new newMessageSchema({
    message: "sample schema from database"
  });

  newUser.save();
  console.log("new user save");

export default connectDB;