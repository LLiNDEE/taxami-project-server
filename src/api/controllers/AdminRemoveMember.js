import { generateError } from "../../utils/errorHandler.js";
import { generateSuccessResponse } from "../../utils/successHandler.js";
import { AdminRemoveMember as RemoveMember } from "../services/AdminRemoveMember.js";

export const AdminRemoveMember = async (req, res) => {
    try{

        const removeMemberResponse = await RemoveMember(req.body)
        if(!removeMemberResponse.success) return res.status(400).send(generateError('error'))

        res.status(200).send(generateSuccessResponse({message: "Successfully removed member!"}))

    }catch(error){
        res.status(400).send(generateError('failedToRemoveMember'))
    }
}