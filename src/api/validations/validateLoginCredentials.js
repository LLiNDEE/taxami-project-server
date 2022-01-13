import bcrypt from 'bcrypt'

import { getUserBy } from "../models/getUserBy.js"

export const validateLoginCredentials = async data => {
    try{

        const { email, password } = data

        const userResponse = await getUserBy('email', email)
        if(!userResponse.success || userResponse.type === 'noUser'){
            return {
                type: 'invalidCredentials',
                success: false,
            }
        }

        const user = userResponse.user[0]

        const isPasswordCorrect = await comparePassword(password, user.password)
        if(!isPasswordCorrect){
            console.log("invalid password...")
            return {
                type: 'invalidCredentials',
                success: false,
            }
        }

        return {
            type: 'success',
            success: true,
            data: {
                user_id: user._id,
                email: user.email,
                buildings: user.buildings,
                tasks: user.tasks,
                completed_tasks: user.completed_tasks
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