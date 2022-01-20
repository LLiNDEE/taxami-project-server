import { newBuilding } from "../controllers/newBuilding.js"
import { newTask } from "../controllers/newTask.js"
import { updateTask } from "../controllers/updateTask.js"
import { newInvite } from "../controllers/newInvite.js"
import { removeMember } from "../controllers/removeMember.js"
import { deleteBuilding } from '../controllers/deleteBuilding.js'
import { validateUserUUID } from "../middlewares/validateUserUUID.js"
import { checkKeys } from "../middlewares/checkKeys.js"
import { ROUTES } from "../../utils/constants.js"


const buildingRoutes = app =>{

    app.post(ROUTES.building_create, checkKeys, validateUserUUID, newBuilding)
    app.post(ROUTES.building_invite, checkKeys, validateUserUUID, newInvite)
    app.post(ROUTES.building_add_task, checkKeys, validateUserUUID, newTask)
    app.post(ROUTES.building_update_task, checkKeys, validateUserUUID, updateTask)

    app.post(ROUTES.building_remove_member, checkKeys, validateUserUUID, removeMember)
    app.post(ROUTES.building_delete, checkKeys, validateUserUUID, deleteBuilding)


}

export default buildingRoutes
