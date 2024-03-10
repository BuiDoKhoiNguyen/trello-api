import { StatusCodes } from "http-status-codes"
import { boardModel } from "~/models/boardModel"
import ApiError from "~/utils/ApiError"
import slugify from "~/utils/formatter"

const createNew = async (reqBody) => {
    try {
        const newBoard = {
            ...reqBody,
            slug: slugify(reqBody.title)
        }
        const createdBoard = await boardModel.createNew(newBoard)
        // console.log(createdBoard)

        const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
        // console.log(getNewBoard)

        return getNewBoard
    } catch (error) {
        throw new Error(error)
    }
}

const getDetails = async (boardId) => {
    try {
        const board = await boardModel.getDetails(boardId)

        if(!board) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')
        }
       
        return board
    } catch (error) {
        throw new Error(error)
    }
}

export const boardService = {
  createNew,
  getDetails
}
