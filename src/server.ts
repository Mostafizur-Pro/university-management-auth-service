import mongoose from 'mongoose'
import app from './app'
import config from './config'
import logger from './share/logger'

async function boostrap() {
  try {
    // await mongoose.connect("mongodb://127.0.0.1:27017/test");
    await mongoose.connect(config.database_url as string)
    logger.info(`Database is Connected successfully`)
    app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`)
    })
  } catch (err) {
    logger.error('Failed to connection in database ', err)
  }

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
boostrap()
