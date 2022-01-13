import { Building } from "./models.js";

export const createNewBuilding = async data => {
    try{

        const building = new Building({
            user_id: data.user_id,
            building_name: data.building_name
        })

        await building.save()

        const building_id = building?._id

        return {
            type: 'success',
            success: true,
            building_id: building_id
        }

    }catch(error){
        console.log(error)
        return {
            type: 'failedToAddBuilding',
            success: false
        }
    }
}