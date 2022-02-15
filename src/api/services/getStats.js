import { Building, User } from '../models/models.js'

export const getStats = async () => {
    try{

        const amountOfBuildings = await Building.countDocuments()

        return {
            type: 'success',
            success: true,
            amountOfBuildings: amountOfBuildings,
        }

    }catch(error){
        return {
            type: 'error',
            success: false,
        }
    }
}