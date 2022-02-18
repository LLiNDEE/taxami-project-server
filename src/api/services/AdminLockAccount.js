import { User, Building, Task } from '../models/models.js'




export const AdminLockAccount = async (data, type = "locked") => {
    try{

        const { customer_id } = data

        const user = await User.findOne({_id: customer_id})

        if(!user){
            return {
                type: 'error',
                success: false
            }
        }

        const userBuildings = user.buildings;
        const buildingsID = {_id: {$in: userBuildings}}

        await Building.updateMany(buildingsID, {$set: {status: type}})

        await Task.updateMany({building_id: {$in: userBuildings}}, {$set: {active_status: type }})

        await User.findOneAndUpdate({_id: customer_id}, {$set: {status: type}})

        return {
            type: 'success',
            success: true,
        }


    }catch(error){
        console.log(error)
        return{
            type: 'error',
            success: false,
        }
    }
}