import { userJoinBuilding } from "../controllers/userJoinBuilding.js"
import { newUser } from "../controllers/newUser.js"
import { userLogin } from "../controllers/userLogin.js"
import { checkCodeController } from "../controllers/checkCodeController.js"
import { adminGenerateCode } from "../controllers/adminGenerateCode.js"
import { getUserBuildings } from "../controllers/getUserBuildings.js"
import { userLeaveTask } from "../controllers/userLeaveTask.js"
import { userTakeTaskController as userTakeTask } from '../controllers/userTakeTaskController.js'
import { userCompleteTaskController as userCompleteTask } from "../controllers/userCompleteTaskController.js"
import { getAllCustomersController as getAllCustomers } from "../controllers/getAllCustomersController.js"
import { validateUserUUID } from "../middlewares/validateUserUUID.js"
import { checkKeys } from "../middlewares/checkKeys.js"
import { checkAdmin } from "../middlewares/checkAdmin.js"
import { ROUTES } from "../../utils/constants.js"
import { userGetTasks } from "../controllers/userGetTasks.js"



const userRoutes = app =>{

    app.get("/users/get/all", (req, res) => {
        res.send("/ route")
    })

    app.post(ROUTES.user_create, checkKeys, newUser)
    app.post(ROUTES.user_login, checkKeys, userLogin)
    app.post(ROUTES.user_building_invite, checkKeys, validateUserUUID, userJoinBuilding)
    app.post(ROUTES.check_code, checkKeys, checkCodeController)
    
    app.post(ROUTES.user_get_buildings, checkKeys, validateUserUUID, getUserBuildings)

    app.post([ROUTES.user_take_task], checkKeys, validateUserUUID, userTakeTask)
    app.post([ROUTES.user_complete_task], checkKeys, validateUserUUID, userCompleteTask)
    app.post([ROUTES.user_leave_task], checkKeys, validateUserUUID, userLeaveTask)
    app.post(ROUTES.user_get_tasks, checkKeys, validateUserUUID, userGetTasks)

    app.post([ROUTES.admin_generate_code], checkKeys, checkAdmin, adminGenerateCode)
    app.post([ROUTES.admin_get_customers], checkKeys, checkAdmin, getAllCustomers)

}

export default userRoutes
