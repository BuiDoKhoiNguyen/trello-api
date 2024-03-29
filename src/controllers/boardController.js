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

const getDetails = async (req, res, next) => {
    try {
        // console.log('req.params: ' ,req.param)
        const boardId = req.params.id

        const board = await boardService.getDetails(boardId)

        res.status(StatusCodes.OK).json(board)
    } catch (error) {
        // run into middleware
        next(error)
    } 
}

const update = async (req, res, next) => {
    try {
        // console.log('req.params: ' ,req.param)
        const boardId = req.params.id

        const updatedBoard = await boardService.update(boardId, req.body)

        res.status(StatusCodes.OK).json(updatedBoard)
    } catch (error) {
        // run into middleware
        next(error)
    } 
}

const moveCardToDifferentColumn = async (req, res, next) => {
    try {
        const result = await boardService.moveCardToDifferentColumn(req.body)

        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        // run into middleware
        next(error)
    } 
}


export const boardController = {
    createNew,
    getDetails,
    update,
    moveCardToDifferentColumn
}