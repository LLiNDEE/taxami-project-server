import { Building, Task } from '../models/models.js'



export const buildingGetTasks = async data => {
    try{

        const { user_id, building_id } = data

        const buildingQuery = {_id: building_id}
        const building = await Building.findOne(buildingQuery)
        if(!building){
            return {
                type: 'noBuilding',
                success: false
            }
        }

        if(!building.members.includes(user_id) && building.user_id !== user_id){
            return {
                type: 'noPermission',
                success: false
            }
        }

        const taskQuery = {building_id: building_id}
        const tasks = await Task.find(taskQuery)

        return {
            type: 'success',
            success: true,
            tasks: tasks,
        }

    }catch(error){
        return {
            type: 'error',
            success: false
        }
    }
}