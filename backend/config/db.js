import mongoose from "mongoose";
import chalk from "chalk";

const mongo_uri = process.env.MONGO_URL;

const connectDB = async ()=>{
    try {
        const conn = 
                    await mongoose.connect(
                        mongo_uri, 
                        {serverSelectionTimeoutMS: 5000})
                            .catch(err => console.log(err.reason));
        console.log(chalk.bgMagenta.white(`Connected To mongoDB Database ${mongoose.connection.host}`));
        
    } catch (error) {
        console.log(chalk.bgRed.white(`MongoDB error: ${error}.`));
        
    }
}

export default connectDB;