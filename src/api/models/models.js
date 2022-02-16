import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

import { TASK_STATUS_TYPES, ALLOWED_ROLES, TASK_PRIORITY_TYPES, BUILDING_STATUS_TYPES, USER_STATUS_TYPES } from '../../utils/constants.js'

const Schema = mongoose.Schema

const USER_SCHEMA = new Schema({
    _id: { type: String, default: () => uuidv4()},
    username: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, select: false, required: true },
    buildings: [{ type: String, default: undefined }],
    tasks: [{ type: String, default: undefined }],
    completed_tasks: [{ type: String, default: undefined }],
    role: { type: String, enum: ALLOWED_ROLES, default: 'worker' },
    status: { type: String, enum: USER_STATUS_TYPES, default: USER_STATUS_TYPES.active },
    created: { type: Date, default: Date.now() },
    code_used: { type: String, required: true }, 
})

const TASK_DETAILS_SCHEMA = {
    estimated_time: { type: String },
    estimated_cost: { type: String }, 
    optional_comment: { type: String }
}

const TASK_SCHEMA = new Schema({
    _id: { type: String, default: () => uuidv4()},
    user_id: { type: String, required: true },
    building_id: String,
    title: String,
    description: String,
    assigned_to: String,
    details: TASK_DETAILS_SCHEMA,
    priority: { type: String, enum: TASK_PRIORITY_TYPES, default: TASK_PRIORITY_TYPES.low},
    status: { type: String, default: TASK_STATUS_TYPES.idle },
    created: { type: Date, default: Date.now() },
})

const BUILDING_SCHEMA = new Schema({
    _id: { type: String, default: () => uuidv4() },
    user_id: String,
    building_name: String,
    tasks: [{ type: String, default: undefined }],
    members: [{ type: String, default: undefined }],
    status: { type: String, enum: BUILDING_STATUS_TYPES, default: BUILDING_STATUS_TYPES.active },
    created: { type: Date, default: Date.now() },
})

const CODES_SCHEMA = new Schema({
    _id: { type: String, default: () => uuidv4() },
    type: { type: String, enum: ['invite', 'subscription'], default: 'invite' },
    building_id: String,
    role: { type: String, enum: ALLOWED_ROLES, default: 'worker'},
    created: { type: Date, default: Date.now() },
})

export const User = mongoose.model('users', USER_SCHEMA)
export const Building = mongoose.model('buildings', BUILDING_SCHEMA)
export const Code = mongoose.model('codes', CODES_SCHEMA)
export const Task = mongoose.model('tasks', TASK_SCHEMA)

export const Admin = mongoose.model('taxami-admin-users', USER_SCHEMA)