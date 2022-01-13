import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

import { TASK_STATUS_TYPES, ALLOWED_ROLES } from '../../utils/constants.js'

const Schema = mongoose.Schema

const USER_SCHEMA = new Schema({
    _id: { type: String, default: () => uuidv4()},
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    buildings: [{ type: String, default: undefined }],
    tasks: [{ type: String, default: undefined }],
    completed_tasks: [{ type: String, default: undefined }],
    role: { type: String, enum: ALLOWED_ROLES, default: 'worker' },
    created: { type: Date, default: Date.now() },
})


const TASK_SCHEMA = new Schema({
    _id: { type: String, default: () => uuidv4()},
    building_id: String,
    priority: String,
    status: { type: String, default: TASK_STATUS_TYPES.idle },
    created: { type: Date, default: Date.now() },
})

const BUILDING_SCHEMA = new Schema({
    _id: { type: String, default: () => uuidv4() },
    user_id: String,
    building_name: String,
    tasks: [{ type: String, default: undefined }],
    members: [{ type: String, default: undefined }],
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