import { generateError } from "../../utils/errorHandler.js"
import { generateSuccessResponse } from "../../utils/successHandler.js"
import { addNewTask } from "../services/addNewTask.js"
import { getUserBy } from '../services/getUserBy.js'
import { getBuildingBy } from "../services/getBuildingBy.js"
import { checkPermission } from "../validations/CheckPermission.js"


export const newTask = async (req, res) => {
    try{

        const DETAILS = req.body
        const { user_id, building_id } = DETAILS

        const userOBJ = await getUserBy('_id', user_id)
        const userBuildings = userOBJ.user[0].buildings

        const buildingOBJ = await getBuildingBy(building_id)
        if(!buildingOBJ.success) return res.status(400).send(generateError('noBuilding'))

        const building = buildingOBJ.building
        const permissions = building.permissions

        if(!userBuildings.includes(building_id) && !checkPermission(user_id, "addTask", permissions)) return res.status(401).send(generateError('noPermission'))

        const addTaskResponse = await addNewTask(DETAILS)
        if(!addTaskResponse.success) return res.status(424).send(generateError('failedToAddTask'))

        res.status(200).send(generateSuccessResponse("", {message: 'Successfully added task'}))

    }catch(error){
        console.log(error)
        res.status(400).send(generateError('failedToAddTask'))

    }
}
