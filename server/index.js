import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import path from 'path';
import fs from 'fs';

// __filename and __dirname don't exist with "type": "module"
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

dotenv.config();

app.use(cors());

//express instead bodyParser
app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));


const CONNECTION_URL = process.env.MONGODB_CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
        console.log(__filename);
        console.log(__dirname);
    }))    
    .catch( err => console.log(err.message));


mongoose.set('useFindAndModify', false) // To avoid warning in the console

/*
const connection = mongoose.connection; 
connection.once('open', () => { 
    console.log('MongoDB database connection established successfully'); 
})
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)
*/

app.use('/posts', postRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    
    const filePath = path.resolve(__dirname, '../client/build', 'index.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if(err){return console.log(err)}
        res.send(data);
    })
    
   //res.send('Hello to the memories api. Use "/posts" to get some posts');
})

app.use(express.static(path.resolve(__dirname, '../client/build')));