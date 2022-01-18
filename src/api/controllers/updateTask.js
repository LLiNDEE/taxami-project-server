import { generateError } from "../../utils/errorHandler.js"
import { generateSuccessResponse } from "../../utils/successHandler.js"
import { updateTaskData } from "../services/updateTaskData.js"
import { filterValidKeys } from "../validations/validateKeys.js"

const TASK_VALID_KEYS = {
    title: 'title',
    description: 'description',
    priority: 'priority',
    status: 'status',
}

export const updateTask = async (req, res) => {
    try{

        const {user_id, task_id, ...DATA} = req.body

        const validKeys = filterValidKeys(DATA, TASK_VALID_KEYS)

        if(validKeys.length === 0) return res.status(400).send(generateError('error'))

        const formattedKeys = formatValidKeys(validKeys, DATA)

        const updateTaskResponse = await updateTaskData(user_id, task_id, formattedKeys)
        if(!updateTaskResponse.success) return res.status(400).send(generateError(updateTaskResponse.type))

        res.status(200).send(generateSuccessResponse("", {message: "Task successfully updated"}))

    }catch(error){
        console.log(error)
        res.status(400).send(generateError('error'))
    }
}

const formatValidKeys = (keys, values) => keys.reduce((p, k) =>( p[k] = values[k], p ), {})