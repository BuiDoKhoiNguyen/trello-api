import { boardModel } from "~/models/boardModel"
import { columnModel } from "~/models/columnModel"

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


export const columnService = {
  createNew
}
