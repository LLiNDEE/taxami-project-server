import { Code, Building } from '../models/models.js'
import { checkPermission } from '../validations/CheckPermission.js'

export const createInvite = async (user_id, building_id) => {
    try{
        
        const building = await Building.findOne({_id: building_id})

        if(!building){
            return {
                type: 'noBuilding',
                success: false
            }
        }

        const permissions = building?.permissions

        const doesUserHavePermission = checkPermission(user_id, 'generateInvite', permissions)

        if(building.user_id !== user_id && !doesUserHavePermission){
            return {
                type: 'noPermission',
                success: false
            }
        }

        const code = new Code({
            building_id: building_id
        })

        await code.save()

        return {
            type: 'success',
            success: true,
            code: code._id
        }

    }catch(error){
        console.log(error)
        return {
            type: 'failedToCreateInvite',
            success: false
        }
    }
}