import { generateError } from "../../utils/errorHandler.js"
import { generateSuccessResponse } from "../../utils/successHandler.js"
import { checkCode } from "../services/checkCode.js"


export const checkCodeController = async (req, res) => {
    try{

        const { code } = req.body

        const codeInformationResponse = await checkCode(code)
        if(!codeInformationResponse.success) return res.status(400).send(generateError('codeError'))

        res.status(200).send(generateSuccessResponse(codeInformationResponse.data))
        
    }catch(error){
        console.log(error)
        res.status(400).send(generateError())
    }
}