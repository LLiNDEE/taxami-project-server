import { User, Building, Task } from '../models/models.js'



export const removeTaskService = async data => {
    try{

        const { user_id, task_id, building_id } = data

        const taskQuery = {_id: task_id}
        const task = await Task.findOne(taskQuery)
        if(task.user_id !== user_id){
            return {
                type: 'noPermission',
                success: false
            }
        }

        const buildingQuery = {_id: building_id}
        await Building.findOneAndUpdate(buildingQuery, {$pull: {tasks: task_id}})

        const userQuery = {tasks: task_id}
        const user = await User.findOne(userQuery)
        if(!user){
            return {
                type: 'error',
                success: false
            }
        }

        const userIDFromDB = user._id
        await User.findOneAndUpdate({_id: userIDFromDB}, {$pull: {tasks: task_id}})

        await Task.findOneAndRemove(taskQuery)

        return {
            type: 'success',
            success: true
        }


    }catch(error){
        console.log(error)
        return {
            type: 'success',
            success: false
        }
    }
}