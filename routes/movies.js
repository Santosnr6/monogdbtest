import { Router } from 'express';
import { movies } from '../data/data.js';
import { v4 as uuid } from 'uuid';
import Movie from '../models/movie.js';

// Config
const router = Router();

// GET movies & GET search movies by category and/or year
router.get('/', async (req, res) => {
    const movies = await Movie.find();
    res.json(movies);
});

// GET movie by ID
router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.json(movie);
});

// POST new movie
router.post('/', async (req, res) => {
    const result = await Movie.create(req.body);
    res.json(result);
});

// PUT movie by ID
router.put('/:id', async(req, res) => {
    const result = await Movie.findByIdAndUpdate(req.params.id, req.body);
    res.json(result);
});

// DELETE movie by ID
router.delete('/:id', async (req, res) => {
    const result = await Movie.findByIdAndDelete(req.params.id);
    res.json(result);
});

export default router;