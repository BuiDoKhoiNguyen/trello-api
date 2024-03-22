import { StatusCodes } from "http-status-codes"
import { boardModel } from "~/models/boardModel"
import { cardModel } from "~/models/cardModel"
import { columnModel } from "~/models/columnModel"
import ApiError from "~/utils/ApiError"

const createNew = async (reqBody) => {
    try {
        const newColumn = {
            ...reqBody
        }
        const createdColumn = await columnModel.createNew(newColumn)
        // console.log(createdColumn)
        const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)
        // console.log(getNewColumn)

        if(getNewColumn) {
            getNewColumn.cards = []

            await boardModel.pushColumnOrderIds(getNewColumn)
        }

        return getNewColumn
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (columnId, reqBody) => {
    try {
        const updateData = {
            ...reqBody,
            updatedAt: Date.now()
        }

        const updatedColumn = await columnModel.update(columnId, updateData)

        return updatedColumn
    } catch (error) {
        throw new Error(error)
    }
}

const deleteItem = async (columnId) => {
    try {
        const targetColumn = await columnModel.findOneById(columnId)
        if(!targetColumn) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Column not found!')
        }
        // Xoa column
        await columnModel.deleteOneById(columnId)

        // Xoa toan bo card
        await cardModel.deleteManyByColumnId(columnId)

        await boardModel.pushColumnOrderIds(targetColumn)

        return { deleteResult: 'Column and its Cards deleted successfully!'}
    } catch (error) {
        throw new Error(error)
    }
}

export const columnService = {
  createNew,
  update,
  deleteItem
}
