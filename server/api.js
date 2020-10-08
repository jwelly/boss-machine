const express = require('express');
const apiRouter = express.Router();

// tell our server to mount the route at these paths
const minionsRouter = require('./minions.js');
const ideasRouter = require('./ideas.js');
const meetingsRouter = require('./meetings.js');

apiRouter.use('/minions', minionsRouter); 
apiRouter.use('/ideas', ideasRouter);
apiRouter.use('/meetings', meetingsRouter);

module.exports = apiRouter;
