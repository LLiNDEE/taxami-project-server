import { Building } from "../models/models.js";


export const BuildingGetPermissions = async data => {
    try{

        const buildingQuery = {_id: data.building_id}
        const foundBuilding = await Building.findOne(buildingQuery)

        if(!foundBuilding) {
            return {
                type: 'noBuilding',
                success: false
            }
        }

        if(foundBuilding.user_id !== data.user_id){
            return {
                type: 'noPermission',
                success: false
            }
        }

        const permissions = foundBuilding.permissions

        return {
            type: 'success',
            success: true,
            permissions: permissions
        }


    }catch(error){
        return {
            type: 'error',
            success: false
        }
    }
}