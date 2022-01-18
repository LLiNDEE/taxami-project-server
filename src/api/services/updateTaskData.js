import { Task } from '../models/models.js'
import { getUserBy } from './getUserBy.js'




export const updateTaskData = async (user_id, task_id, values) => {
    try{

        const userOBJ = await getUserBy('_id', user_id)
        if(!userOBJ.success || userOBJ.type === 'noUser'){
            return {
                type: 'failed',
                success: false
            }
        }

        // const userTasks = userOBJ.user[0].tasks
        // if(!userTasks.includes(task_id)) {
        //     return {
        //         type: 'noPermission',
        //         success: false
        //     }
        // }

        const taskQuery = {_id: task_id}

        const task = await Task.findOne(taskQuery)
        if(task.user_id !== user_id){
            return {
                type: 'noPermission',
                success: false,
            }
        }

        await Task.findOneAndUpdate(taskQuery, {$set: values})

        return {
            type: 'success',
            success: true
        }

    }catch(error){
        return {
            type: 'error',
            success: false,
        }
    }
}