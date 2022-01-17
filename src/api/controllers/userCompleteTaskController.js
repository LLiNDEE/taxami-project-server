import { generateError } from "../../utils/errorHandler.js"
import { generateSuccessResponse } from "../../utils/successHandler.js"
import { completeTask } from "../services/completeTask.js"



export const userCompleteTaskController = async (req, res) => {
    try{

        const DETAILS = req.body

        const completeTaskResponse = await completeTask(DETAILS)
        if(!completeTaskResponse.success) return res.status(400).send(generateError(completeTaskResponse.type))

        res.status(200).send(generateSuccessResponse())

    }catch(error){
        console.log(error)
        res.status(400).send(generateError('error'))
    }
}