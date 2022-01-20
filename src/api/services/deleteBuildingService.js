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

        const tasks = building.tasks

        console.log(tasks)

        const taskQuery = {building_id: building_id}
        // await  Task.deleteMany(taskQuery)

        const userQuery = {tasks: {$in: tasks}}
        // await User.updateMany(userQuery, {$pull: {tasks: tasks }})

        // await Building.deleteOne(buildingQuery)

        // await User.findOneAndUpdate({_id: user_id}, {$pull: {buildings: building_id}})


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