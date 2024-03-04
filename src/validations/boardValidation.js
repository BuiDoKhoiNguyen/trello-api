import Joi from "joi"
import { StatusCodes } from "http-status-codes"

const createNew = async (req, res, next) => {
    const correctCondition = Joi.object({
        title: Joi.string().required().min(3).max(50).trim().strict().message({
            'any.required': 'Title is required',
            'string.empty': 'Title is not allowed to be empty',
            'string.min': 'Title min 3 characters',
            'string.max': 'Title max 50 characters',
            'string.trim': 'Title must not have leading or trailing whitespace'
        }),
        description: Joi.string().required().min(3).max(256).trim().strict(),
    })

    try {
        console.log('req.body:' ,req.body)

        // abortEarly to check error top to bot
        await correctCondition.validateAsync(req.body, { abortEarly: false })
        next()  
        res.status(StatusCodes.CREATED).json({ message: 'Post: API create new board' })
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            errors: new Error(error).message
        })
    }
}

export const boardValidation = {
    createNew
}