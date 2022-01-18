import dotenv from 'dotenv'
dotenv.config()

export const MONGOOSE_CONNECTION_KEY = process.env.MONGOOSE_CONNECTION_KEY
export const JWT_SECRET = process.env.JWT_SECRET

export const RegExpEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

export const RESPONSE_TYPES = {
    error: 'error',
    failed: 'failed',
    success: 'success'
}

export const ALLOWED_ROLES = ['customer', 'worker', 'admin']

export const TASK_STATUS_TYPES = {
    idle: 'idle',
    inProgress: 'inProgress',
    completed: 'completed',
    canceled: 'canceled',
    private: 'private',
    public: 'public',
}

export const TASK_PRIORITY_TYPES = {
    low: 'low',
    medium: 'medium',
    high: 'high',
}

export const ERROR_TYPES = {
    invalidParams: 'invalid_params',
    invalidPassword: 'invalidPASsword',
    invalidCredentials: 'invalidCredentials',
    invalidOrMissingParam: 'invalidOrMissingParam',
    missingParams: 'missing_params',
    failedToCreate: 'failedToCreate',
    failedToLogin: 'failedToLogin',
    failedToApplyInvite: 'failedToApplyInvite',
    failedToApplyCode: 'failedToApplyCode',
    failedToAddBuilding: 'failedToAddBuilding',
    failedToAddTask: 'failedToAddTask',
    failedToRemoveTask: 'failedToRemoveTask',
    failedToCreateInvite: 'failedToCreateInvite',
    failedToGenerateCode: 'failedToGenerateCode',
    noBuilding: 'noBuilding',
    noPermission: 'noPermission',
    noCode: 'noCode',
    notAMember: 'notAMember',
    noUser: 'noUser',
    noCustomers: 'noCustomers',
    taskAlreadyCompleted: 'taskAlreadyCompleted',
    taskAlreadyAssigned: 'taskAlreadyAssigned',
    taskAlreadyInProgress: 'taskAlreadyInProgress',
    alreadyMember: 'alreadyMember',
    codeError: 'codeError',
    error: 'error',
}

export const ROUTES = {
    admin_get_customers: '/admin/get/customers',
    admin_generate_code: '/admin/generate/code', 
    user_create: '/user/create',
    user_login: '/user/login',
    user_building_invite: '/user/join',
    user_take_task: '/user/take/task',
    user_complete_task: '/user/complete/task',
    user_leave_task: '/user/leave/task',
    check_code: '/user/check/code',
    building_create: '/building/create',
    building_add_task: '/building/add/task',
    building_invite: '/building/generate/invite',
}

const LOGIN_KEYS = {
    email: 'email',
    password: 'password'
}

const USER_CREATE_KEYS = {
    email: 'email',
    username: 'username',
    password: 'password',
    code: 'code',
}

const CREATE_INVITE_KEYS = {
    user_id: 'user_id',
    building_id: 'building_id'
}

const CREATE_BUILDING_KEYS = {
    user_id: 'user_id',
    building_name: 'building_name',
}

const BUILDING_ADD_TASK_KEYS = {
    user_id: 'user_id',
    building_id: 'building_id',
    title: 'title',
    description: 'description',
    priority: 'priority',
}

const USER_JOIN_INVITE = {
    user_id: 'user_id',
    invite_code: 'invite_code',
}

const CHECK_CODE_KEYS = {
    code: 'code'
}

const ADMIN_GENERATE_CODE_KEYS = {
    user_id: 'user_id',
    type: 'type',
}

const ADMIN_GET_CUSTOMERS_KEYS = {
    user_id: 'user_id',
}

const USER_TAKE_TASK_KEYS = {
    user_id: 'user_id',
    building_id: 'building_id',
    task_id: 'task_id',
    estimated_time: 'estimated_time',
    estimated_cost: 'estimated_cost',
}

const USER_COMPLETE_TASK_KEYS = {
    user_id: 'user_id',
    task_id: 'task_id'
}

const USER_LEAVE_TASK_KEYS = {
    user_id: 'user_id',
    task_id: 'task_id',
}

export const PATH_KEYS = {
    [ROUTES.user_login]: LOGIN_KEYS,
    [ROUTES.user_create]: USER_CREATE_KEYS,
    [ROUTES.building_create]: CREATE_BUILDING_KEYS,
    [ROUTES.building_invite]: CREATE_INVITE_KEYS,
    [ROUTES.building_add_task]: BUILDING_ADD_TASK_KEYS,
    [ROUTES.user_building_invite]: USER_JOIN_INVITE,
    [ROUTES.check_code]: CHECK_CODE_KEYS,
    [ROUTES.admin_generate_code]: ADMIN_GENERATE_CODE_KEYS,
    [ROUTES.admin_get_customers]: ADMIN_GET_CUSTOMERS_KEYS,
    [ROUTES.user_take_task]: USER_TAKE_TASK_KEYS,
    [ROUTES.user_complete_task]: USER_COMPLETE_TASK_KEYS,
    [ROUTES.user_leave_task]: USER_LEAVE_TASK_KEYS,
}