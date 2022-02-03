import { User, Building } from '../models/models.js'



export const buildingGetMembers = async data => {
    try{

        const { user_id, building_id } = data

        const buildingQuery = {_id: building_id}
        const building = await Building.findOne(buildingQuery)
        if(user_id !== building.user_id){
            return {
                type: 'noPermission',
                success: false
            }
        }

        const membersID = building.members

        const memberQuery = {_id: {$in: membersID}}
        const members = await User.find(memberQuery)

        return {
            type: 'success',
            success: true,
            members: members,
        }


    }catch(error){
        console.log(error)
        return {
            type: 'error',
            success: false
        }
    }
}