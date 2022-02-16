import { User } from '../models/models.js'



export const AdminGetCustomers = async () => {
    try{


        const customers = await User.find({role: 'customer'})
        if(!customers){
            return {
                type: 'error',
                success: false
            }
        }

        return {
            type: 'success',
            success: true,
            customers: customers
        }

    }catch(error){
        return {
            type: 'success',
            success: false
        }
    }
}