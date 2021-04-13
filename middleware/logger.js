import winston from 'winston'
import 'winston-mongodb'
import 'express-async-errors';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [   
      new winston.transports.Console({ colorize: true,name: 'console',timestamp: () => new Date(),}),
      new winston.transports.MongoDB({ db: 'mongodb://localhost/vidly', options: { useUnifiedTopology: true }, metaKey: 'meta'}),
      new winston.transports.File({ filename: './loggings/error.log', level: 'error', exitOnError: true })
    ],  
    exceptionHandlers: [
      new winston.transports.File({ filename: './loggings/exceptions.log', exitOnError: true })
    ],
    rejectionHandlers: [
      new winston.transports.File({ filename: './loggings/rejections.log', exitOnError: true })
    ]
    });
    
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({     
    format: winston.format.simple()
    }));
}


export default logger