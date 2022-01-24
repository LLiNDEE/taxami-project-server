import { generateError } from "../../utils/errorHandler.js"
import { generateSuccessResponse } from "../../utils/successHandler.js"
import { removeTaskService } from "../services/removeTaskService.js"


export const removeTask = async (req, res) => {
    try{

        const DATA = req.body

        const removeTaskResponse = await removeTaskService(DATA)
        if(!removeTaskResponse.success) return res.status(400).send(generateError(removeTaskResponse.type))

        res.status(200).send(generateSuccessResponse("", {message: "Task removed"}))

    }catch(error){
        console.log(error)
    }
}