import { generateError } from "../../utils/errorHandler.js"
import { generateSuccessResponse } from "../../utils/successHandler.js"
import { removeMemberFromBuilding } from "../services/removeMemberFromBuilding.js"




export const removeMember = async (req, res) => {
    try{

        const DATA = req.body

        const removeMemberResponse = await removeMemberFromBuilding(DATA)
        if(!removeMemberResponse.success) return res.status(400).send(generateError(removeMemberResponse.type))

        res.status(200).send(generateSuccessResponse("", {message: 'Member removed'}))

    }catch(error){
        console.log(error)
        res.status(400).send(generateError('failedToRemoveMember'))
    }
}