import { StatusCodes } from "http-status-codes"

const createNew = async (req, res, next) => {
    try {
        console.log('req.body: ' ,req.body)
        console.log('req.query: ' ,req.query)
        console.log('req.params: ' ,req.param)
        console.log('req.files: ' ,req.files)
        console.log('req.cookies: ' ,req.cookies)
        console.log('req.jwtDecoded: ' ,req.jwtDecoded)
        
        res.status(StatusCodes.CREATED).json({ message: 'Post from Controller: API create new board' })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: error.message
        })
    }
}

export const boardController = {
    createNew
}