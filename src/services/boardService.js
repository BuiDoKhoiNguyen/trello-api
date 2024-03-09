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
        console.log(createdBoard)

        const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
        console.log(getNewBoard)

        return getNewBoard
    } catch (error) {
        throw error
    }
}

export const boardService = {
  createNew
}
