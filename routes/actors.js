import { Router } from 'express';
import { actors } from '../data/data.js';
import { v4 as uuid } from 'uuid';

const router = Router();

router.get('/', (req, res) => {
    const { search } = req.query;
    if(search) {
        const matches = actors.filter(a => a.name.includes(search));
        res.json({
            success : true,
            actors : matches
        });
    } else {
        res.json({
            success : true,
            actors : actors
        });
    }
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const actor = actors.find(a => a.id === id);
    if(actor) {
        res.json({
            success : true,
            actor : actor
        });
    } else {
        res.status(404).json({
            succes : false,
            message : 'The given ID did not match any actors'
        });
    }
});

router.post('/', (req, res) => {
    const { name } = req.body;

    if(name) {
        const newActor = {
            id : uuid().substring(0, 5),
            name : name 
        }
        actors.push(newActor);
        res.status(201).json({
            success : true,
            actor : newActor,
            message : 'Actor added successfully'
        });
    } else {
        res.status(400).json({
            success : false,
            message : 'Name must be provided'
        });
    }
});


export default router;