import { Router } from 'express';
import { keys } from '../data/data.js';

// Config
const router = Router();

router.get('/', (req, res) => {
    const key = keys[Math.floor(Math.random() * keys.length)];
    res.json({
        success : true,
        key : key
    });
});

export default router;