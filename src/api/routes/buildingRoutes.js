import { validateUserUUID } from "../middlewares/validateUserUUID.js"
import { newBuilding } from "../controllers/newBuilding.js"
import { newInvite } from "../controllers/newInvite.js"
import { checkKeys } from "../middlewares/checkKeys.js"
import { ROUTES } from "../../utils/constants.js"


const buildingRoutes = app =>{

    app.post(ROUTES.building_create, checkKeys, validateUserUUID, newBuilding)
    app.post(ROUTES.building_invite, checkKeys, validateUserUUID, newInvite)

}

export default buildingRoutes
