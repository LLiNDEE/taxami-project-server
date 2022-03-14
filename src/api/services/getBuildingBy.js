import { Building } from "../models/models.js";



export const getBuildingBy = async id => {
    try{

        const buildingQuery = {_id: id}
        const building = await Building.findOne(buildingQuery)
        if(!building){
            return {
                type: 'noBuilding',
                success: false
            }
        }

        return {
            type: 'success',
            success: true,
            building: building,
        }

    }catch(error){
        return {
            type: 'error',
            success: false
        }
    }
}