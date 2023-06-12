import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { logger, errorlogger } from './share/logger'
import { Server } from 'http'

async function boostrap() {
  let server: Server

  try {
    // await mongoose.connect("mongodb://127.0.0.1:27017/test");
    await mongoose.connect(config.database_url as string)
    logger.info(`Database is Connected successfully`)
    server = app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`)
    })
  } catch (err) {
    errorlogger.error('Failed to connection in database ', err)
  }
  process.on('unhandledRejection', error => {
    console.log('Unhandled Rejection is detected')
    if (server) {
      server.close(() => {
        errorlogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}
boostrap()
