import { Task, User } from '../models/models.js'
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

        const taskQuery = {_id: task_id}

        const task = await Task.findOne(taskQuery)
        if(task.user_id !== user_id){
            return {
                type: 'noPermission',
                success: false,
            }
        }

        if(values?.status === 'inProgress'){
            const assignedUser = await User.findOne({completed_tasks: task_id})

            if(!assignedUser) {
                return {
                    type: 'failed',
                    success: false,
                }
            }

            const assignedUser_id = assignedUser._id;

            await User.findOneAndUpdate({_id: assignedUser_id}, {$pull: {completed_tasks: task_id}})
            await User.findOneAndUpdate({_id: assignedUser_id}, {$push: {tasks: task_id}})

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