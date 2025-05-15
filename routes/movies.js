import { Router } from 'express';
import { movies } from '../data/data.js';
import { v4 as uuid } from 'uuid';

// Config
const router = Router();

// GET movies & GET search movies by category and/or year
router.get('/', (req, res) => {
    const { year, category } = req.query;
    let filtered = movies;
    if(year && category) {
        filtered = movies.filter(m => m.year === parseInt(year) && m.category === category);
    } else if(year) {
        filtered = movies.filter(m => m.year === parseInt(year));
    } else if(category) {
        filtered = movies.filter(m => m.category === category);
    } 
    res.json({
        success : true,
        movies : filtered
    });
});

// GET movie by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const movie = movies.find(m => m.id === id);
    if(movie) {
        res.json({
            success : true,
            movie : movie
        });
    } else {
        res.status(404).json({
            success : false,
            message : 'The given ID did not match any movies'
        });
    }
});

// POST new movie
router.post('/', (req, res) => {
    const { title, year, category } = req.body;
    if(title && year && category) {
        const newMovie = {
            id : uuid().substring(0, 5),
            title,
            year, 
            category 
        }
        movies.push(newMovie);
        res.status(201).json({
            success : true,
            movie : newMovie,
            message : 'New movie added successfully'
        });
    } else {
        res.status(400).json({
            success : false,
            message : 'title, year and category must all be included'
        });
    }
});

// PUT movie by ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, year, category } = req.body;
    const movie = movies.find(m => m.id === id);
    if(movie) {
        if(title && year && category) {
            movie.title = title;
            movie.year = year;
            movie.category = category;
            res.json({
                success : true,
                message : 'Movie updated successfully',
                movie : movie
            });
        } else {
            res.status(400).json({
                success : false,
                message : 'title, year and category must all be included'
            });
        }
    } else {
        res.status(404).json({
            success : false,
            message : 'The given ID did not match any movies'
        });
    }
});

// DELETE movie by ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const movie = movies.find(m => m.id === id);
    if(movie) {
        const filtered = movies.filter(m => m.id !== id);
        movies.length = 0;
        movies.push(...filtered);
        res.json({
            success : true,
            message : 'Movie deleted successfully',
            movie : movie
        });
    } else {
        res.status(404).json({
            success : false,
            message : 'The given ID did not match any movies'
        });
    }
});


export default router;