import { User } from '../models/models.js'

export const getUserBy = async (key = 'username', data, config = "") => {
    try{

        if(config === 'password'){
            const userResponse = await User.find({ [key]: data }).select('password')
            if(!userResponse || userResponse.length < 1){
                return {
                    type: 'noUser',
                    success: false,
                }
            }

            return {
                type: 'userExist',
                user: userResponse,
                success: true,
            }

        }

        const userResponse = await User.find({ [key]: data})
        if(!userResponse || userResponse.length < 1){
            return {
                type: 'noUser',
                success: false,
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