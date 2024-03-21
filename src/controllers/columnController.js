import { StatusCodes } from "http-status-codes"
import { columnService } from "~/services/columnService"

const createNew = async (req, res, next) => {
    try {   
        const createdColumn = await columnService.createNew(req.body)

        res.status(StatusCodes.CREATED).json(createdColumn)
    } catch (error) {
        // run into middleware
        next(error)
    } 
}

const update = async (req, res, next) => {
    try {
        // console.log('req.params: ' ,req.param)
        const columnId = req.params.id

        const updatedColumn = await columnService.update(columnId, req.body)

        res.status(StatusCodes.OK).json(updatedColumn)
    } catch (error) {
        // run into middleware
        next(error)
    } 
}

export const columnController = {
    createNew,
    update
}