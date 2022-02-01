import { v4 as uuidv4 } from 'uuid'

import { Code } from '../models/models.js'



export const adminCreateCode = async ({user_id, type, building_id, prefix}) => {
    try{

        if(building_id && type === 'invite'){
            const code = new Code({
                user_id: user_id,
                building_id: building_id,
                _id: prefix ? `${prefix}--${uuidv4()}` : uuidv4()  
            })

            await code.save()
            return{
                type: 'success',
                success: true,
                code: code._id,
            }
        }

        if(type === 'subscription'){

            console.log("prefix", prefix)

            const code = new Code({
                user_id: user_id,
                type: 'subscription',
                role: 'customer',
                _id: prefix ? `${prefix}--${uuidv4()}` : uuidv4() 
            })
    
            await code.save()
    
            return {
                type: 'success',
                success: true,
                code: code._id,
            }
        }

    }catch(error){
        console.log(error)
        return {
            type: 'failed',
            success: false
        }
    }
}