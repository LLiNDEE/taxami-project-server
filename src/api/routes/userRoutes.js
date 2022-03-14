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
import { adminGetStats } from "../controllers/adminGetStats.js"
import { userGetRole } from "../controllers/userGetRole.js"
import { userUpdate } from '../controllers/userUpdate.js'
import { validateUserUUID } from "../middlewares/validateUserUUID.js"
import { checkKeys } from "../middlewares/checkKeys.js"
import { checkAdmin } from "../middlewares/checkAdmin.js"
import { ROUTES } from "../../utils/constants.js"
import { userGetTasks } from "../controllers/userGetTasks.js"
import { AdminLockAccount } from "../controllers/AdminLockAccount.js"
import { AdminUnlockAccount } from "../controllers/AdminUnlockAccount.js"
import { validateToken } from '../middlewares/validateToken.js'
import { AdminRemoveMember } from "../controllers/AdminRemoveMember.js"


const userRoutes = app =>{

    app.get("/users/get/all", (req, res) => {
        res.send("/ route")
    })

    app.post(ROUTES.user_create, newUser)
    app.post(ROUTES.user_login, userLogin)
    app.post(ROUTES.user_building_invite, validateUserUUID, validateToken, userJoinBuilding)
    app.post(ROUTES.check_code, checkCodeController)
    
    app.post(ROUTES.user_get_buildings, validateToken, validateUserUUID, getUserBuildings)

    app.post([ROUTES.user_take_task], validateToken, validateUserUUID, userTakeTask)
    app.post([ROUTES.user_complete_task], validateToken, validateUserUUID, userCompleteTask)
    app.post([ROUTES.user_leave_task], validateToken, validateUserUUID, userLeaveTask)
    app.post(ROUTES.user_get_tasks, validateToken, validateUserUUID, userGetTasks)

    app.post('/user/update', validateToken, validateUserUUID, userUpdate)

    app.post('/user/get/role', userGetRole)

    app.post([ROUTES.admin_generate_code],validateToken, checkAdmin, adminGenerateCode)
    app.post([ROUTES.admin_get_customers],validateToken, checkAdmin, getAllCustomers)
    app.post('/admin/get/stats', validateToken, checkAdmin, adminGetStats)

    app.post('/admin/lock/account', validateToken, checkAdmin, AdminLockAccount)
    app.post('/admin/unlock/account', validateToken, checkAdmin, AdminUnlockAccount)

    app.post('/admin/remove/customer', checkAdmin, AdminRemoveMember)

}

export default userRoutes
