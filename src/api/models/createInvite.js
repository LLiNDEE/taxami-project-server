import { Code, Building } from "./models.js";

export const createInvite = async (user_id, building_id) => {
    try{
        
        const building = await Building.find({_id: building_id})

        if(!building || building.length < 1){
            return {
                type: 'noBuilding',
                success: false
            }
        }

        if(building[0].user_id !== user_id){
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