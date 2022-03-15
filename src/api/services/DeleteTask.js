import { Task, Building } from "../models/models.js";


export const DeleteTask = async data => {
    try{

        const foundTask = await Task.findOne({_id: data})

        const buildingQuery = {_id: foundTask.building_id}

        if(!foundTask){
            return {
                type: 'noTask',
                success: false,
            }
        }

        await Task.findOneAndDelete({_id: data})
        await Building.findOneAndUpdate(buildingQuery, {$pull: {tasks: data}})

        return {
            type: 'success',
            success: true,
        }


    }catch(error){
        return {
            type: 'error',
            success: false,
        }
    }
}