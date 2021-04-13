import mongoose from 'mongoose';
import winston from 'winston';

export default function(){
mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => winston.info('Connected to Vidly DB.....'))
}