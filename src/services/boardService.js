import { StatusCodes } from "http-status-codes"
import { boardModel } from "~/models/boardModel"
import { columnModel } from "~/models/columnModel"
import ApiError from "~/utils/ApiError"
import slugify from "~/utils/formatter"
import { cloneDeep } from "lodash"
import { cardModel } from "~/models/cardModel"

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

        // like prototype design pattern
        const resBoard = cloneDeep(board)
        // Filter cards belong to current column
        resBoard.columns.forEach(column => {
            column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id))  

            // column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())  
        })

        // delete card from origin board
        delete resBoard.cards
       
        return resBoard
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (boardId, reqBody) => {
    try {
        const updateData = {
            ...reqBody,
            updatedAt: Date.now()
        }

        const updatedBoard = await boardModel.update(boardId, updateData)

        return updatedBoard
    } catch (error) {
        throw new Error(error)
    }
}

const moveCardToDifferentColumn = async (reqBody) => {
    try {
        //B1: cap nhat cardOrderIds cua column ban dau chua no
        await columnModel.update(reqBody.prevColumnId, {
            cardOrderIds: reqBody.prevCardOrderIds,
            updatedAt: Date.now()
        })

        //B2:
        await columnModel.update(reqBody.nextColumnId, {
            cardOrderIds: reqBody.nextCardOrderIds,
            updatedAt: Date.now()
        })

        //B3:
        await cardModel.update(reqBody.currentCardId, {
            columnId: reqBody.nextColumnId
        })

        return { updateResult: 'Successfully' }
    } catch (error) {
        throw new Error(error)
    }
}


export const boardService = {
  createNew,
  getDetails,
  update,
  moveCardToDifferentColumn
}
