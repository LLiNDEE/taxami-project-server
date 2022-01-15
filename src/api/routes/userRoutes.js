import { userJoinBuilding } from "../controllers/userJoinBuilding.js"
import { newUser } from "../controllers/newUser.js"
import { userLogin } from "../controllers/userLogin.js"
import { checkCodeController } from "../controllers/checkCodeController.js"
import { adminGenerateCode } from "../controllers/adminGenerateCode.js"
import { getAllCustomersController } from "../controllers/getAllCustomersController.js"
import { validateUserUUID } from "../middlewares/validateUserUUID.js"
import { checkKeys } from "../middlewares/checkKeys.js"
import { checkAdmin } from "../middlewares/checkAdmin.js"
import { ROUTES } from "../../utils/constants.js"



const userRoutes = app =>{

    app.get("/users/get/all", (req, res) => {
        res.send("/ route")
    })

    app.post(ROUTES.user_create, checkKeys, newUser)
    app.post(ROUTES.user_login, checkKeys, userLogin)
    app.post(ROUTES.user_building_invite, checkKeys, validateUserUUID, userJoinBuilding)
    app.post(ROUTES.check_code, checkKeys, checkCodeController)

    app.post([ROUTES.admin_generate_code], checkKeys, checkAdmin, adminGenerateCode)
    app.post([ROUTES.admin_get_customers], checkKeys, checkAdmin, getAllCustomersController)

}

export default userRoutes
