import { User } from "../models/models.js"



export const getAllCustomers = async () => {
    try{

        const query = {role: 'customer'}
        const allCustomers = await User.find(query)
        if(!allCustomers){
            return {
                type: 'failed',
                success: false,
            }
        }

        if(allCustomers.length < 1){
            return {
                type: 'noCustomers',
                success: true,
            }
        }

        return {
            type: 'success',
            success: true,
            customers: allCustomers
        }

    }catch(error){
        console.log(error)
        return {
            type: 'failed',
            success: false
        }
    }
}