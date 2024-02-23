/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from "express"
import { CLOSE_DB, CONNECT_DB } from "./config/mongodb"
import exitHook from "async-exit-hook"

const START_SEVER = () => {
  const app = express()

  const hostname = "localhost"
  const port = 8017

  app.get("/", (req, res) => {
    // console.log(await GET_DB().listCollections().toArray())
    res.end("<h1>Hello World!</h1><hr>")
  })

  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`3. Hello Nguyen, I am running at http://${hostname}:${port}/`)
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
