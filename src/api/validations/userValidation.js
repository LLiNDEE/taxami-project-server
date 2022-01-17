import bcrypt from 'bcrypt'

import { getUserBy } from '../services/getUserBy.js'
import { RegExpEmail } from '../../utils/constants.js'

export const validateUserCredentials = async data => {
    try{

        if(! await isUsernameValid(data.username) || ! await isEmailValid(data.email)) {
            return {
                type: 'invalidCredentials',
                success: false
            }
        }

        const hashedPassword = await hashPassword(data.password)
        if(!hashedPassword.success || hashedPassword.type === 'failed'){
            return {
                type: 'invalidCredentials',
                success: false,
            }
        }

        data.password = hashedPassword?.password

        return {
            type: 'success',
            success: true,
            data: data
        }

    }catch(error){
        console.log(error)
        return {
            type: 'failed',
            success: false,
        }
    }
}

const isUsernameValid = async username => {
    try{
        const usernameOBJ = await getUserBy('username', username, "")
        if(usernameOBJ.success || usernameOBJ.type === 'userExist') return false
        return true
    }catch(error){
        return false
    }
}

export const isEmailValid = async email => {
    try{
        if(!email) return false
        if((!email.includes("@") || !email.includes(".") || email.length < 3)) return false
        if(!email.match(RegExpEmail)) return false

        const emailOBJ = await getUserBy('email', email)
        if(emailOBJ.success || emailOBJ.type === 'userExist') return false
        
        return true

    }catch(error){
        return false
    }
}

const hashPassword = async password => {
    try{
        const hashedPassword = new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                if(err) return reject({type: 'failed', success: false})
                if(hash) return resolve(hash)
            })
        })
        return {
            type: 'success',
            success: true,
            password: await hashedPassword
        }
    }catch(error){
        return {
            type: 'failed',
            success: false,
        }
    }
}