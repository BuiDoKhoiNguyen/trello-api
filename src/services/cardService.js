import { columnModel } from "~/models/columnModel"
import { cardModel } from "~/models/cardModel"

const createNew = async (reqBody) => {
    try {
        const newCard = {
            ...reqBody
        }
        const createdCard = await cardModel.createNew(newCard)
        // console.log(createdCard)

        const getNewCard = await cardModel.findOneById(createdCard.insertedId)
        // console.log(getNewCard)

        if(getNewCard) {
            await columnModel.pushCardOrderIds(getNewCard)
        }

        return getNewCard
    } catch (error) {
        throw new Error(error)
    }
}


export const cardService = {
  createNew
}
