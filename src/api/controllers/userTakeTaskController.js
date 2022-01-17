import { generateError } from "../../utils/errorHandler.js"
import { generateSuccessResponse } from "../../utils/successHandler.js"
import { userTakeTask } from "../services/userTakeTask.js"


export const userTakeTaskController = async (req, res) => {
    try{

        const DETAILS = req.body

        const taskResponse = await userTakeTask(DETAILS)
        if(!taskResponse.success) return res.status(400).send(generateError(taskResponse.type))

        res.status(200).send(generateSuccessResponse("", {message: 'Task added to user'}))

    }catch(error){
        console.log(error)
        res.status(400).send(generateError('error'))
    }
}