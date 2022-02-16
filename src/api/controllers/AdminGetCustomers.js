import { generateError } from "../../utils/errorHandler.js"
import { generateSuccessResponse } from "../../utils/successHandler.js"
import { AdminGetCustomers as getCustomers } from "../services/AdminGetCustomers.js"



export const AdminGetCustomers = async (_, res) => {
    try{

        const customersResponse = await getCustomers()
        if(!customersResponse.success) return res.status(400).send(generateError('error'))

        res.status(200).send(generateSuccessResponse({customers: customersResponse.customers}))
        

    }catch(error){
        console.log(error)
        res.status(400).send(generateError('failed'))
    }
}