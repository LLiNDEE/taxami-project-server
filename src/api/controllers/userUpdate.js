import { generateError } from "../../utils/errorHandler.js"
import { filterValidKeys } from "../validations/validateKeys.js"
import { UpdateUser } from "../services/UpdateUser.js"
import { generateSuccessResponse } from '../../utils/successHandler.js'

const USER_VALID_KEYS = {
    first_name: 'first_name',
    last_name: 'last_name',
    email: 'email'
}

export const userUpdate = async (req, res) => {
    try{

        const { user_id, ...DATA } = req.body

        const validKeys = filterValidKeys(DATA, USER_VALID_KEYS)
        if(validKeys.length === 0) return res.status(400).send(generateError('error'))

        const formattedKeys = formatValidKeys(validKeys, DATA)

        const updateUserResponse = await UpdateUser(user_id, formattedKeys)
        if(!updateUserResponse.success) return res.status(400).send(generateError('failedToUpdate'))

        res.status(200).send(generateSuccessResponse({message: "userUpdateSuccess"}))

    }catch(error){
        res.status(400).send(generateError('failedToUpdate'))
    }
}

const formatValidKeys = (keys, values) => keys.reduce((p, k) =>( p[k] = values[k], p ), {})
