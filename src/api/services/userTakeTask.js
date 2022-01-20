import { Building, User, Task } from "../models/models.js"



export const userTakeTask = async data => {
    try{

        const { user_id, building_id, task_id } = data
        const userQuery = {_id: user_id}

        const building = await Building.find({_id: building_id})
        if(!building) {
            return {
                type: 'noBuilding',
                success: false
            }
        }

        const members = building[0].members
        if(!members.includes(user_id)) {
            return {
                type: 'notAMember',
                success: false,
            }
        }

        const user = await User.findOne(userQuery)

        if(user.tasks.includes(task_id)){
            return {
                type: 'taskAlreadyAssigned',
                success: false
            }
        }
    
        const taskQuery = {_id: task_id}

        const task = await Task.findOne(taskQuery)
        if(task.status === 'completed') {
            return {
                type: 'taskAlreadyCompleted',
                success: false,
            }
        }

        if(task.status === 'inProgress'){
            return {
                type: 'taskAlreadyInProgress',
                success: false
            }
        }

        await Task.findOneAndUpdate(taskQuery, {$set: {details: {
                estimated_time: data.estimated_time,
                estimated_cost: data.estimated_cost,
                optional_comment: data?.optional_comment ?? ""
            },
            status: 'inProgress',
        }})

        
        await User.findOneAndUpdate(userQuery, {$push: {tasks: task_id}})

        return {
            type: 'success',
            success: true
        }
    


    }catch(error){
        console.log(error)
        return {
            type: 'failed',
            success: false,
        }
    }
}