import { StatusCodes } from "http-status-codes"
import { boardService } from "~/services/boardService"

const createNew = async (req, res, next) => {
    try {
        // console.log('req.body: ' ,req.body)
        // console.log('req.query: ' ,req.query)
        // console.log('req.params: ' ,req.param)
        // console.log('req.files: ' ,req.files)
        // console.log('req.cookies: ' ,req.cookies)
        // console.log('req.jwtDecoded: ' ,req.jwtDecoded)
        
        const createdBoard = await boardService.createNew(req.body)

        res.status(StatusCodes.CREATED).json(createdBoard)
    } catch (error) {
        // run into middleware
        next(error)
    } 
}

export const boardController = {
    createNew
}