import { Task } from '../models/models.js'
import { getUserBy } from './getUserBy.js'



export const getUserTasks = async user_id => {
    try{

        const userResponse = await getUserBy('_id', user_id)
        if(!userResponse.success) {
            return {
                type: 'noUser',
                success: false
            }
        }

        const user = userResponse.user[0]
    
        const inprogress_tasks = user.tasks
        const completed_tasks = user.completed_tasks

        const tasks_id = inprogress_tasks.concat(completed_tasks)

        const taskQuery = {_id: {$in: tasks_id}}
        const tasks = await Task.find(taskQuery)

        return {
            type: 'success',
            success: true,
            tasks: tasks
        }

    }catch(error){
        console.log(error)
        return {
            type: 'error',
            success: false
        }
    }
}