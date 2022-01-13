import { generateError } from "../../utils/errorHandler.js"
import { generateSuccessResponse } from "../../utils/successHandler.js"
import { adminCreateCode } from "../models/adminCreateCode.js"



export const adminGenerateCode = async (req, res) => {
    try{

        const { user_id, type } = req.body

        const createCodeResponse = await adminCreateCode(user_id, type)
        if(!createCodeResponse.success) return res.status(400).send(generateError('failed'))

        res.status(200).send(generateSuccessResponse({code: createCodeResponse.code}))

    }catch(error){
        console.log(error)
    }
}