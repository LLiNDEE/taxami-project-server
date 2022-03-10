import { Building, User } from '../models/models.js'

export const getStats = async () => {
    try{

        const amountOfBuildings = await Building.countDocuments()

        const Workers = await User.countDocuments({role: 'worker'})


        return {
            type: 'success',
            success: true,
            amountOfBuildings: amountOfBuildings,
            amountOfWorkers: Workers
        }

    }catch(error){
        return {
            type: 'error',
            success: false,
        }
    }
}