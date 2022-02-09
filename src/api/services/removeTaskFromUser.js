import { Task, User } from '../models/models.js'



export const removeTaskFromUser = async (data, multiple = false) => {
    try{


        if(multiple) {
            const { user_id, values } = data
            
            const userQuery = {_id: user_id}
            const updateQuery = {_id: {$in: values}}

            const user = await User.findOne(userQuery)
            const updatedTasksArray = user.tasks.filter(t => !values.includes(t))
            
            await User.findOneAndUpdate(userQuery, {$set: {tasks: updatedTasksArray}})

            await Task.updateMany(updateQuery, { $set: { details: { estimated_time: "", estimated_cost: ""}}, status: 'idle'})

            return {
                type: 'success',
                success: true
            }
        }

        const { user_id, task_id } = data

        const task = await Task.findOne({_id: task_id})
        if(!task){
            return {
                type: 'error',
                success: false
            }
        }

        if(task.status === 'idle'){
            return {
                type: 'noPermission',
                success: false
            }
        }

        if(task.user_id === user_id){
            const assignedToUserID = task.assigned_to;

            const assignedUserQuery = {_id: assignedToUserID}
            await User.findOneAndUpdate(assignedUserQuery, { $pull: { tasks: task_id } })

        }else{
            const userQuery = {_id: user_id}
            await User.findOneAndUpdate(userQuery, { $pull: { tasks: task_id } })
        }

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