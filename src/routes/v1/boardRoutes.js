import express, { Router } from "express"
import { StatusCodes } from "http-status-codes"

const router = express.Router()

Router.route("/")
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Note: API get list boards' })
  })
  .post((req, res) => {
    res.status(StatusCodes.CREATED).json({ message: 'Note: API create new board' })
  })

export const boardRoutes = router
