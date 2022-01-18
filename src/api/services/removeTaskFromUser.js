import { Task, User } from '../models/models.js'



export const removeTaskFromUser = async data => {
    try{

        const { user_id, task_id } = data

        const userQuery = {_id: user_id}
        await User.findOneAndUpdate(userQuery, { $pull: { tasks: task_id } })

        const taskQuery = {_id: task_id}
        await Task.findOneAndUpdate(taskQuery, { $set: { details: { estimated_time: "", estimated_cost: "" }, status: 'idle' } })

        return {
            type: 'success',
            success: true
        }

    }catch(error){
        console.log(error)
        return {
            type: 'failedToRemoveTask',
            success: false
        }
    }
}