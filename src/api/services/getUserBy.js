import { User } from '../models/models.js'

export const getUserBy = async (key = 'username', data) => {
    try{

        const userResponse = await User.find({ [key]: data})
        if(!userResponse || userResponse.length < 1){
            return {
                type: 'noUser',
                success: true,
            }
        }

        return {
            type: 'userExist',
            user: userResponse,
            success: true,
        }



    }catch(error){
        console.log(error)
        return {
            type: 'error',
            success: false
        }
    }
}