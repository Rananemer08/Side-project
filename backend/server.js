import express from 'express';

import sequelize from './Config/connection.js'
import dotenv from 'dotenv';
import cors from 'cors';
// import bodyParser from "body-parser";
import userRoutes from './Routes/userRouter.js';
import memeRoutes from './Routes/MemeRouter.js';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 8090;

sequelize.sync()   


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors("*"));

app.get('/',(req,res)=>{
 res.send("hello world")
})

app.use('/api/users', userRoutes);
app.use('/api/memes', memeRoutes);



app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
  });
  