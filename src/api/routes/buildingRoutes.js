import { newBuilding } from "../controllers/newBuilding.js"
import { newTask } from "../controllers/newTask.js"
import { updateTask } from "../controllers/updateTask.js"
import { newInvite } from "../controllers/newInvite.js"
import { removeMember } from "../controllers/removeMember.js"
import { deleteBuilding } from '../controllers/deleteBuilding.js'
import { validateUserUUID } from "../middlewares/validateUserUUID.js"
import { checkKeys } from "../middlewares/checkKeys.js"
import { deleteTask } from '../controllers/deleteTask.js'
import { validateToken } from '../middlewares/validateToken.js'
import { ROUTES } from "../../utils/constants.js"
import { removeTask } from "../controllers/removeTask.js"
import { buildingGetTasks } from "../controllers/buildingGetTasks.js"
import { getMembers } from "../controllers/getMembers.js"
import { BuildingRemovePermission } from '../controllers/BuildingRemovePermission.js'
import { BuildingAddPermissions } from "../controllers/BuildingAddPermissions.js"
import { BuildingGetPermissions } from "../controllers/BuildingGetPermissions.js"

const buildingRoutes = app =>{

    app.post(ROUTES.building_create, validateToken, validateUserUUID, newBuilding)
    app.post(ROUTES.building_invite, validateToken, validateUserUUID, newInvite)

    app.post(ROUTES.building_add_task, validateToken, validateUserUUID, newTask)
    app.post('/building/remove/task', validateToken, deleteTask)
    app.post(ROUTES.building_update_task, validateToken, validateUserUUID, updateTask)
    
    app.post(ROUTES.building_get_tasks, validateToken, validateUserUUID, buildingGetTasks)
    app.post(ROUTES.building_get_members, validateToken, validateUserUUID, getMembers)

    app.post(ROUTES.building_remove_member, validateToken, validateUserUUID, removeMember)
    app.post(ROUTES.building_delete, validateToken, validateUserUUID, deleteBuilding)
    app.post(ROUTES.building_remove_task, validateToken, validateUserUUID, removeTask)

    app.post('/building/add/permissions', BuildingAddPermissions)
    app.post('/building/remove/permissions', BuildingRemovePermission)

    app.post('/building/get/permissions', validateToken, validateUserUUID, BuildingGetPermissions)

}

export default buildingRoutes
