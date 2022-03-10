import { User, Task, Building } from '../models/models.js'
 


export const deleteBuildingService = async data => {
    try{

        const { user_id, building_id } = data

        const buildingQuery = {_id: building_id}
        const building = await Building.findOne({buildingQuery})

        if(!building){
            return {
                type: 'noBuilding',
                success: false
            }
        }

        if(building.user_id !== user_id){
            return {
                type: 'noPermission',
                success: false,
            }
        }

        const tasksID = building.tasks
        
        if(tasksID.length > 0){
            await Task.deleteMany({_id: {$in: tasksID}})
            await User.updateMany({tasks: {$in: tasksID}}, {$pull: {tasks: {$in: tasksID}}})
        }
        await Building.findOneAndDelete({_id: building_id})

        return {
            type: 'success',
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