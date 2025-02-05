import express from 'express'
import dotenv from 'dotenv'
import connection from './db/connection.js'
import Router from './routes/taskRoutes.js'
import cors from 'cors'

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/quicknotes/api/', Router);

app.all('*', (req, res) => {
    res.status(404).json('Page not found.');
});

const port = process.env.PORT || 3000;

app.listen(port , () => {
    console.log(`app listening on port ${port}`);
});