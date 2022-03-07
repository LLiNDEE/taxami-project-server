export default function RouteSchemas (Validator){

    const Schema = Validator.Schema
    const Connect = Validator.Route.Connect

    const Response = Validator.Response

    const LoginSchema = new Schema.Create({
        email: Schema.isString().min(3).exec(),
        password: Schema.isString().min(6).exec()
    })

    Connect('/user/login', LoginSchema)

    const UserCreateSchema = new Schema.Create({
        email: Schema.isString().exec(),
        username: Schema.isString().exec(),
        password: Schema.isString().min(6).exec(),
        first_name: Schema.isString().exec(),
        last_name: Schema.isString().exec(),
        code: Schema.isString().min(30).exec()
    })

    Connect('/user/create', UserCreateSchema)

    const CreateInviteSchemas = new Schema.Create({
        user_id: Schema.isString().exec(),
        building_id: Schema.isString().exec(),
    })

    Connect('/building/generate/invite', CreateInviteSchemas)

    const CreateBuildingSchema = new Schema.Create({
        user_id: Schema.isString().exec(),
        building_name: Schema.isString().exec(),
    })

    Connect('/building/create', CreateBuildingSchema)

    const DeleteBuildingSchema = new Schema.Create({
        user_id: Schema.isString().exec(),
        building_id: Schema.isString().exec(),
    })

    Connect('/building/delete', DeleteBuildingSchema)

    const AddTaskSchema = new Schema.Create({
        user_id: Schema.isString().exec(),
        building_id: Schema.isString().exec(),
        title: Schema.isString().exec(),
        description: Schema.isString().exec(),
        priority: Schema.isString().exec(),
    })

    Connect('/building/add/task', AddTaskSchema)

    const JoinInviteSchema = new Schema.Create({
        user_id: Schema.isString().exec(),
        invite_code: Schema.isString().exec(),
    })

    Connect('/user/join', JoinInviteSchema)

    const CheckCodeSchema = new Schema.Create({
        code: Schema.isString().min(30).exec(),
    })

    Connect('/user/check/code', CheckCodeSchema)

    const AdminGenerateCodeSchema = new Schema.Create({
        user_id: Schema.isString().exec(),
        type: Schema.isString().min(6).exec(),
    })

    Connect('/admin/generate/code', AdminGenerateCodeSchema)

    const AdminGetCustomersSchema = new Schema.Create({
        user_id: Schema.isString().exec(),
    })

    Connect('/admin/get/customers', AdminGetCustomersSchema)

    const UserTakeTaskSchema = new Schema.Create({
        user_id: Schema.isString().exec(),
        building_id: Schema.isString().exec(),
        task_id: Schema.isString().exec(),
        estimated_time: Schema.isString().exec(),
    })

    Connect('/user/take/task', UserTakeTaskSchema)

    const UserCompleteTask = new Schema.Create({
        user_id: Schema.isString().exec(),
        task_id: Schema.isString().exec(),
    })

    Connect('/user/complete/task', UserCompleteTask)

    const UserLeaveTask = new Schema.Create({
        user_id: Schema.isString().exec(),
        task_id: Schema.isString().exec(),
    })

    Connect('/user/leave/task', UserLeaveTask)

    const UpdateTaskSchema = new Schema.Create({
        user_id: Schema.isString().exec(),
        task_id: Schema.isString().exec(),
    })

    Connect('/building/update/task', UpdateTaskSchema)

    const RemoveMemberSchema = new Schema.Create({
        user_id: Schema.isString().exec(),
        building_id: Schema.isString().exec(),
        member_id: Schema.isString().min(30).exec(),
    })

    Connect('/building/remove/member', RemoveMemberSchema)

    const UserGetBuildingsSchema = new Schema.Create({
        user_id: Schema.isString().exec(),
    })

    Connect('/user/get/buildings', UserGetBuildingsSchema)

    const RemoveTaskSchema = new Schema.Create({
        user_id: Schema.isString().exec(),
        building_id: Schema.isString().exec(),
        task_id: Schema.isString().exec()
    })

    Connect('/building/remove/task', RemoveTaskSchema)

    const BuildingGetTasks = new Schema.Create({
        user_id: Schema.isString().exec(),
        building_id: Schema.isString().exec()
    })

    Connect('/building/get/tasks', BuildingGetTasks)

    const BuildingGetMembersSchema = new Schema.Create({
        user_id: Schema.isString().exec(),
        building_id: Schema.isString().exec(),
    })

    Connect('/building/get/members', BuildingGetMembersSchema)

    const getUserRoleSchema = new Schema.Create({
        user_id: Schema.isString().min(30).exec()
    })

    Connect('/user/get/role', getUserRoleSchema)

    const adminGetStatsSchema = new Schema.Create({
        user_id: Schema.isString().min(30).exec()
    })

    Connect('/admin/get/stats', adminGetStatsSchema)

    const adminGetCustomers = new Schema.Create({
        user_id: Schema.isString().min(30).exec()
    })

    Connect('/admin/get/customers', adminGetCustomers)

    const unlockAndLockAccount = new Schema.Create({
        user_id: Schema.isString().min(30).exec(),
        customer_id: Schema.isString().min(30).exec()
    })

    Connect('/admin/lock/account', unlockAndLockAccount)
    Connect('/admin/unlock/account', unlockAndLockAccount)

    const updateUserSchema = new Schema.Create({
        user_id: Schema.isString().exec()
    })

    Connect('/user/update', updateUserSchema)

}