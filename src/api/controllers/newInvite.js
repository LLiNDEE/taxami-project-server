import { generateError } from "../../utils/errorHandler.js";
import { generateSuccessResponse } from "../../utils/successHandler.js";
import { createInvite } from "../models/createInvite.js";

export const newInvite = async (req, res) => {
    try{
        const DETAILS = req.body

        const createInviteResponse = await createInvite(DETAILS.user_id, DETAILS.building_id)
        if(!createInviteResponse.success) return res.status(400).send(generateError(createInviteResponse.type))
        
        return res.status(200).send(generateSuccessResponse({invite_code: createInviteResponse.code}, {message: 'Successfully created an invite'}))

    }catch(error){
        console.log(error)
        return res.status(400).send(generateError('failedToApplyInvite'))
    }
}
