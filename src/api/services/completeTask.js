import { Task } from "../models/models.js"
import { getUserBy } from "./getUserBy.js"



export const completeTask = async data => {
    try{

        const { task_id, user_id } = data

        const userOBJ = await getUserBy('_id', user_id)
        if(!userOBJ.success || userOBJ.type === 'noUser'){
            return {
                type: 'failed',
                success: false
            }
        }

        const userTasks = userOBJ.user[0].tasks
        if(!userTasks.includes(task_id)) {
            return {
                type: 'noPermission',
                success: false
            }
        }

        const taskQuery = {_id: task_id}
        await Task.findOneAndUpdate(taskQuery, {$set: {status: 'completed'}})

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