import { generateError } from "../../utils/errorHandler.js"
import { generateSuccessResponse } from "../../utils/successHandler.js"
import { applyCode } from "../services/applyCode.js"


export const userJoinBuilding = async (req, res) => {
    try{

        const { user_id, invite_code } = req.body

        const applyCodeResponse = await applyCode(invite_code, user_id)
        if(!applyCodeResponse.success) return res.status(400).send(generateError(applyCodeResponse.type))

        res.status(200).send(generateSuccessResponse("", {message: "Successfully applied invite code"}))


    }catch(error){
        return res.status(400).send(generateError('error', {message: "Could not apply code"}))
    }
}