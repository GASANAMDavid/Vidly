import express from 'express';
import winston from 'winston'
import connection from './startup/dbConnect.js'
import logger from './middleware/logger.js';
import routes from './startup/routes.js';
import './startup/config.js'
const app = express(); 

connection();
routes(app)
winston.add(logger);

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}....`));

