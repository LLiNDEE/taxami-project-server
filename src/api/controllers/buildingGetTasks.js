import { generateError } from '../../utils/errorHandler.js'
import { generateSuccessResponse } from '../../utils/successHandler.js'
import { buildingGetTasks as buildingGetTasksService } from '../services/buildingGetTasks.js'

export const buildingGetTasks = async (req, res) => {
    try{

        const DATA = req.body

        const buildingTaskResponse = await buildingGetTasksService(DATA)
        if(!buildingTaskResponse.success) return res.status(400).send(generateError(buildingTaskResponse.type))

        res.status(200).send(generateSuccessResponse({tasks: buildingTaskResponse.tasks}))

    }catch(error){
        console.log(error)
        res.status(400).send(generateError('error'))
    }
}