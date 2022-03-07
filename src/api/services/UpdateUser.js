import { User } from "../models/models.js";



export const UpdateUser = async (user_id, values) => {
    try{

        const userQuery = {_id: user_id}

        await User.findOneAndUpdate(userQuery, {$set: values})

        return {
            type: 'success',
            success: true
        }

    }catch(error){
        return {
            type: 'failed',
            success: false
        }
    }
}