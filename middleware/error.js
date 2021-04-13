import winston from 'winston'

export function error(err, req, res, next){
    winston.error({message: err.message, level: err.level, stack: err.stack, meta: err}),
    res.status(500).send('Something failed')
}