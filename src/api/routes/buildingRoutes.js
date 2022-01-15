import { validateUserUUID } from "../middlewares/validateUserUUID.js"
import { newBuilding } from "../controllers/newBuilding.js"
import { newTask } from "../controllers/newTask.js"
import { newInvite } from "../controllers/newInvite.js"
import { checkKeys } from "../middlewares/checkKeys.js"
import { ROUTES } from "../../utils/constants.js"


const buildingRoutes = app =>{

    app.post(ROUTES.building_create, checkKeys, validateUserUUID, newBuilding)
    app.post(ROUTES.building_invite, checkKeys, validateUserUUID, newInvite)
    app.post(ROUTES.building_add_task, checkKeys, validateUserUUID, newTask)

}

export default buildingRoutes
