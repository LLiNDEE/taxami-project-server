import { Task } from "../models/models.js";


export const DeleteTask = async data => {
    try{

        const foundTask = await Task.findOne({_id: data})
        if(!foundTask){
            return {
                type: 'noTask',
                success: false,
            }
        }

        await Task.findOneAndDelete({_id: data})

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