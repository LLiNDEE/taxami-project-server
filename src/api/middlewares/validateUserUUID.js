import { generateError } from "../../utils/errorHandler.js";
import { getUserBy } from "../models/getUserBy.js";

export const validateUserUUID = async (req, res, next) => {
    try{

        const { user_id } = req.body
        if(!user_id) return res.status(400).send(generateError('invalidParams'))
        const verifyUserUUID = await getUserBy('_id', user_id)
        if(!verifyUserUUID.success || verifyUserUUID.type === 'failed') return res.status(400).send(generateError('noUser'))
        
        next()

    }catch(error){
        return res.status(400).send(generateError('noUser'))
    }
}