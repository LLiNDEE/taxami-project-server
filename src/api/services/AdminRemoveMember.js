import { Building, User, Task } from "../models/models.js";


export const AdminRemoveMember = async data => {
    try{

        const { member_id } = data

        const memberQuery = {_id: member_id}
        const member = await User.findOne(memberQuery)
        if(!member){
            return {
                type: 'failedToRemoveMember',
                success: false
            }
        }


        const buildingsID = member.buildings
        if(buildingsID){

            const tasksID = []

            const buildings = await Building.find({_id: {$in: buildingsID}})
            buildings.forEach(b => {
                if(b.tasks.length > 0){
                    b.tasks.forEach(t => {
                        tasksID.push(t)
                    })
                }
            })
            if(tasksID.length > 0){
                await Task.deleteMany({_id: {$in: tasksID}})
                await User.updateMany({tasks: {$in: tasksID}}, {$pull: {tasks: {$in: tasksID}}})
            }
            await Building.deleteMany({_id: {$in: buildingsID}})
        }

        await User.findOneAndDelete({_id: member_id})

        return {
            type: 'success',
            success: true
        }


    }catch(error){
        return {
            type: 'error',
            success: false
        }
    }
}