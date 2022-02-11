import { newBuilding } from "../controllers/newBuilding.js"
import { newTask } from "../controllers/newTask.js"
import { updateTask } from "../controllers/updateTask.js"
import { newInvite } from "../controllers/newInvite.js"
import { removeMember } from "../controllers/removeMember.js"
import { deleteBuilding } from '../controllers/deleteBuilding.js'
import { validateUserUUID } from "../middlewares/validateUserUUID.js"
import { checkKeys } from "../middlewares/checkKeys.js"
import { ROUTES } from "../../utils/constants.js"
import { removeTask } from "../controllers/removeTask.js"
import { buildingGetTasks } from "../controllers/buildingGetTasks.js"
import { getMembers } from "../controllers/getMembers.js"

const buildingRoutes = app =>{

    app.post(ROUTES.building_create, validateUserUUID, newBuilding)
    app.post(ROUTES.building_invite, validateUserUUID, newInvite)
    app.post(ROUTES.building_add_task, validateUserUUID, newTask)
    app.post(ROUTES.building_update_task, validateUserUUID, updateTask)

    app.post(ROUTES.building_get_tasks, validateUserUUID, buildingGetTasks)
    app.post(ROUTES.building_get_members, validateUserUUID, getMembers)

    app.post(ROUTES.building_remove_member, validateUserUUID, removeMember)
    app.post(ROUTES.building_delete, validateUserUUID, deleteBuilding)
    app.post(ROUTES.building_remove_task, validateUserUUID, removeTask)


}

export default buildingRoutes
