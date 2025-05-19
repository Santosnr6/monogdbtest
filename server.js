import express from 'express';
import keysRouter from './routes/keys.js';
import actorsRouter from './routes/actors.js';
import moviesRouter from './routes/movies.js';
import mongoose from 'mongoose';
import Movie from './models/movie.js';
import dotenv from 'dotenv';

// Config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
mongoose.connect(process.env.CONNECTION_STRING);
const database = mongoose.connection;

// Middlewares
app.use(express.json());

// Routes
app.use('/api/keys', keysRouter);
app.use('/api/actors', actorsRouter);
app.use('/api/movies', moviesRouter);

database.on('error', (error) => {
    console.log('Could not connect');
});

database.once('connected', () => {
    console.log('Connected to database');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});