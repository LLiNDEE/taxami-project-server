import { Task, Building } from '../models/models.js'



export const addNewTask = async data => {
    try{

        const { title, description, priority, user_id, building_id } = data

        const task = new Task({
            user_id: user_id,
            building_id: building_id,
            title: title,
            description: description,
            priority: priority,
        })

        await task.save()

        const buildingQuery = {_id: building_id}
        await Building.findOneAndUpdate(buildingQuery, {$push: {tasks: task._id}})

        return {
            type: 'success',
            success: true,
        }

    }catch(error){
        console.log(error)
        return{
            type: 'failed',
            success: false,
        }
    }
}