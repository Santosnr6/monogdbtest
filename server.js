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
// const dbURI = "mongodb+srv://nodeninja:nodeninja@nodecluster.uxlgiid.mongodb.net/mmdb?retryWrites=true&w=majority&appName=nodecluster";
mongoose.connect(process.env.CONNECTION_STRING)
    .then((result) => {
        console.log('Connected to db');
        app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
    }).catch(err => console.log(err));

// Middlewares
app.use(express.json());

// Routes
app.use('/api/keys', keysRouter);
app.use('/api/actors', actorsRouter);
app.use('/api/movies', moviesRouter);

app.get('/movies', (req, res) => {
    Movie.find()
        .then(movies => res.json(movies))
        .catch(err => res.status(500).json({ success: false, message: err.message }));
});

app.get('/movies/:id', (req, res) => {
    Movie.findById(req.params.id)
        .then(movie => {
            if (!movie) {
                return res.status(404).json({ success: false, message: 'Film hittades inte' });
            }
            res.json(movie);
        })
        .catch(err => res.status(500).json({ success: false, message: err.message }));
});

app.post('/movies', (req, res) => {
    if(req.body) {
        const movie = new Movie(req.body);
        movie.save()
            .then((result) => {
                res.send(result);
            }).catch(err => {
                res.status(401).json({
                    success : false,
                    message : err.message
                })
            });
    }
});

app.put('/movies/:id', (req, res) => {
    Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then(updatedMovie => {
            if (!updatedMovie) {
                return res.status(404).json({ success: false, message: 'Film att uppdatera hittades inte' });
            }
            res.json(updatedMovie);
        })
        .catch(err => res.status(400).json({ success: false, message: err.message }));
});

app.delete('/movies/:id', (req, res) => {
    Movie.findByIdAndDelete(req.params.id)
        .then(deletedMovie => {
            if (!deletedMovie) {
                return res.status(404).json({ success: false, message: 'Film att ta bort hittades inte' });
            }
            res.json({ success: true, message: 'Film borttagen' });
        })
        .catch(err => res.status(500).json({ success: false, message: err.message }));
});
