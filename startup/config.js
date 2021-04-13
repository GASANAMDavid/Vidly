import config from 'config'
import winston from 'winston'


const key = config.get('jwtPrivateKey')
if (!key) {
    throw new Error('FATAL ERROR: JWT Private Key is required')
}
