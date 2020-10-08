const express = require('express');
const minionsRouter = express.Router();

module.exports = minionsRouter;

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db');

// Here we find the data for a specific minion based on the id parameter when/if entered
minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send('Minion not found!')
    }
});

minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);      // this is enough because we already retrieved the specific minion from .param
});

minionsRouter.put('/:minionId', (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinion);
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    const deletedMinion = deleteFromDatabasebyId('minions', req.params.minionId);
    // we can't do req.minion here, because we only want the ID from the params, not the whole minion data

    if (deletedMinion) {
        res.status(204);
    } else {
        res.status(500);    // if the element is not found
    }
    res.send();
});