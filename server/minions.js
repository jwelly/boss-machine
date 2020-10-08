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
    updatedMinion ? res.send(updatedMinion) : res.sendStatus(404);
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


minionsRouter.get('/:minionId/work', (req, res, next) => {
    const work = getAllFromDatabase('work').filter((singleWork) => {
        return singleWork.minionId === req.params.minionId;
    });   // so first we get all works from all minions, then we filter it by the minionId we are looking for
    res.send(work);
});

minionsRouter.post('/:minionId/work', (req, res, next) => {
    const workToAdd = req.body;
    workToAdd.minionId = req.params.minionId;
    const newWork = addToDatabase('work', workToAdd);
    res.status(201).send(newWork);
});

minionsRouter.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);
    if (work) {
        req.work = work;
        next();
    } else {
        res.status(404).send('Work not found!');
    }
});

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
    if (req.params.minionId === req.body.minionId) {
        const updatedWork = updateInstanceInDatabase('work', req.body);
        res.send(updatedWork);
    } else {
        res.status(400).send();
    }
});

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    const deletedWork = deleteFromDatabasebyId('work', req.params.workId);
    deletedWork ? res.status(204) : res.status(500);
    res.send();
});
