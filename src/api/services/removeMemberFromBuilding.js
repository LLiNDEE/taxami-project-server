import { Building, User } from "../models/models.js"

import { removeTaskFromUser } from "./removeTaskFromUser.js"


export const removeMemberFromBuilding = async data => {
    try{

        const {user_id, member_id, building_id} = data

        const buildingQuery = {_id: building_id}
        const building = await Building.findOne(buildingQuery)

        if(building.user_id !== user_id){
            return {
                type: 'noPermission',
                success: false,
            }
        }

        if(!building.members.includes(member_id)){
            return {
                type: 'notAMember',
                success: false
            }
        }

        const userQuery = {_id: member_id}
        const user = await User.findOne(userQuery)

        const taskMatches = user.tasks.filter(t => building.tasks.includes(t))

        const userInformation = {
            user_id: member_id,
            values: taskMatches
        }

        const removeTaskFromUserResponse = await removeTaskFromUser(userInformation, true)
        if(!removeTaskFromUserResponse.success){
            return {
                type: 'failed',
                success: false
            }
        }

        await Building.findOneAndUpdate(buildingQuery, {$pull: {members: member_id}})

        return {
            type: 'success',
            success: true
        }

    }catch(error){
        console.log(error)
        return {
            type: 'failed',
            success: false
        }
    }
}