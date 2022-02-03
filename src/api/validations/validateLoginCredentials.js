import bcrypt from 'bcrypt'

import { getUserBy } from "../services/getUserBy.js"
import { getUserBuildings } from '../services/getUserBuildings.js'

export const validateLoginCredentials = async data => {
    try{

        const { email, password } = data

        const userResponse = await getUserBy('email', email, 'password')
        if(!userResponse.success || userResponse.type === 'noUser'){
            return {
                type: 'invalidCredentials',
                success: false,
            }
        }

        const user = userResponse.user[0]

        const isPasswordCorrect = await comparePassword(password, user.password)
        if(!isPasswordCorrect){
            return {
                type: 'invalidCredentials',
                success: false,
            }
        }

        const userOBJ = await getUserBy('email', email)
        const userData = userOBJ.user[0]

        const userMemberOfBuildings = await getUserBuildings(user._id)
        if(!userMemberOfBuildings.success && userData.role !== 'customer') {
            return {
                type: 'failed',
                success: false
            }
        }

        return {
            type: 'success',
            success: true,
            data: {
                user_id: user._id,
                email: userData.email,
                buildings: userData.buildings,
                tasks: userData.tasks,
                completed_tasks: userData.completed_tasks,
                memberOf: userMemberOfBuildings?.buildings
            }
        }

    }catch(error){
        console.log(error)
    }
}

const comparePassword = async (password, hashedPassword) => {
    try{

        const doesPasswordMatch = new Promise((resolve, reject) => {
            bcrypt.compare(password, hashedPassword, (err, result) => {
                if(err) reject(err)
                if(result) return resolve(result)
                if(!result) return resolve(result)
            })
        })

        return doesPasswordMatch

    }catch(error){
        console.log(error)
    }
}