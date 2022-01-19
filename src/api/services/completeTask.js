import { Task, User } from "../models/models.js"
import { getUserBy } from "./getUserBy.js"



export const completeTask = async data => {
    try{

        const { task_id, user_id } = data

        const taskQuery = {_id: task_id}

        const userOBJ = await getUserBy('_id', user_id)
        if(!userOBJ.success || userOBJ.type === 'noUser'){
            return {
                type: 'failed',
                success: false
            }
        }

        const task = await Task.findOne(taskQuery)

        const userTasks = userOBJ.user[0].tasks
        if(!userTasks.includes(task_id) || user_id !== task.user_id) {
            return {
                type: 'noPermission',
                success: false
            }
        }

        if(task.status === 'completed'){
            return {
                type: 'taskAlreadyCompleted',
                success: false
            }
        }

        await Task.findOneAndUpdate(taskQuery, {$set: {status: 'completed'}})

        if(user_id === task.user_id){
            return {
                type: 'success',
                success: true,
            }
        }

        const userQuery = {_id: user_id}
        await User.findOneAndUpdate(userQuery, {$pull: {tasks: task_id}})
        await User.findOneAndUpdate(userQuery, {$push: {completed_tasks: task_id}})

        return {
            type: 'success',
            success: true
        }

    }catch(error){
        return{
            type: 'success',
            success: false
        }
    }
}