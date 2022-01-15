import { User } from "../models/models.js";

export const addBuildingToUser = async (user_id, building_id) => {
    try{

        const query = {_id: user_id}
        await User.findOneAndUpdate(query, { $push: { buildings: building_id }})

        return {
            type: 'success',
            success: true
        }

    }catch(error){
        console.log(error)
        return {
            type: 'failedToAddBuilding',
            success: false,
        }
    }
}