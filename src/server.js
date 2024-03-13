import express from "express"
import cors from "cors"
import { CLOSE_DB, CONNECT_DB } from "./config/mongodb"
import exitHook from "async-exit-hook"
import { env } from "~/config/environment"
import { APIs_V1 } from "~/routes/v1"
import { errorHandlingMiddleware } from "./middlewares/errorHandlingMiddleware"
import { corsOptions } from "./config/cors"

const START_SEVER = () => {
  const app = express()

  app.use(cors(corsOptions))

  app.use(express.json())

  app.use('/v1', APIs_V1)

  // middleware xu li loi tap trung
  app.use(errorHandlingMiddleware)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(
      `3. Hello ${env.AUTHOR}, I am running at http://${env.APP_HOST}:${env.APP_PORT}/`
    )
  })

  exitHook(() => {
    console.log("4. Disconnecting from MongoDB Cloud Atlas")
    CLOSE_DB()
    console.log("5. Disconnected from MongoDB Cloud Atlas")
  })
}

//IIFE
;(async () => {
  try {
    console.log("1. Connecting to MongoDB CLoud Atlas...")
    await CONNECT_DB()
    console.log("2. Connected to MongoDB Cloud Atlas!")

    START_SEVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

// CONNECT_DB()
// .then(() => console.log("Connected to MongoDB Cloud Atlas"))
// .then(() => START_SEVER())
// .catch(error => {
//   console.error(error)
//   process.exit(0)
// })
