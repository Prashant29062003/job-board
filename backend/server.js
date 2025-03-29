import express from 'express';
import 'express-async-error';
import chalk from 'chalk';
import cors from 'cors';
import morgan from 'morgan';

// Dot ENV config
import 'dotenv/config';
import connectDB from './config/db.js';
    
// Routes
import authRoutes from './routes/authRoutes.js'
import testRoutes from './routes/testRoutes.js';
import errorMiddlelware from './middlewares/errorMiddleware.js';

// mongodb connection
connectDB();

// rest object
const app = express();

// port
const PORT = process.env.PORT || 8080;

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// routes
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);

// validation middleware
app.use(errorMiddlelware)

app.get("/", (req,res)=>{
    res.send("Welcome to my job portal.")
})



app.listen(PORT, ()=>{
    console.log(chalk.bgGreen(`Server running in ${process.env.DEV_MODE} mode on port: ${PORT}`));
    
})