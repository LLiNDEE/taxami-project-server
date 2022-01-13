import { Code } from "./models.js"



export const adminCreateCode = async (user_id, type, building_id) => {
    try{

        if(building_id && type !== 'subscription'){
            const code = new Code({
                user_id: user_id,
                building_id: building_id,
            })
            await code.save()
            return{
                type: 'success',
                success: true,
                code: code._id,
            }
        }

        if(type === 'subscription'){
            const code = new Code({
                user_id: user_id,
                type: 'subscription',
                role: 'customer'
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