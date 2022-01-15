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
    done: 'done',
    canceled: 'canceled',
    private: 'private',
    public: 'public',
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
    failedToCreateInvite: 'failedToCreateInvite',
    failedToGenerateCode: 'failedToGenerateCode',
    noBuilding: 'noBuilding',
    noPermission: 'noPermission',
    noCode: 'noCode',
    noUser: 'noUser',
    alreadyMember: 'alreadyMember',
    codeError: 'codeError',
    error: 'error',
}

export const ROUTES = {
    admin_generate_code: '/admin/generate/code', 
    user_create: '/user/create',
    user_login: '/user/login',
    user_building_invite: '/user/join',
    check_code: '/user/check/code',
    building_create: '/building/create',
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

export const PATH_KEYS = {
    [ROUTES.user_login]: LOGIN_KEYS,
    [ROUTES.user_create]: USER_CREATE_KEYS,
    [ROUTES.building_create]: CREATE_BUILDING_KEYS,
    [ROUTES.building_invite]: CREATE_INVITE_KEYS,
    [ROUTES.user_building_invite]: USER_JOIN_INVITE,
    [ROUTES.check_code]: CHECK_CODE_KEYS,
    [ROUTES.admin_generate_code]: ADMIN_GENERATE_CODE_KEYS,
}