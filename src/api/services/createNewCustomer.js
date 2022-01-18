import { User } from '../models/models.js'
import { applyCode } from './applyCode.js'
import { checkCode } from './checkCode.js'


export const createNewCustomer = async ( data ) => {
    try{

        const checkCodeResponse = await checkCode(data.code)
        if(!checkCodeResponse.success){
            return{
                type: 'codeError',
                success: false,
            }
        }

        const { code_type: type } = checkCodeResponse.data

        if(type === 'subscription'){
            const user = new User({
                username: data.username,
                email: data.email,
                password: data.password,
                first_name: data.first_name,
                last_name: data.last_name,
                role: 'customer',
            })
    
            await user.save()

            return {
                type: 'success',
                success: true
            }
        }

        if(type === 'invite'){

            const user = new User({
                username: data.username,
                email: data.email,
                first_name: data.first_name,
                last_name: data.last_name,
                password: data.password
            })

            await user.save()

            const user_id = user._id

            const { code: invite_code } = data

            const applyCodeResponse = await applyCode(invite_code, user_id)
            if(!applyCodeResponse.success) return res.status(400).send(generateError(applyCodeResponse.type))

            return {
                type: 'success',
                success: true,
            }

        }



    }catch(error){
        console.log(error)
        return {
            type: 'failedToCreate',
            success: false,
        }
    }
}