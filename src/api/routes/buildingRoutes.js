import { newBuilding } from "../controllers/newBuilding.js"
import { newTask } from "../controllers/newTask.js"
import { updateTask } from "../controllers/updateTask.js"
import { newInvite } from "../controllers/newInvite.js"
import { removeMember } from "../controllers/removeMember.js"
import { deleteBuilding } from '../controllers/deleteBuilding.js'
import { validateUserUUID } from "../middlewares/validateUserUUID.js"
import { checkKeys } from "../middlewares/checkKeys.js"
import { validateToken } from '../middlewares/validateToken.js'
import { ROUTES } from "../../utils/constants.js"
import { removeTask } from "../controllers/removeTask.js"
import { buildingGetTasks } from "../controllers/buildingGetTasks.js"
import { getMembers } from "../controllers/getMembers.js"

const buildingRoutes = app =>{

    app.post(ROUTES.building_create, validateToken, validateUserUUID, newBuilding)
    app.post(ROUTES.building_invite, validateToken, validateUserUUID, newInvite)
    app.post(ROUTES.building_add_task, validateToken, validateUserUUID, newTask)
    app.post(ROUTES.building_update_task, validateToken, validateUserUUID, updateTask)

    app.post(ROUTES.building_get_tasks, validateToken, validateUserUUID, buildingGetTasks)
    app.post(ROUTES.building_get_members, validateToken, validateUserUUID, getMembers)

    app.post(ROUTES.building_remove_member, validateToken, validateUserUUID, removeMember)
    app.post(ROUTES.building_delete, validateToken, validateUserUUID, deleteBuilding)
    app.post(ROUTES.building_remove_task, validateToken, validateUserUUID, removeTask)

}

export default buildingRoutes
