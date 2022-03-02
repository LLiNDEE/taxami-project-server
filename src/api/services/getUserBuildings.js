import { Building } from "../models/models.js"




export const getUserBuildings = async user_id => {
    try{

        const buildingQuery = {members: user_id}
        const buildings = await Building.find(buildingQuery)
        if(!buildings) {
            return {
                type: 'noBuilding',
                success: false
            }
        }

        return {
            type: 'success',
            success: true,
            buildings: buildings
        }

    }catch(error){
        console.log(error)
        return {
            type: 'error',
            success: false
        }
    }
}