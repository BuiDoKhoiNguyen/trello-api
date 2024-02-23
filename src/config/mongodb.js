/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

//nguyen
//05122004

const MONGODB_URL = "mongodb+srv://nguyen:05122004@trello.ud3owiu.mongodb.net/?retryWrites=true&w=majority"

const DATABASE_NAME = "trello"

import { MongoClient, ServerApiVersion } from "mongodb"

let trelloDatabaseInstance = null

const mongoClientInstance = new MongoClient(MONGODB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

export const CONNECT_DB = async () => {
  await mongoClientInstance.connect()

  trelloDatabaseInstance = mongoClientInstance.db(DATABASE_NAME)
}

export const GET_DB = () => {
  if (!trelloDatabaseInstance)
    throw new Error("Must connect to Database first!")
  return trelloDatabaseInstance
}

export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}
