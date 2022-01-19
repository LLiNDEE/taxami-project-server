import { Building } from "../models/models.js"
import { getUserBy } from "./getUserBy.js"



export const userGetBuildings = async user_id =>{
    try{

        const userResponse = await getUserBy('_id', user_id)

        if(userResponse.user[0].role === 'customer'){
            const building_ids = userResponse.user[0].buildings

            const buildingQuery = {_id: {$in: building_ids}}
            const buildings = await Building.find(buildingQuery)

            return {
                type: 'success',
                success: true,
                buildings: buildings
            }
        }

        if(userResponse.user[0].role === 'worker'){

            const buildings = await Building.find({members: user_id})

            return{
                type: 'success',
                success: true,
                buildings: buildings
            }
        }


    }catch(error){
        console.log(error)
        return {
            type: 'failed',
            success: false
        }
    }
}