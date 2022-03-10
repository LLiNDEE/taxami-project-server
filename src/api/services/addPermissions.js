import { Building } from "../models/models.js";


export const addPermissions = async data => {
    try{


        const { member_id, permissions, building_id } = data;

        const buildingQuery = {_id: building_id}
        const building = await Building.findOne(buildingQuery)

        if(!building){
            return {
                type: 'noBuilding',
                success: false,
            }
        }   

        

        const buildingPermissions = building.permissions

        


        if(buildingPermissions.length > 0){
            let isFound = false
            buildingPermissions.forEach(p => {
                if(p.member_id === member_id){
                    isFound = true
                }
            })
    
    
            if(isFound){
                await Building.findOneAndUpdate({"permissions.member_id": member_id}, {$push: {"permissions.$.permissions": permissions}})
            }
            
    
    
            if(!isFound){
                const permissionsObject = {
                    member_id: member_id,
                    permissions: permissions
                }
    
                await Building.findOneAndUpdate(buildingQuery, {$push: {permissions: permissionsObject}})
            }
        }else{
            const permissionsObject = {
                member_id: member_id,
                permissions: [permissions],
            }
            await Building.findOneAndUpdate(buildingQuery, {$push: {permissions: permissionsObject}})
        }

        return {
            type: 'success',
            success: true
        }



    }catch(error){
        console.log(error)
        return {
            type: 'error',
            success: false
        }
    }
}