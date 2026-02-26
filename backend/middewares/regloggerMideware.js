import winston  from 'winston';
import expressWinston from 'express-winston';

export const reguestlogger = expressWinston.logger({
  transports:[
    new winston.transports.File({filename: 'requests.log'})
  ],

  format: winston.format.json()
})

export const errorlogger = expressWinston.errorLogger({
  transports:[
    new winston.transports.File({filename: 'errors.log'})
  ],

  format: winston.format.json()
})