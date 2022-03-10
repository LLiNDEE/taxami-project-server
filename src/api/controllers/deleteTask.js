import { generateError } from "../../utils/errorHandler.js";
import { generateSuccessResponse } from "../../utils/successHandler.js";
import { DeleteTask as deleteTaskService } from '../services/DeleteTask.js'

export const deleteTask = async (req, res) =>{
    try{

        const { task_id } = req.body


        const deleteTaskResponse = await deleteTaskService(task_id)
        if(!deleteTaskResponse.success) return res.status(400).send(generateError(deleteTaskResponse.type))

        res.status(200).send(generateSuccessResponse({message: 'Successfully removed task!'}))

    }catch(error){
        res.status(400).send(generateError('failedToDeleteTask'))
    }
}