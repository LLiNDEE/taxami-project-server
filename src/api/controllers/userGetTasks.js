import { generateError } from '../../utils/errorHandler.js'
import { generateSuccessResponse } from '../../utils/successHandler.js'
import { getUserTasks } from '../services/getUserTasks.js'


export const userGetTasks = async (req, res) =>{
    try{

        const { user_id } = req.body

        const userTaskResponse = await getUserTasks(user_id)
        if(!userTaskResponse.success) return res.status(400).send(generateError(userTaskResponse.type))

        res.status(200).send(generateSuccessResponse({tasks: userTaskResponse.tasks}))

    }catch(error){
        console.log(error)
    }
}