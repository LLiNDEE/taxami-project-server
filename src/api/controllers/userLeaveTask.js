import { generateError } from "../../utils/errorHandler.js"
import { generateSuccessResponse } from "../../utils/successHandler.js"
import { removeTaskFromUser } from '../services/removeTaskFromUser.js'



export const userLeaveTask = async (req, res) => {
    try{

        const DETAILS = req.body

        const removeTaskResponse = await removeTaskFromUser(DETAILS)
        if(!removeTaskResponse.success) return res.status(400).send(generateError(removeTaskResponse.type))

        res.status(200).send(generateSuccessResponse("", {message: "successfully removed task"}))


    }catch(error){
        console.log(error)
        res.status(400).send(generateError('failedToRemoveTask'))
    }
}